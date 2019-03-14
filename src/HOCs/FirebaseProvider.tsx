/**
 * This HOC sets an Firebase Auth observer.
 * If user credential (login/signout) changes, this method will fire and trigger a re-render
 *
 * This script also exports Firebas Context which contains
 * the user's firebase data
 *
 * @author andy, kevin
 *
 */

import * as React from 'react';

import { BannerConsumerProps } from 'HOCs/BannerProvider';
import { showAccountVerificationBanner } from 'utils/bannerUtility';
import { auth, FirebaseUser, hasCompletedVerification } from 'utils/firebase';

export interface FirebaseUserProps {
  completedVerification: boolean;
  isAdmin: boolean;
  loading: boolean;
  user: FirebaseUser | null;
}

const { Provider, Consumer } = React.createContext({});
export { Consumer as FirebaseConsumer };

interface Claims {
  roles?: string[];
}

interface FirebaseProviderProps {
  bannerDispatch?: BannerConsumerProps['bannerDispatch'];
  bannerState?: BannerConsumerProps['bannerState'];
}

export class FirebaseProvider extends React.Component<FirebaseProviderProps> {
  readonly state: FirebaseUserProps = {
    completedVerification: false,
    isAdmin: false,
    loading: true,
    user: null,
  };

  componentDidMount(): void {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#onIdTokenChanged
    // Adds an observer for changes to the signed-in user's ID token,
    // which includes sign-in, sign-out, and token refresh events.
    auth.onIdTokenChanged(async (user: FirebaseUser | null) => {
      if (!user) {
        return this.setState({ user, completedVerification: false, isAdmin: false, loading: false });
      }

      // https://firebase.google.com/docs/reference/js/firebase.User#getIdTokenResult
      // Returns the current ID token result object if it has not expired,
      // otherwise this will refresh the token and return a new one.

      await user.reload();  // need this to refetch providerData 'phone'
      const tokenResult = await user.getIdTokenResult();
      const claims: Claims = tokenResult.claims;
      const isAdmin: boolean = !!claims.roles && claims.roles.includes('admin');

      if (this.props.bannerDispatch && this.props.bannerState) {
        showAccountVerificationBanner(hasCompletedVerification(user), this.props.bannerDispatch, this.props.bannerState);
      }

      return this.setState({
        user,
        isAdmin,
        completedVerification: hasCompletedVerification(user),
        loading: false,
      });
    });
  }

  render(): React.ReactNode {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

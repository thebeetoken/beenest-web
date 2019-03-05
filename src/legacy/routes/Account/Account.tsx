import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';

import AccountContainer from './Account.container';
import AccountGeneral from './AccountGeneral';
import AccountPayment from './AccountPayment';
import AccountProfile from './AccountProfile';
import { AccountSecurity } from './AccountSecurity';
import AccountVerification from './AccountVerification';

import AudioLoading from 'legacy/shared/loading/AudioLoading';
import Divider from 'legacy/shared/Divider';
import GeneralWrapper from 'legacy/shared/GeneralWrapper';
import NotFound from 'legacy/routes/NotFound';
import TabNavBar from 'legacy/shared/TabNavBar';
import { GET_ACCOUNT_PAGE } from 'networking/users';

import { AppConsumerProps, AppConsumer, ScreenType } from 'legacy/Legacy.context';

const Account = () => (
  <AccountContainer>
    <Query query={GET_ACCOUNT_PAGE}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AudioLoading height={48} width={96} />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const { user, creditBalance } = data;
        return (
          <GeneralWrapper className="account-body" width="100%">
            <div className="account-header-container">
              <header>Profile</header>
              <Divider color="light" size="tall" />
            </div>
            <div className="content">
              <div className="left">
                <FirebaseConsumer>
                  {({ user, completedVerification }: FirebaseUserProps) => (
                    <TabNavBar config={[
                      {
                        title: 'General Info',
                        to: '/legacy/account/general',
                        src: 'decorative/profile',
                      },
                      {
                        title: 'Payment',
                        to: '/legacy/account/payment',
                        src: 'decorative/card',
                      },
                      {
                        title: 'Security',
                        to: '/legacy/account/security',
                        src: 'decorative/lock',
                      },
                      {
                        title: 'Verification',
                        to: '/legacy/account/verification',
                        src: 'utils/check-circle',
                        badge: (user && !completedVerification) ? '!' : ''
                      },
                    ]} />
                  )}
                </FirebaseConsumer>
                <Switch>
                  <Route exact path="/legacy/account/general" render={(props: RouterProps) => <AccountGeneral {...props} user={user} />} />
                  <Route exact path="/legacy/account/payment" render={() => <AccountPayment creditBalance={creditBalance} />} />
                  <Route exact path="/legacy/account/security" component={AccountSecurity} />
                  <Route exact path="/legacy/account/verification" component={AccountVerification} />
                  <Redirect exact from="/legacy/account" to="/legacy/account/general" />
                  <Route component={NotFound} />
                </Switch>
                <div className="bee-flex-div" />
              </div>
              <AppConsumer>
                {
                  ({ screenType }: AppConsumerProps) => (
                    screenType >= ScreenType.DESKTOP &&
                    <div className="right">
                      <AccountProfile user={user} />
                    </div>
                  )
                }
              </AppConsumer>
            </div>
          </GeneralWrapper>
        );
      }}
    </Query>
  </AccountContainer>
);

// We are wrapping a route guard on top of the Account component
// The guard will verify whether the user is an admin
// according to firebase
export default () => (
  <FirebaseConsumer>
    {({ user, loading }: FirebaseUserProps) => {
      if (loading) {
        return null;
      }
      return user ? <Account /> : <Redirect to="/legacy/login" />;
    }}
  </FirebaseConsumer>
);

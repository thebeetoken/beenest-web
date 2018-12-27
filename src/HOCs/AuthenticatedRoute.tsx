/**
 * This HOC is an Authenticated Route guard
 * It's API is used the same way as React Router Route is used
 *
 * Example
 * <AuthenticatedRoute path="/profile" component={() => <Profile />} />
 *
 * @author andy
 *
 */

import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { FirebaseConsumer, FirebaseUserProps } from './FirebaseProvider';

const AuthenticatedRoute = (props: RouteProps): JSX.Element => (
  <FirebaseConsumer>
    {({ loading, user }: FirebaseUserProps) => {
      if (loading) {
        return null;
      }
      return user ? <Route {...props} /> : <Redirect to="/login" />;
    }}
  </FirebaseConsumer>
);

export default AuthenticatedRoute;

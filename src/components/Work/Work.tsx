import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';

import WorkTest from './WorkTest';

const Work = () => (
  <div>
    <Switch>
      <Route path="/work" component={WorkTest} />
    </Switch>
  </div>
);

export default () => (
  <FirebaseConsumer>
    {({ isAdmin, loading }: FirebaseUserProps) => {
      if (loading) {
        return null;
      }
      return isAdmin ? <Work /> : <Redirect to="/login" />;
    }}
  </FirebaseConsumer>
);
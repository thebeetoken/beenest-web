/**
 * This is the main Admin screen
 *
 * In addition, it will render default tab, AdminTabsBooking
 *
 * @author tommy, andy, kevin
 **/

import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';

import RebrandTest from './RebrandTest';

const Rebrand = () => (
  <div>
    <Switch>
      <Route path="/rebrand" component={RebrandTest} />
    </Switch>
  </div>
);

export default () => (
  <FirebaseConsumer>
    {({ isAdmin, loading }: FirebaseUserProps) => {
      if (loading) {
        return null;
      }
      return isAdmin ? <Rebrand /> : <Redirect to="/login" />;
    }}
  </FirebaseConsumer>
);
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './home';
import Account from './Account';
import Login from './login';

const Work = () => (
  <div>
    <Switch>
      <Route path="/work/account" component={Account} />
      <Route exact path="/work/login" component={Login} />
      <Route path="/work" component={Home} />
      <Redirect from="/" to="/work" />
    </Switch>
  </div>
);

export default Work;
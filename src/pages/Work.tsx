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
      <Route exact path="/work/home" component={Home} />
      <Redirect from="/work" to="/work/home" />
    </Switch>
  </div>
);

export default Work;
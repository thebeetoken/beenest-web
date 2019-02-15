import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import Account from './Account';
import Login from './login';

const Work = () => (
  <div>
    <Switch>
      <Route path="/work/account" component={Account} />
      <Route exact path="/work/login" component={Login} />
      <Route path="/work" component={Home} />
    </Switch>
  </div>
);

export default Work;
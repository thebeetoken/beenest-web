import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import Account from './Account';
import Login from './login';
import Signup from './signup';

const Work = () => (
  <div>
    <Switch>
      <Route path="/work/account" component={Account} />
      <Route exact path="/work/login" component={Login} />
      <Route exact path="/work/signup" component={Signup} />
      <Route path="/work" component={Home} />
    </Switch>
  </div>
);

export default Work;
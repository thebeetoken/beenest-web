import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import About from './about';
import Account from './Account';
import Home from './home';
import Listing from './listing';
import Login from './login';
import Logout from './logout';
import Signup from './signup';

const Work = () => (
  <div>
    <Switch>
    <Route path="/work/about" component={About} />
      <Route path="/work/account" component={Account} />
      <Route exact path="/work/listings/:id" component={Listing} />
      <Route exact path="/work/login" component={Login} />
      <Route exact path="/work/logout" component={Logout} />
      <Route exact path="/work/signup" component={Signup} />
      <Route path="/work" component={Home} />
    </Switch>
  </div>
);

export default Work;
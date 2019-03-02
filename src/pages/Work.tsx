import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import About from './about';
import Account from './Account';
import ForgotPassword from './forgotPassword';
import Home from './home';
import Listing from './listing';
import Login from './login';
import Logout from './logout';
import Search from './search';
import Signup from './signup';
import Trips from './trips';
import AuthenticatedRoute from 'HOCs/AuthenticatedRoute';

import Header from 'components/work/Header';

import '../styled/customStyles.scss';

const Work = () => (
  <div>
    <Header />
    <Switch>
    <Route path="/work/about" component={About} />
      <Route path="/work/account" component={Account} />
      <Route path="/work/forgot_password" component={ForgotPassword} />
      <Route exact path="/work/listings/:id" component={Listing} />
      <Route exact path="/work/login" component={Login} />
      <Route exact path="/work/logout" component={Logout} />
      <Route exact path="/work/search" component={Search} />
      <Route exact path="/work/signup" component={Signup} />
      <AuthenticatedRoute path="/work/trips" component={Trips} />
      <Route path="/work" component={Home} />
    </Switch>
  </div>
);

export default Work;
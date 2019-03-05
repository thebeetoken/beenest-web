import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import About from './about';
import Account from './Account';
import FirebaseEmailHandler from './Account/FirebaseEmailHandler';
import ForgotPassword from './forgotPassword';
import Home from './home';
import HostSignup from './hosts/signup';
import Listing from './listing';
import Login from './login';
import Logout from './logout';
import NotFound from './notFound';
import Search from './search';
import Signup from './signup';
import Trips from './trips';
import TripsReceipt from './trips/TripsReceipt';
import AuthenticatedRoute from 'HOCs/AuthenticatedRoute';

import Header from 'legacy/work/Header';

import '../styled/customStyles.scss';

const Work = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/account/action" component={FirebaseEmailHandler} />
      <Route path="/account" component={Account} />
      <Route path="/forgot_password" component={ForgotPassword} />
      <Route exact path="/listings/:id" component={Listing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/signup" component={Signup} />
      <AuthenticatedRoute exact path="/trips/:id/receipt" component={TripsReceipt} />
      <AuthenticatedRoute path="/trips" component={Trips} />
      <Route path="/hosts/signup" component={HostSignup} />
      <Route exact path="/" component={Home} />
      <Route path="/" component={NotFound} />
    </Switch>
  </div>
);

export default Work;
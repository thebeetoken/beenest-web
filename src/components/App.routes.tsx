import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppContainer from './App.container';
import Account from './routes/Account';
import Booking from './routes/Booking';
import Conference from './routes/Conference';
import Markets from './routes/Markets';
import ForgotPassword from './routes/authentication/ForgotPassword';
import ForgotPasswordConfirmation from './routes/authentication/ForgotPasswordConfirmation';
import Help from './routes/Help';
import Home from './routes/Home';
import Host from './routes/Host';
import HostListingCalendar from './routes/Host/HostListingCalendar';
import HostListingEdit from './routes/Host/HostListing/HostListingEdit';
import HostsStart from './routes/Hosts/HostsStart';
import HostsSignupOutreach from './routes/Hosts/HostsSignupOutreach';
import HostsOnboardingListed from './routes/Hosts/HostsOnboardingListed';
import HostsOnboardingNotListed from './routes/Hosts/HostsOnboardingNotListed';
import HostsOnboardingThankYou from './routes/Hosts/HostsOnboardingThankYou';
import { HostsSignup, HostsSignupThankYou } from './routes/Hosts/HostsSignup';
import Listing from './routes/Listing/Listing';
import ListingsResult from './routes/Listing/ListingsResult';
import Login from './routes/authentication/Login';
import Logout from './routes/authentication/Logout';
import SignUp from './routes/authentication/SignUp';
import { StripeConnect, StripeExpressComplete, StripeExpressNew } from './routes/Account/StripeExpress';
import FirebaseAccountEmailHandler from './routes/Account/FirebaseAccountEmailHandler';
import Trips from './routes/Trips';
import TripsReceipt from './routes/Trips/TripsReceipt';
import NotFound from './routes/NotFound';

import AuthenticatedRoute from 'HOCs/AuthenticatedRoute';
import { BannerConsumer, BannerConsumerProps } from 'HOCs/BannerProvider';
import ZendeskWebWidgetWrapper from 'HOCs/ZendeskWebWidgetWrapper';

const HostWithZendesk = (props: RouterProps) => (
  <ZendeskWebWidgetWrapper>
    <Host {...props} />
  </ZendeskWebWidgetWrapper>
);

const AppRoutes = () => (
  <BannerConsumer>
    {({ bannerState }: BannerConsumerProps) => {
      return (
        <AppContainer className="bee-app" {...bannerState}>
          <Switch>
            <Route exact path="/account/verify" component={FirebaseAccountEmailHandler} />
            <Route exact path="/account/stripe/link" component={StripeConnect} />
            <Route exact path="/account/stripe/new" component={StripeExpressNew} />
            <Route exact path="/account/stripe/complete" component={StripeExpressComplete} />
            <AuthenticatedRoute path="/account" component={Account} />
            <Route path="/conferences/:id" component={Conference} />
            <Route exact path="/forgot_password" component={ForgotPassword} />
            <Route exact path="/forgot_password_confirmation" component={ForgotPasswordConfirmation} />
            <Route exact path="/help" component={Help} />
            {/* /host/listings/:id cannot be placed inside /host because Host component contains the */}
            {/* bookings/listings/payments tabs and the listing edit form does not */}
            <AuthenticatedRoute path="/host/listings/:id/calendar" component={HostListingCalendar} />
            <AuthenticatedRoute path="/host/listings/:id" render={(props: RouterProps) => <HostListingEdit {...props} />} />
            <AuthenticatedRoute path="/host" component={HostWithZendesk} />
            <Route path="/hosts/onboarding/listed" component={HostsOnboardingListed} />
            <Route path="/hosts/onboarding/not_listed" component={HostsOnboardingNotListed} />
            <Route path="/hosts/onboarding/thank_you" component={HostsOnboardingThankYou} />
            <Route exact path="/hosts/signup/thank_you" component={HostsSignupThankYou} />
            <Route exact path="/hosts/signup-outreach" component={HostsSignupOutreach} />
            <Route exact path="/hosts/signup" component={HostsSignup} />
            <Route exact path="/hosts/start" component={HostsStart} />
            <Route exact path="/listings/:id" component={Listing} />
            <Route path="/listings" component={ListingsResult} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={SignUp} />
            <AuthenticatedRoute path="/bookings" component={Booking} />
            <AuthenticatedRoute path="/trips/:id/receipt" component={TripsReceipt} />
            <AuthenticatedRoute path="/trips" component={Trips} />
            <Route path="/markets" component={Markets} />
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </AppContainer>
      );
    }}
  </BannerConsumer>
);

export default AppRoutes;

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import LegacyContainer from './Legacy.container';
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
import { StripeLink, StripeComplete, StripeNew } from './routes/Account/Stripe';
import FirebaseEmailHandler from './routes/Account/FirebaseEmailHandler';
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
        <LegacyContainer className="bee-app" {...bannerState}>
          <Switch>
            <Route exact path="/legacy/account/action" component={FirebaseEmailHandler} />
            <Route exact path="/legacy/account/stripe/link" component={StripeLink} />
            <Route exact path="/legacy/account/stripe/new" component={StripeNew} />
            <Route exact path="/legacy/account/stripe/complete" component={StripeComplete} />
            <AuthenticatedRoute path="/legacy/account" component={Account} />
            <Route path="/legacy/conferences/:id" component={Conference} />
            <Route exact path="/legacy/forgot_password" component={ForgotPassword} />
            <Route exact path="/legacy/forgot_password_confirmation" component={ForgotPasswordConfirmation} />
            <Route exact path="/legacy/help" component={Help} />
            {/* /host/listings/:id cannot be placed inside /host because Host component contains the */}
            {/* bookings/listings/payments tabs and the listing edit form does not */}
            <AuthenticatedRoute path="/legacy/host/listings/:id/calendar" component={HostListingCalendar} />
            <AuthenticatedRoute path="/legacy/host/listings/:id" render={(props: RouterProps) => <HostListingEdit {...props} />} />
            <AuthenticatedRoute path="/legacy/host" component={HostWithZendesk} />
            <Route path="/legacy/hosts/onboarding/listed" component={HostsOnboardingListed} />
            <Route path="/legacy/hosts/onboarding/not_listed" component={HostsOnboardingNotListed} />
            <Route path="/legacy/hosts/onboarding/thank_you" component={HostsOnboardingThankYou} />
            <Route exact path="/legacy/hosts/signup/thank_you" component={HostsSignupThankYou} />
            <Route exact path="/legacy/hosts/signup-outreach" component={HostsSignupOutreach} />
            <Route exact path="/legacy/hosts/signup" component={HostsSignup} />
            <Route exact path="/legacy/hosts/start" component={HostsStart} />
            <Route exact path="/legacy/listings/:id" component={Listing} />
            <Route path="/legacy/listings" component={ListingsResult} />
            <Route exact path="/legacy/login" component={Login} />
            <Route exact path="/legacy/logout" component={Logout} />
            <Route exact path="/legacy/signup" component={SignUp} />
            <AuthenticatedRoute path="/legacy/bookings" component={Booking} />
            <AuthenticatedRoute path="/legacy/trips/:id/receipt" component={TripsReceipt} />
            <AuthenticatedRoute path="/legacy/trips" component={Trips} />
            <Route path="/legacy/markets" component={Markets} />
            <Route exact path="/legacy" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </LegacyContainer>
      );
    }}
  </BannerConsumer>
);

export default AppRoutes;

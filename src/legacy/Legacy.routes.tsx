// import * as React from 'react';
// import { Route, Switch } from 'react-router-dom';

// import LegacyContainer from './Legacy.container';
// import Booking from './routes/Booking';
// import Conference from './routes/Conference';
// import Markets from './routes/Markets';
// import Host from './routes/Host';
// import HostListingCalendar from './routes/Host/HostListingCalendar';
// import HostListingEdit from './routes/Host/HostListing/HostListingEdit';
// import HostsSignupOutreach from './routes/Hosts/HostsSignupOutreach';
// import { HostsSignup, HostsSignupThankYou } from './routes/Hosts/HostsSignup';
// import { StripeLink, StripeComplete, StripeNew } from './routes/Account/Stripe';

// import AuthenticatedRoute from 'HOCs/AuthenticatedRoute';
// import ZendeskWebWidgetWrapper from 'HOCs/ZendeskWebWidgetWrapper';

// const HostWithZendesk = (props: RouterProps) => (
//   <ZendeskWebWidgetWrapper>
//     <Host {...props} />
//   </ZendeskWebWidgetWrapper>
// );

// const AppRoutes = () => (
//         <LegacyContainer className="bee-app">
//           <Switch>
//             <Route exact path="/legacy/account/stripe/link" component={StripeLink} />
//             <Route exact path="/legacy/account/stripe/new" component={StripeNew} />
//             <Route exact path="/legacy/account/stripe/complete" component={StripeComplete} />
//             <Route path="/legacy/conferences/:id" component={Conference} />
//             {/* /host/listings/:id cannot be placed inside /host because Host component contains the */}
//             {/* bookings/listings/payments tabs and the listing edit form does not */}
//             <AuthenticatedRoute path="/legacy/host/listings/:id/calendar" component={HostListingCalendar} />
//             <AuthenticatedRoute path="/legacy/host/listings/:id" render={(props: RouterProps) => <HostListingEdit {...props} />} />
//             <AuthenticatedRoute path="/legacy/host" component={HostWithZendesk} />
//             <Route exact path="/legacy/hosts/signup/thank_you" component={HostsSignupThankYou} />
//             <Route exact path="/legacy/hosts/signup-outreach" component={HostsSignupOutreach} />
//             <Route exact path="/legacy/hosts/signup" component={HostsSignup} />
//             <AuthenticatedRoute path="/legacy/bookings" component={Booking} />
//             <Route path="/legacy/markets" component={Markets} />
//           </Switch>
//         </LegacyContainer>
// );

// export default AppRoutes;

import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Fade } from 'reactstrap';

import Header from 'components/Header';
import Footer from 'components/Footer';

import About from './about';
import Account from './account';
import Booking from './bookings';
import FirebaseEmailHandler from './account/FirebaseEmailHandler';
import ForgotPassword from './forgotPassword';
import Home from './home';
import Host from 'legacy/routes/Host';
import HostSignup from './hosts/signup';
import Listing from './listing';
import Login from './login';
import Logout from './logout';
import Markets from './markets';
import NotFound from './notFound';
import Search from './search';
import Signup from './signup';
import Trips from './trips';
import TripsReceipt from './trips/TripsReceipt';
import AuthenticatedRoute from 'HOCs/AuthenticatedRoute';
import { StripeLink, StripeComplete, StripeNew } from 'pages/account/Stripe';


import '../styled/customStyles.scss';
import HostListingEdit from 'legacy/routes/Host/HostListing/HostListingEdit';
import HostListingCalendar from 'legacy/routes/Host/HostListingCalendar';
import Banner from 'components/Banner';
import { BannerContext } from 'HOCs/BannerProvider';

class ScrollToTop extends React.Component<RouterProps, {}> {
  componentDidUpdate(prevProps: RouterProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollToTopWithRouter = withRouter(ScrollToTop);

const Work = () => {
  const { bannerState, bannerDispatch } = React.useContext(BannerContext);
  let close = () => bannerDispatch({type: 'close'});

  return (
    <div className="min-height-100vh">
      {bannerState.show ? <Fade><Banner onClose={close} {...bannerState} /></Fade> : <></>}
      <Header />
      <div className="bee-without-header-height-container">
        <ScrollToTopWithRouter>
          <Switch>
            <Route path="/about" component={About} />
            <Route exact path="/account/stripe/link" component={StripeLink} />
            <Route exact path="/account/stripe/new" component={StripeNew} />
            <Route exact path="/account/stripe/complete" component={StripeComplete} />
            <AuthenticatedRoute path="/account/action" component={FirebaseEmailHandler} />
            <Route path="/account" component={Account} />
            <Route path="/markets" component={Markets} />
            <AuthenticatedRoute path="/bookings" component={Booking} />
            <Route path="/forgot_password" component={ForgotPassword} />
            <AuthenticatedRoute path="/host/listings/:id/calendar" component={HostListingCalendar} />
            <AuthenticatedRoute path="/host/listings/:id" render={(props: RouterProps) => <HostListingEdit {...props} />} />
            <AuthenticatedRoute path="/host" component={Host} />
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
        </ScrollToTopWithRouter>
      </div>
      <Footer />
    </div>
  );
};

export default Work;
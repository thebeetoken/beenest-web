import * as React from 'react';
import { Fade } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';

import BookingContainer from './Booking.container';
import BookingOptions from './BookingOptions';
import BookingPayment from './BookingPayment';
import BookingReceipt from './BookingReceipt';

const Booking = () => (
  <Fade>
    <BookingContainer className="bee-booking">
      <div className="booking-body-container">
        <Switch>
          <Route exact path="/bookings/:id/options" component={BookingOptions} />
          <Route exact path="/bookings/:id/payment" component={BookingPayment} />
          <Route exact path="/bookings/:id/receipt" component={BookingReceipt} />
          <Redirect from="/bookings/:id" to="/bookings/:id/options" />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </BookingContainer>
  </Fade>
);

export default Booking;

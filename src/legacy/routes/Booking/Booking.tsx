import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BookingContainer from './Booking.container';
import BookingOptions from './BookingOptions';
import BookingPayment from './BookingPayment';
import BookingReceipt from './BookingReceipt';

const Booking = () => (
  <BookingContainer className="bee-booking">
    <div className="booking-body-container">
      <Switch>
        <Route exact path="/legacy/bookings/:id/options" component={BookingOptions} />
        <Route exact path="/legacy/bookings/:id/payment" component={BookingPayment} />
        <Route exact path="/legacy/bookings/:id/receipt" component={BookingReceipt} />
        <Redirect from="/legacy/bookings/:id" to="/legacy/bookings/:id/options" />
        <Route component={() => <Redirect to="/legacy" />} />
      </Switch>
    </div>
  </BookingContainer>
);

export default Booking;

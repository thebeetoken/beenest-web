import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BookingContainer from 'legacy/routes/Booking/Booking.container';
import BookingOptions from 'legacy/routes/Booking/BookingOptions';
import BookingPayment from 'legacy/routes/Booking/BookingPayment';
import BookingReceipt from 'legacy/routes/Booking/BookingReceipt';

const Booking = () => (
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
);

export default Booking;

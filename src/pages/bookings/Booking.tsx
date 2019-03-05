import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BookingContainer from 'routes/Booking/Booking.container';
import BookingOptions from 'routes/Booking/BookingOptions';
import BookingPayment from 'routes/Booking/BookingPayment';
import BookingReceipt from 'routes/Booking/BookingReceipt';

const Booking = () => (
  <BookingContainer className="bee-booking">
    <div className="booking-body-container">
      <Switch>
        <Route exact path="/work/bookings/:id/options" component={BookingOptions} />
        <Route exact path="/work/bookings/:id/payment" component={BookingPayment} />
        <Route exact path="/work/bookings/:id/receipt" component={BookingReceipt} />
        <Redirect from="/work/bookings/:id" to="/work/bookings/:id/options" />
        <Route component={() => <Redirect to="/work" />} />
      </Switch>
    </div>
  </BookingContainer>
);

export default Booking;

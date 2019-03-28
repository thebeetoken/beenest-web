import * as React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router';

import { GET_BOOKING, Booking } from 'networking/bookings';
import SelectPaymentOption from './SelectPaymentOption';
import BookingNavBar from '../BookingNavBar';

const BookingOptions = ({ match }: RouterProps) => (
  <Query query={GET_BOOKING} variables={{ id: match.params.id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }
      if (error || !data) {
        return <h1>ERROR</h1>;
      }
      const booking: Booking = data.booking;
      if (booking.status !== 'started') {
        alert('Booking may not be adjusted at this time.');
        return <Redirect to={`/listings/${booking.listingId}`} />;
      }
      return (
        <div className="booking-body bee-without-header-height-container">
          <BookingNavBar listingId={booking.listingId} />
          <SelectPaymentOption booking={booking} />
        </div>
      );
    }}
  </Query>
);

export default BookingOptions;

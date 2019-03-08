import * as React from 'react';
import { Query } from 'react-apollo';

import { Booking } from 'networking/bookings';
import { GET_PAYMENT_SOURCES } from 'networking/paymentSources';

import BookingOptionsUSDCard from './BookingOptionsUSDCard';
import LoadingTakeover from 'legacy/shared/loading/LoadingTakeover';

interface Props {
  booking: Booking;
}

const BookingOptionsUSD = ({ booking }: Props) => (
  <Query query={GET_PAYMENT_SOURCES}>
    {({ loading, error, data }) => {
      if (loading) return <LoadingTakeover />;
      if (error || !data) {
        return <h1>{error ? error.message : 'Error / No Data'}</h1>;
      }
      const { getPaymentSources } = data;
      return <BookingOptionsUSDCard booking={booking} paymentSources={getPaymentSources} />;
    }}
  </Query>
);

export default BookingOptionsUSD;

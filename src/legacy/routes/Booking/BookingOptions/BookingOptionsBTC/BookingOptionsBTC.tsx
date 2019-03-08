import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { Booking, Currency } from 'networking/bookings';

import BookingOptionsUSDContainer from '../BookingOptionsUSD/BookingOptionsUSD.container';
import SelectPaymentButton from '../SelectPaymentButton';
import Button from 'legacy/shared/Button';

interface Props extends RouterProps {
  booking: Booking;
}

const BookingOptionsBTC = ({ booking, history }: Props) => (
  <BookingOptionsUSDContainer>
    <div className="booking-options-button-container">
      <Button
        className="back-button"
        background="light"
        onClick={() => history.push(`/listings/${booking.listingId}`)}
      >
        Back
      </Button>
      <SelectPaymentButton
        booking={booking}
        currency={Currency.BTC}
        onSuccess={() => history.push(`/bookings/${booking.id}/payment`)}
      />
    </div>
  </BookingOptionsUSDContainer>
);

export default withRouter(BookingOptionsBTC);
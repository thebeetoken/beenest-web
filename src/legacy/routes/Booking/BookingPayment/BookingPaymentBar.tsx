import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { Booking, Currency } from 'networking/bookings';
import BookingPaymentButton from './BookingPaymentButton';
import BookingQuote from '../BookingQuote';

import BookingPaymentBarContainer from './BookingPaymentBar.container';
import { ToggleProvider, ToggleProviderRef } from 'legacy/shared/ToggleProvider';
import Fab from 'legacy/shared/Fab';
import PopUpCard from 'legacy/shared/PopUpCard';

interface Props extends RouterProps {
  booking: Booking;
}

const BookingPaymentBar = ({ booking, history }: Props) => (
  <BookingPaymentBarContainer>
    <ToggleProvider>
      {({ show, toggle }: ToggleProviderRef) => (
        <div className="fab-container">
          <Fab
            onClick={toggle}
            clear
            color="secondary"
            iconColor="secondary"
            icon="decorative/receipt"
            height="80px"
            width="160px"
          >
            Trip Detail
          </Fab>
          {show && (
            <PopUpCard peekHeight={100} showCard={show} toggleCard={toggle}>
              <BookingQuote booking={booking} currency={booking.currency || Currency.BEE} />
            </PopUpCard>
          )}
        </div>
      )}
    </ToggleProvider>
    <div className="booking-payment-bar-button-container">
      <BookingPaymentButton booking={booking} onSuccess={() => history.push(`/legacy/bookings/${booking.id}/receipt`)} />
    </div>
  </BookingPaymentBarContainer>
);

export default withRouter(BookingPaymentBar);

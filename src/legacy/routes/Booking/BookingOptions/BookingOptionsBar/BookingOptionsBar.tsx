import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { Booking, Currency } from 'networking/bookings';

import BookingOptionsBarContainer from './BookingOptionsBar.container';
import SelectPaymentButton from '../SelectPaymentButton';
import BookingQuote from '../../BookingQuote';
import { ToggleProvider, ToggleProviderRef } from 'legacy/shared/ToggleProvider';
import PopUpCard from 'legacy/shared/PopUpCard';
import Fab from 'legacy/shared/Fab';

interface Props extends RouterProps {
  booking: Booking;
  disabled?: boolean;
  currency: Currency;
}

const BookingOptionsBar = ({ booking, currency, disabled, history }: Props) => (
  <BookingOptionsBarContainer>
    <ToggleProvider>
      {({ show, toggle }: ToggleProviderRef) => (
        <div className="fab-container">
          <Fab
            onClick={toggle}
            color="secondary"
            iconColor="secondary"
            background="white"
            icon="decorative/receipt"
            height="80px"
            width="160px"
          >
            Trip Detail
          </Fab>
          {show && (
            <PopUpCard peekHeight={100} showCard={show} toggleCard={toggle}>
              <BookingQuote booking={booking} currency={currency} />
            </PopUpCard>
          )}
        </div>
      )}
    </ToggleProvider>
    <div className="bar-button">
      <SelectPaymentButton
        booking={booking}
        disabled={disabled}
        currency={currency}
        onSuccess={() => history.push(`/bookings/${booking.id}/payment`)}
      />
    </div>
  </BookingOptionsBarContainer>
);

export default withRouter(BookingOptionsBar);

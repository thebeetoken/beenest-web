import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Booking } from 'networking/bookings';
import Fab from 'legacy/shared/Fab';
import Button from 'legacy/shared/Button';

import BookingReceiptBarContainer from './BookingReceiptBar.container';

interface Props extends RouterProps {
  booking: Booking;
}

const BookingReceiptBar = ({ booking, history }: Props) => {
  const link = `/legacy/trips/${booking.id}/receipt`;
  return (
    <BookingReceiptBarContainer>
      <Fab
        color="secondary"
        iconColor="secondary"
        background="white"
        icon="decorative/receipt"
        height="80px"
        width="160px"
        className="fab-container"
        onClick={() => history.push(link)}
      >
        Trip Detail
      </Fab>
      <Button className="finish-button" noRadius onClick={() => history.push(link)}>
        Finish
      </Button>
    </BookingReceiptBarContainer>
  );
};

export default withRouter(BookingReceiptBar);

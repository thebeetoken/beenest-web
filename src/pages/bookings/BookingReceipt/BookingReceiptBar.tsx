import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Booking } from 'networking/bookings';
import Fab from 'components/Fab';
import Button from 'components/Button';

import BookingReceiptBarContainer from './BookingReceiptBar.container';

interface Props extends RouterProps {
  booking: Booking;
}

const BookingReceiptBar = ({ booking, history }: Props) => {
  const link = `/trips/${booking.id}/receipt`;
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
      <Button className="finish-button" color="white" onClick={() => history.push(link)}>
        Finish
      </Button>
    </BookingReceiptBarContainer>
  );
};

export default withRouter(BookingReceiptBar);

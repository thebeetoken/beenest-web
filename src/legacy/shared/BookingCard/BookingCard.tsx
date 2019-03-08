import * as React from 'react';

import BookingCardContainer from './BookingCard.container';

import { Booking } from 'networking/bookings';
import Button from 'legacy/shared/Button';
import Svg from 'legacy/shared/Svg';
import { getAdminBookingDisplayStatus } from 'utils/bookingsDisplayStatus';
import { formatSingleDate } from 'utils/formatDate';

interface Props extends Booking {
  onClose: () => void;
  updateBooking: (id?: string) => void;
  shouldAccept?: boolean;
  shouldCancel?: boolean;
}

class BookingStatusOptionsCard extends React.Component<Props> {
  render() {
    const {
      shouldCancel,
      shouldAccept,
      checkInDate,
      checkOutDate,
      currency,
      guestTotalAmount,
      id,
      listing,
      status,
      onClose,
    } = this.props;
    return (
      <BookingCardContainer>
        <div className="status-options-card-upper">
          <div className="status-options-card-upper--top">
            <h1>
              Are you sure you want to
              <span className={shouldCancel ? 'cancel' : shouldAccept ? 'accept' : 'reject'}>
                {shouldCancel ? 'CANCEL' : shouldAccept ? 'ACCEPT' : 'REJECT'}
              </span>
              this booking?
            </h1>
          </div>
          <div className="status-options-card-upper--bottom">
            <div className="status-options-card-upper--bottom-id">
              <h2>Listing:</h2>
              <h3>{listing.title}</h3>
            </div>
            <div className="status-options-card-upper--bottom-id">
              <h2>Booking ID</h2>
              <h3>{id}</h3>
            </div>
          </div>
        </div>
        <div className="status-options-card-lower">
          <div className="status-options-card-lower--left">
            <span>Status: {getAdminBookingDisplayStatus(status)}</span>
            <span>Check-in: {formatSingleDate(checkInDate)}</span>
            <span>Check-out: {formatSingleDate(checkOutDate)}</span>
            <span>Paid: {guestTotalAmount} <span className="currency">{currency}</span></span>
          </div>
          <div className="status-options-card-lower--right">
            <Button
              className="cancel"
              background="upper"
              color="white"
              radius="4px"
              onClick={onClose}
              size="small">
              Cancel
            </Button>
            <Button
              className="confirmation"
              background="secondary"
              color="white"
              radius="2px"
              onClick={this.handleConfirm}
              size="small">
              Confirm
            </Button>
          </div>
        </div>
        <div className="close" onClick={onClose}>
          <Svg src="utils/x" />
        </div>
      </BookingCardContainer>
    );
  }

  handleConfirm = () => {
    this.props.updateBooking();
    this.props.onClose();
  }
}

export default BookingStatusOptionsCard;


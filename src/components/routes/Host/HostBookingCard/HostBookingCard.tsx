import * as React from 'react';

import HostBookingCardContainer from './HostBookingCard.container';

import { Booking, BookingStatus } from 'networking/bookings';
import BookingCard from 'shared/BookingCard';
import Button from 'shared/Button';
import AudioLoading from 'shared/loading/AudioLoading';
import Portal from 'shared/Portal';
import { ToggleProvider, ToggleProviderRef } from 'shared/ToggleProvider';
import {
  getDisplayHostBookingStatus,
  getHostBookingDisplayStatusEnum
} from 'utils/bookingsDisplayStatus';
import { currencyToDisplay } from 'utils/currencyToDisplay';
import { formatDateRange } from 'utils/formatDate';
interface State {
  errorMessage: string;
  showError: boolean;
  showLoading: boolean;
}

interface Props extends Booking {
  approveBooking: (booking: Booking) => Promise<void>;
  cancelBooking: (booking: Booking) => Promise<void>;
  rejectBooking: (booking: Booking) => Promise<void>;
}

class HostBookingCard extends React.Component<Props, State> {
  readonly state = {
    errorMessage: '',
    showError: false,
    showLoading: false,
  }

  render() {
    const {
      approveBooking,
      cancelBooking,
      checkInDate,
      checkOutDate,
      currency,
      guest,
      guestTotalAmount,
      id,
      numberOfGuests,
      listing,
      rejectBooking } = this.props;
    const status = getHostBookingDisplayStatusEnum(this.props.status);
    const { errorMessage, showError, showLoading } = this.state;
    // TODO: Remove variable when ready to roll out self-service crypto payments.
    const showEmailInstructions = false;//(!showError && !showLoading) && currency === 'BEE';
    return (
      <HostBookingCardContainer className="host-booking-card">
        <div className="host-booking-card--booking-meta">
          <h2>Booking ID: <span>{id}</span></h2>
          <h3>{listing.title}</h3>
          <h3>{formatDateRange(checkInDate, checkOutDate)}</h3>
          <h3>Total: {currencyToDisplay(currency, guestTotalAmount)}</h3>
          <div className="bee-flex-div" />
          {showError &&
            <p>{errorMessage}</p>
          }
          {showLoading &&
            <AudioLoading height={24} width={48} />
          }
          {showEmailInstructions && // TODO: Remove to roll out self-service crypto payments
            <p>
              {((status !== BookingStatus.GUEST_CONFIRMED) && (status !== BookingStatus.HOST_PAID)) &&
                <h4 className="status-message">{getDisplayHostBookingStatus(status, currency)}</h4>
              }
              Contact
              <a target="_blank" href="https://support.beenest.com/"> Beenest Support </a>
              to {status === BookingStatus.GUEST_CONFIRMED ? 'accept or reject' : 'update'} this booking.
            </p>
          }
          {(!showLoading && !showError && !showEmailInstructions) &&
            <div className="button-container">
              {status === BookingStatus.GUEST_CONFIRMED &&
                <>
                  <ToggleProvider>
                    {({ show, toggle }: ToggleProviderRef) => (
                      <>
                        <Button
                          background="secondary"
                          color="white"
                          onClick={toggle}
                          size="small">
                          Accept
                        </Button>
                        {show && (
                          <Portal
                            color="white"
                            onClick={toggle}
                            opacity={0.95}>
                            <BookingCard
                              onClose={toggle}
                              updateBooking={this.handleBooking.bind(this, toggle, approveBooking)}
                              shouldAccept
                              {...this.props}
                            />
                          </Portal>
                        )}
                      </>
                    )}
                  </ToggleProvider>
                  <ToggleProvider>
                    {({ show, toggle }: ToggleProviderRef) => (
                      <>
                        <Button
                          background="error"
                          color="white"
                          onClick={toggle}
                          size="small">
                          Reject
                        </Button>
                        {show && (
                          <Portal
                            color="white"
                            onClick={toggle}
                            opacity={0.95}>
                            <BookingCard
                              onClose={toggle}
                              updateBooking={this.handleBooking.bind(this, toggle, rejectBooking)}
                              {...this.props}
                            />
                          </Portal>
                        )}
                      </>
                    )}
                  </ToggleProvider>
                </>
              }
              {status === BookingStatus.HOST_PAID &&
                <ToggleProvider>
                  {({ show, toggle }: ToggleProviderRef) => (
                    <>
                      <Button
                        background="error"
                        color="white"
                        onClick={toggle}
                        size="small">
                        Cancel
                      </Button>
                      {show && (
                        <Portal
                          color="white"
                          onClick={toggle}
                          opacity={0.95}>
                          <BookingCard
                            onClose={toggle}
                            shouldCancel
                            updateBooking={this.handleBooking.bind(this, toggle, cancelBooking)}
                            {...this.props}
                          />
                        </Portal>
                      )}
                    </>
                  )}
                </ToggleProvider>
              }
              {((status !== BookingStatus.GUEST_CONFIRMED) && (status !== BookingStatus.HOST_PAID)) &&
                <h4 className="status-message">{getDisplayHostBookingStatus(status, currency)}</h4>
              }
            </div>
          }
        </div>
        <div className="column-divider" />
        <div className="host-booking-card-guest-meta-container">
          <h2>Guest Information</h2>
          <div className="host-booking-card--guest-meta">
            <h3>Name: {guest.firstName} {guest.lastName}</h3>
            <h3>Email: <a href={`mailto:${guest.email}`}>{guest.email}</a></h3>
            <h3>Guests: {numberOfGuests}</h3>
            {guest.phoneNumber && <h3>Phone: {guest.phoneNumber}</h3>}
          </div>
        </div>
      </HostBookingCardContainer>
    );
  }

  handleBooking = async (toggle: ToggleProviderRef['toggle'], callback: (booking: Booking) => Promise<void>) => {
    try {
      toggle();
      this.setState({ showLoading: true });
      await callback(this.props);
      this.setState({ showLoading: false });
    } catch (error) {
      console.error(error);
      this.setState({
        showLoading: false,
        showError: true,
        errorMessage: error.message,
      });
    }
  };
}



export default HostBookingCard;

import * as React from 'react';
import { Booking, BookingStatus } from 'networking/bookings';

import BookingCard from 'legacy/shared/BookingCard';
import Button from 'legacy/shared/Button';
import Portal from 'legacy/shared/Portal';
import { ToggleProvider, ToggleProviderRef } from 'legacy/shared/ToggleProvider';
import {
  getDisplayHostBookingStatus,
  getHostBookingDisplayStatusEnum
} from 'utils/bookingsDisplayStatus';
import { currencyToDisplay } from 'utils/currencyToDisplay';
import { formatDateRange } from 'utils/formatDate';
import { Card, Col, Row } from 'reactstrap';
import Loading from 'legacy/shared/loading/Loading';

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
      <Card className="p-4 mb-3 shadow border-0">
        <Row>
          <Col className="px-4 u-ver-divider u-ver-divider--none-md">
            <h3>Booking ID: <span className="small">{id}</span></h3>
            <h5>{listing.title}</h5>
            <h6>{formatDateRange(checkInDate, checkOutDate)}</h6>
            <h6>Total: {currencyToDisplay(currency, guestTotalAmount)}</h6>
            <div className="bee-flex-div" />
            {showError &&
              <p>{errorMessage}</p>
            }
            {showLoading &&
              <Loading />
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
              <div className="d-flex">
                {status === BookingStatus.GUEST_CONFIRMED &&
                  <>
                    <ToggleProvider>
                      {({ show, toggle }: ToggleProviderRef) => (
                        <>
                          <Button
                            background="secondary"
                            className="mr-3"
                            color="white"
                            onClick={toggle}>
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
                            onClick={toggle}>
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
                  <h6 className="text-danger">{getDisplayHostBookingStatus(status, currency)}</h6>
                }
              </div>
            }
            <hr className="d-md-none" />
          </Col>
          <Col className="px-4">
            <div className="host-booking-card-guest-meta-container">
              <h3>Guest Information</h3>
              <div className="host-booking-card--guest-meta">
                <h6>Name: {guest.firstName} {guest.lastName}</h6>
                <h6>Email: <a href={`mailto:${guest.email}`}>{guest.email}</a></h6>
                <h6>Guests: {numberOfGuests}</h6>
                {guest.phoneNumber && <h6>Phone: {guest.phoneNumber}</h6>}
              </div>
            </div>
          </Col>
        </Row>
      </Card>
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

import * as React from 'react';
import { compose, graphql } from 'react-apollo';

import {
  Booking,
  Currency,
  APPROVE_BOOKING,
  CANCEL_BOOKING,
  REJECT_BOOKING,
  PAYOUT_BOOKING,
  GET_ALL_BOOKINGS
} from 'networking/bookings';
import AudioLoading from 'shared/loading/AudioLoading';
import Fab from 'shared/Fab';
import LoadingPortal from 'shared/LoadingPortal';
import Portal from 'shared/Portal';
import { ToggleProvider, ToggleProviderRef } from 'shared/ToggleProvider';

import AdminBookingStatusOptionsCard from './AdminBookingStatusOptionsCard';
import { loadWeb3, invoice, payout, refund } from 'utils/web3';

interface Props extends Booking {
  approveBooking: () => Promise<void>;
  rejectBooking: () => Promise<void>;
  cancelBooking: () => Promise<void>;
  payoutBooking: () => Promise<void>;
}

interface State {
  showError: boolean;
  showLoading: boolean;
  errorMessage: string;
}

class AdminBookingStatusOptions extends React.Component<Props, State> {
  readonly state = {
    showError: false,
    showLoading: false,
    errorMessage: '',
  };

  render(): JSX.Element {
    const { currency } = this.props;
    if (this.state.showLoading) {
      return (
        <div className="update-status">
          <AudioLoading height={16} width={32} />
          <h2>Updating</h2>
          {(currency === Currency.BEE) && <LoadingPortal />}
        </div>
      );
    }
    if (this.state.showError) {
      return <p>{this.state.errorMessage}</p>;
    }
    const { status } = this.props;
    if (status === 'host_paid') {
      const { approvedBy, cancelBooking } = this.props;
      return (
        <div className="admin-booking-status--approved-by">
          <div className="admin-booking-status--meta">
            <h4>Accepted by:</h4>
            <span>{!!approvedBy ? approvedBy.split('@')[0] : 'Unknown'}</span>
          </div>
          <ToggleProvider>
            {({ show, toggle }: ToggleProviderRef) => (
              <>
                <Fab clear color="upper" height="40px" icon="utils/undo" noPadding onClick={toggle} width="40px">
                  Cancel
                </Fab>
                {show && (
                  <Portal color="up" opacity={0.9} onClick={toggle}>
                    <AdminBookingStatusOptionsCard
                      verb="cancel"
                      updateBooking={this.handleBooking.bind(this, toggle, cancelBooking)}
                      onClose={toggle}
                      {...this.props}
                    />
                  </Portal>
                )}
              </>
            )}
          </ToggleProvider>
        </div>
      );
    }

    const {
      approveBooking,
      rejectBooking,
      payoutBooking,
      cancelBooking
    } = this.props;
    const guestPaid = status === 'guest_paid';
    const advanceBooking = guestPaid ? payoutBooking : approveBooking;
    const rescindBooking = guestPaid ? cancelBooking : rejectBooking;
    return (
      <div className="admin-booking-status-options-container">
        <ToggleProvider>
          {({ show, toggle }: ToggleProviderRef) => (
            <>
              <Fab
                clear
                color="correct"
                height="24px"
                icon="utils/check-circle"
                noPadding
                onClick={toggle}
                width="24px">
                {guestPaid ? 'Payout' : 'Accept'}
              </Fab>
              {show && (
                <Portal color="up" opacity={0.9} onClick={toggle}>
                  <AdminBookingStatusOptionsCard
                    verb={guestPaid ? 'payout' : 'accept'}
                    updateBooking={this.handleBooking.bind(this, toggle, advanceBooking)}
                    onClose={toggle}
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
              <Fab clear color="error" height="24px" icon="utils/x-circle" noPadding onClick={toggle} width="24px">
                {guestPaid ? 'refund' : 'reject'}
              </Fab>
              {show && (
                <Portal color="up" opacity={0.9} onClick={toggle}>
                  <AdminBookingStatusOptionsCard
                    verb={guestPaid ? 'Refund' : 'Reject'}
                    updateBooking={this.handleBooking.bind(this, toggle, rescindBooking)}
                    onClose={toggle}
                    {...this.props}
                  />
                </Portal>
              )}
            </>
          )}
        </ToggleProvider>
      </div>
    );
  }

  handleBooking = async (toggle: ToggleProviderRef['toggle'], callback: () => Promise<void>) => {
    try {
      toggle();
      this.setState({ showLoading: true });
      await callback();
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

export default compose(
  graphql(APPROVE_BOOKING, {
    props: ({ mutate, ownProps }: any) => ({
      approveBooking: async () => {
        const { id, currency } = ownProps;
        if (currency === Currency.BEE) {
          const web3 = loadWeb3();
          await invoice(web3.eth, ownProps);
        }
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_ALL_BOOKINGS }],
          update: (store: any, { data }: any) => {
            const { allBookings } = store.readQuery({ query: GET_ALL_BOOKINGS });
            store.writeQuery({
              query: GET_ALL_BOOKINGS,
              data: {
                allBookings: generateUpdatedBookings(allBookings, data.approveBooking),
              },
            });
          },
        });
      },
    }),
  }),
  graphql(REJECT_BOOKING, {
    props: ({ mutate, ownProps: { id } }: any) => ({
      rejectBooking: () => {
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_ALL_BOOKINGS }],
          update: (store: any, { data }: any) => {
            const { allBookings } = store.readQuery({ query: GET_ALL_BOOKINGS });
            store.writeQuery({
              query: GET_ALL_BOOKINGS,
              data: {
                allBookings: generateUpdatedBookings(allBookings, data.rejectBooking),
              },
            });
          },
        });
      },
    }),
  }),
  graphql(CANCEL_BOOKING, {
    props: ({ mutate, ownProps: { id, currency, status } }: any) => ({
      cancelBooking: async () => {
        if (currency === Currency.BEE && status === 'guest_paid') {
          const web3 = loadWeb3();
          await refund(web3.eth, id);
        }
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_ALL_BOOKINGS }],
          update: (store: any, { data }: any) => {
            const { allBookings } = store.readQuery({ query: GET_ALL_BOOKINGS });
            store.writeQuery({
              query: GET_ALL_BOOKINGS,
              data: {
                allBookings: generateUpdatedBookings(allBookings, data.cancelBooking),
              },
            });
          },
        });
      },
    }),
  }),
  graphql(PAYOUT_BOOKING, {
    props: ({ mutate, ownProps: { id, currency } }: any) => ({
      payoutBooking: async () => {
        if (currency === Currency.BEE) {
          const web3 = loadWeb3();
          await payout(web3.eth, id);
        }
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_ALL_BOOKINGS }],
          update: (store: any, { data }: any) => {
            const { allBookings } = store.readQuery({ query: GET_ALL_BOOKINGS });
            store.writeQuery({
              query: GET_ALL_BOOKINGS,
              data: {
                allBookings: generateUpdatedBookings(allBookings, data.cancelBooking),
              },
            });
          },
        });
      },
    }),
  })
)(AdminBookingStatusOptions);

function generateUpdatedBookings(allBookings: Booking[], updatedBooking: Booking) {
  const index = allBookings.findIndex(booking => booking.id === updatedBooking.id);
  if (index < 0) {
    alert('Booking Id does not match. Please contact the nearest Beetoken Engineer.');
    return allBookings;
  }
  return [
    ...allBookings.slice(0, index),
    {
      ...allBookings[index],
      ...updatedBooking,
    },
    ...allBookings.slice(index + 1),
  ];
}

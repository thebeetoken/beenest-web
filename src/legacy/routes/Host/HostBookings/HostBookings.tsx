import * as React from 'react';
import { compose, graphql, Query } from 'react-apollo';

import { loadWeb3, invoice, refund } from 'utils/web3';

import HostBookingsContainer from './HostBookings.container';
import HostBookingCard from '../HostBookingCard';

import {
  Booking,
  Currency,
  APPROVE_BOOKING,
  CANCEL_BOOKING,
  GET_HOST_BOOKINGS,
  REJECT_BOOKING } from 'networking/bookings';
import generateUpdatedBookings from 'utils/generateUpdatedBookings';
import LoadingTakeover from 'components/loading/LoadingTakeover';

interface Props {
  approveBooking: (booking: Booking) => Promise<void>;
  cancelBooking: (booking: Booking) => Promise<void>;
  rejectBooking: (booking: Booking) => Promise<void>;
}

const HostBookings = (props: Props): JSX.Element => {
  const { approveBooking, cancelBooking, rejectBooking } = props;
  return (
    <HostBookingsContainer>
      <Query query={GET_HOST_BOOKINGS}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingTakeover />;

          if (error || !data) {
            return <h1>{error ? error.message : 'Error / No Data'}</h1>;
          }

          const { hostBookings } = data;

          if (hostBookings.length < 1) {
            return (
              <>
                <h1>You have no bookings yet.</h1>
                <p>Start promoting your listing on social media to get a booking!</p>
              </>
            );
          }

          const renderHostBookings = hostBookings.map((booking: Booking) => {
            return (
              <HostBookingCard
                approveBooking={approveBooking}
                cancelBooking={cancelBooking}
                rejectBooking={rejectBooking}
                {...booking}
                key={booking.id} />
            );
          });
          
          return renderHostBookings;
        }}
      </Query>
    </HostBookingsContainer>
  );
}

export default compose(
  graphql(APPROVE_BOOKING, {
    props: ({ mutate }: any) => ({
      approveBooking: async (booking: Booking) => {
        const { currency, id } = booking;
        if (currency === Currency.BEE) {
          const web3 = loadWeb3();
          await invoice(web3.eth, booking);
        }
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_HOST_BOOKINGS }],
          update: (store: any, { data }: any) => {
            const { hostBookings } = store.readQuery({ query: GET_HOST_BOOKINGS });
            store.writeQuery({
              query: GET_HOST_BOOKINGS,
              data: {
                hostBookings: generateUpdatedBookings(hostBookings, data.approveBooking),
              },
            });
          },
        });
      },
    }),
  }),
  graphql(REJECT_BOOKING, {
    props: ({ mutate }: any) => ({
      rejectBooking: (booking: Booking) => {
        const { id } = booking;
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_HOST_BOOKINGS }],
          update: (store: any, { data }: any) => {
            const { hostBookings } = store.readQuery({ query: GET_HOST_BOOKINGS });
            store.writeQuery({
              query: GET_HOST_BOOKINGS,
              data: {
                hostBookings: generateUpdatedBookings(hostBookings, data.rejectBooking),
              },
            });
          },
        });
      },
    }),
  }),
  graphql(CANCEL_BOOKING, {
    props: ({ mutate }: any) => ({
      cancelBooking: async (booking: Booking) => {
        const { currency, id, status } = booking;
        if (currency === Currency.BEE && status === 'guest_paid') {
          const web3 = loadWeb3();
          await refund(web3.eth, id);
        }
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_HOST_BOOKINGS }],
          update: (store: any, { data }: any) => {
            const { hostBookings } = store.readQuery({ query: GET_HOST_BOOKINGS });
            store.writeQuery({
              query: GET_HOST_BOOKINGS,
              data: {
                hostBookings: generateUpdatedBookings(hostBookings, data.cancelBooking),
              },
            });
          },
        });
      },
    }),
  })
)(HostBookings);

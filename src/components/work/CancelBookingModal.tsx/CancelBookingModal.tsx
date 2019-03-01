import * as React from 'react';
import { ModalHeader, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { GUEST_CANCEL_BOOKING, Booking, Currency, GET_GUEST_SORTED_BOOKINGS } from 'networking/bookings';
import { graphql, compose } from 'react-apollo';
import { differenceInDays } from 'date-fns';
import { cancel, loadWeb3 } from 'utils/web3';
import { AlertProperties } from 'components/work/Alert/Alert';
import LoadingPortal from 'components/work/LoadingPortal';
import { getFriendlyErrorMessage } from 'utils/validators';

interface Props {
  booking: Booking;
  cancelBooking: (booking: Booking) => Promise<Booking>;
  onModalAction: () => void;
  setAlert: (alert: AlertProperties) => void;
}

function CancelBookingModal({ booking, cancelBooking, onModalAction, setAlert }: Props) {
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  
  if (isSubmitting) {
    return <LoadingPortal currency={booking.currency} />;
  }

  return (
    <Modal isOpen toggle={() => !isSubmitting && onModalAction}>
      <ModalHeader>Cancel Booking</ModalHeader>
      <ModalBody>
        <h6>Are you sure you want to cancel this booking?</h6>
        <h6>Booking: {booking.id}</h6>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" disabled={isSubmitting} onClick={onModalAction}>Back</Button>{' '}
        <Button color="danger" disabled={isSubmitting} onClick={handleCancelBooking}>Yes, Cancel Booking</Button>
      </ModalFooter>
    </Modal>
  );

  function handleCancelBooking() {
    setSubmitting(true);
    cancelBooking(booking)
      .then(() => {
        setAlert({
          color: 'success',
          msg: 'Your booking has been cancelled',
          show: true,
        });
      })
      .catch((error: Error) => {
        setAlert({
          color: 'danger',
          msg: `There was an error processing your request. ${getFriendlyErrorMessage(error)}`,
          show: true,
        });
      })
      .finally(() => {
        setSubmitting(false)
        onModalAction();
      });
  };
}

export default compose(
  graphql(GUEST_CANCEL_BOOKING, {
    props: ({ mutate }: any) => ({
      cancelBooking: async (booking: Booking) => {
        const { id, currency, checkInDate, status } = booking;
        const days = differenceInDays(checkInDate, Date.now());
        if (currency === Currency.BEE && days >= 7 && status === 'guest_paid') {
          const web3 = loadWeb3();
          await cancel(web3.eth, id);
        }
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_GUEST_SORTED_BOOKINGS }],
          update: (store: any, { data: guestCancelBooking }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.allBookings) {
              return;
            }
            const { allBookings } = store.readQuery({ query: GET_GUEST_SORTED_BOOKINGS });
            const index = allBookings.findIndex((booking: Booking) => booking.id === id);
            allBookings[index].status = guestCancelBooking.status;
            store.writeQuery({ query: GET_GUEST_SORTED_BOOKINGS, data: allBookings });
          },
        });
      },
    }),
  })
)(CancelBookingModal);
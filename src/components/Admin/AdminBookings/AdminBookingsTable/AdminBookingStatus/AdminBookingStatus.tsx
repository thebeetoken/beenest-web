import * as React from 'react';
import AdminBookingStatusContainer from './AdminBookingStatus.container';
import AdminBookingStatusOptions from './AdminBookingStatusOptions';
import { Booking } from 'networking/bookings';

interface StatusHandlerProps {
  type: string;
  person: string | null;
}

const AdminBookingStatus = (props: Booking) => (
  <AdminBookingStatusContainer>{renderStatus(props)}</AdminBookingStatusContainer>
);

const getDisplayStatus = (status: string) => {
  switch (status) {
    case 'approved':
      return 'approved';
    case 'cancelled':
      return 'cancelled';
    case 'rejected':
      return 'rejected';
    default:
      return 'Unknown';
  }
};

const StatusHandler = ({ type, person }: StatusHandlerProps) => {
  const displayStatus = getDisplayStatus(type);
  return (
    <div className={`admin-booking-status--${displayStatus}-by`}>
      <h4>{displayStatus} by</h4>
      <span>{!!person ? person.split('@')[0] : 'Unknown'}</span>
    </div>
  );
};

const renderStatus = (props: Booking) => {
  const { status, rejectedBy, cancelledBy } = props;
  switch (status) {
    case 'guest_confirmed':
    case 'guest_paid':
    case 'init_pay_submitted':
      return <AdminBookingStatusOptions {...props} />;
    case 'guest_cancelled':
      return <StatusHandler type="cancelled" person={cancelledBy} />;
    case 'host_cancelled':
      return <StatusHandler type="cancelled" person={cancelledBy} />;
    case 'host_rejected':
      return <StatusHandler type="rejected" person={rejectedBy} />;
    case 'host_paid':
      return <AdminBookingStatusOptions {...props} />;
    default:
      return <p>Pending</p>;
  }
};

export default AdminBookingStatus;

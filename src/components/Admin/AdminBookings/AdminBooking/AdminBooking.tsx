import React from 'react';
import { Query } from 'react-apollo';

import AdminBookingContainer from './AdminBooking.container';
import AdminBookingStatus from './../AdminBookingsTable/AdminBookingStatus';

import AdminLoading from 'components/Admin/adminShared/components/AdminLoading';
import { GET_ADMIN_BOOKING } from 'networking/bookings';
import BeeLink from 'shared/BeeLink';
import { formatSingleDate } from 'utils/formatDate';
import { numberToLocaleString } from 'utils/numberToLocaleString';
import { getAdminBookingDisplayStatus } from 'utils/bookingsDisplayStatus';

const AdminBooking = ({ match }: any): JSX.Element => (
  <AdminBookingContainer>
    <Query query={GET_ADMIN_BOOKING} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AdminLoading />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const { booking } = data;
        return (
          <>
            <div>
              <h3>Booking: {booking.id}</h3>
              <div>
                <p>CheckIn: {formatSingleDate(booking.checkInDate)}</p>
                <p>CheckOut: {formatSingleDate(booking.checkOutDate)}</p>
              </div>
              <div>
                <p>
                  Number of Guests: <span>{booking.numberOfGuests}</span>
                </p>
              </div>
              <div>
                <p>
                  Total Amount:{' '}
                  {booking.guestTotalAmount ? numberToLocaleString(booking.guestTotalAmount, booking.currency) : '-'}{' '}
                  <span>{booking.currency}</span>
                </p>
              </div>
              <div>
                <p>
                  Listing: <BeeLink to={`/admin/listings/${booking.listing.id}/edit`}>{booking.listing.id}</BeeLink>
                </p>
              </div>
              <div>
                <p>Status: {getAdminBookingDisplayStatus(booking.status)}</p>
                <AdminBookingStatus {...booking} />
              </div>
            </div>
            <div>
              <p>
                Host: <BeeLink to={`/admin/users/${booking.guest.id}`}>{booking.host.firstName}</BeeLink>
              </p>
              <p>
                Host Id: <BeeLink to={`/admin/users/${booking.host.id}`}>{booking.host.id}</BeeLink>
              </p>
            </div>
            <div>
              <p>
                Guest: <BeeLink to={`/admin/users/${booking.guest.id}`}>{booking.guest.firstName} {booking.guest.lastName}</BeeLink>
              </p>
              <p>
                Guest Email: <span>{booking.guest.email}</span>
              </p>
              <p>
                Guest Id: <BeeLink to={`/admin/users/${booking.guest.id}`}>{booking.guest.id}</BeeLink>
              </p>
            </div>
          </>
        );
      }}
    </Query>
  </AdminBookingContainer>
);

export default AdminBooking;

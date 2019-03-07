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
        const agodaId = booking.listing.id.includes('agoda_') ? booking.listing.id.split('agoda_')[1] : '';
        const agodaLink = agodaId
          ? 'https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1819819'
            + `&hid=${agodaId}`
            + `&checkIn=${formatSingleDate(booking.checkInDate, 'YYYY-MM-DD')}`
            + `&checkOut=${formatSingleDate(booking.checkOutDate, 'YYYY-MM-DD')}`
          : '';
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
                  Price per night: <span>{booking.pricePerNight} {booking.currency}</span>
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
                Host ID: <BeeLink to={`/admin/users/${booking.host.id}`}>{booking.host.id}</BeeLink>
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
                Guest Phone Number: <span>{booking.guest.phoneNumber}</span>
              </p>
              <p>
                Guest ID: <BeeLink to={`/admin/users/${booking.guest.id}`}>{booking.guest.id}</BeeLink>
              </p>
            </div>
            {agodaLink && 
              <div>
                <p>Agoda Affiliate Link:</p>
                <p>
                  <BeeLink href={agodaLink} target="_blank">{agodaLink}</BeeLink>
                </p>
              </div>
            }
          </>
        );
      }}
    </Query>
  </AdminBookingContainer>
);

export default AdminBooking;

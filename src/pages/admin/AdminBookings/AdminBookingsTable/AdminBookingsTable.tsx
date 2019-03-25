import * as React from 'react';
import { Query } from 'react-apollo';

import AdminBookingsTableContainer from './AdminBookingsTable.container';
import AdminBookingTableRow from './AdminBookingTableRow';
import { Booking, GET_ALL_BOOKINGS } from 'networking/bookings';
import AdminLoading from '../../adminShared/components/AdminLoading';

const AdminBookingsTable = (): JSX.Element => (
  <AdminBookingsTableContainer>
    <Query query={GET_ALL_BOOKINGS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AdminLoading />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const { allBookings } = data;
        const renderAdminBookingTableRow = allBookings.map((booking: Booking) => (
          <AdminBookingTableRow key={booking.id} {...booking} />
        ));
        return (
          <table>
            <thead>
              <AdminBookingsTableHeader />
            </thead>
            <tbody>{renderAdminBookingTableRow}</tbody>
          </table>
        );
      }}
    </Query>
  </AdminBookingsTableContainer>
);

const AdminBookingsTableHeader = () => (
  <tr className="admin-table-row-container">
    <th className="admin-table-row--item">ID</th>
    <th className="admin-table-row--item">Listing</th>
    <th className="admin-table-row--item">Dates</th>
    <th className="admin-table-row--item">Paid Amount</th>
    <th className="admin-table-row--item">Status</th>
    <th className="admin-table-row--item">Confirmation</th>
  </tr>
);

export default AdminBookingsTable;

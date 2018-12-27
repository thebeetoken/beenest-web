import * as React from 'react';

import AdminBookingStatus from './AdminBookingStatus';

import { getAdminBookingDisplayStatus } from 'utils/bookingsDisplayStatus';
import BeeLink from 'shared/BeeLink';
import { Booking } from 'networking/bookings';
import { formatSingleDate } from 'utils/formatDate';
import { numberToLocaleString } from 'utils/numberToLocaleString';

const AdminBookingTableRow = (props: Booking) => {
  const { checkInDate, checkOutDate, currency, id, status, listing, guestTotalAmount } = props;
  return (
    <tr className="admin-table-row-container">
      <td className="admin-table-row--item">
        <BeeLink to={`/admin/bookings/${id}`}>
          <span>{id}</span>
        </BeeLink>
      </td>
      <td className="admin-table-row--item">
        <BeeLink href={`/listings/${listing.idSlug}`}>
          <span>{listing.idSlug}</span>
        </BeeLink>
      </td>
      <td className="admin-table-row--item">
        <span>In: {formatSingleDate(checkInDate)}</span>
        <span>Out: {formatSingleDate(checkOutDate)}</span>
      </td>
      <td className="admin-table-row--item">
        {guestTotalAmount ? numberToLocaleString(guestTotalAmount, currency) : '-'} <span>{currency}</span>
      </td>
      <td className="admin-table-row--item">{getAdminBookingDisplayStatus(status)}</td>
      <td className="admin-table-row--item">
        <AdminBookingStatus {...props} />
      </td>
    </tr>
  );
};

export default AdminBookingTableRow;

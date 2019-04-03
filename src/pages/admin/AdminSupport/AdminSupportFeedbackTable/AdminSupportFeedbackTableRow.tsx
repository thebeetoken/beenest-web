import * as React from 'react';

import { Feedback } from 'networking/feedback';
import { dateToYear } from 'utils/formatDate'

const AdminSupportFeedbackTableRow = ({ createdAt, feedback, nps, email }: Feedback) => (
  <tr className="admin-table-row-container">
    <td headers="email" className="admin-table-row--item">
      <span>{email}</span>
    </td>
    <td headers="nps" className="admin-table-row--item">
      <span>{nps || '-'}</span>
    </td>
    <td headers="feedback" className="admin-table-row--item">
      <span>{feedback}</span>
    </td>
    <td headers="createdAt" className="admin-table-row--item">
      <span>Created: {dateToYear(createdAt)}</span>
    </td>
  </tr>
);

export default AdminSupportFeedbackTableRow;

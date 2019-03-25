import * as React from 'react';
import { Link } from 'react-router-dom';

import Fab from 'legacy/shared/Fab';
import { Conference } from 'networking/conferences';
import { dateToYear } from 'utils/formatDate';

const AdminConferencesTableRow = ({ createdAt, id, title }: Conference) => (
  <tr>
    <td headers="id">
      <span><a href={`/conferences/${id}`}>{id}</a></span>
    </td>
    <td headers="title">
      <span><a href={`/conferences/${id}`}>{title}</a></span>
    </td>
    <td headers="createdAt">
      <span>Created: {dateToYear(createdAt)}</span>
    </td>

    <td headers="actions">
      <span className="edit-container">
        <Link to={`/admin/conferences/${id}/edit`}>
          <Fab
            clear
            color="edit"
            height="24px"
            icon="utils/edit-circle"
            noPadding
            width="24px" />
        </Link>
       </span>
    </td>
  </tr>
);

export default AdminConferencesTableRow;

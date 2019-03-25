import * as React from 'react';
import { Query } from 'react-apollo';

import AdminConferencesTableContainer from './AdminConferencesTable.container';
import AdminConferencesTableRow from './AdminConferencesTableRow';
import AdminLoading from '../adminShared/components/AdminLoading';
import { Conference, GET_ALL_CONFERENCES } from 'networking/conferences';

const AdminConferencesTable = (): JSX.Element => (
  <AdminConferencesTableContainer>
    <Query query={GET_ALL_CONFERENCES}>
      {({ loading, error, data }): JSX.Element => {
        if (loading) {
          return <AdminLoading />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const { allConferences } = data;
        const renderAdminConferencesTableRow = allConferences.map((conference: Conference) => (
           <AdminConferencesTableRow key={conference.id} {...conference} />
        ));
        return (
          <table>
            <thead>
              <AdminConferencesTableHeader />
            </thead>
            <tbody>{renderAdminConferencesTableRow}</tbody>
          </table>
        );
      }}
    </Query>
  </AdminConferencesTableContainer>
);

const AdminConferencesTableHeader = () => (
  <tr>
    <th id="id">ID</th>
    <th id="title">Title</th>
    <th id="createdAt">Created</th>
    <th id="actions">Actions</th>
  </tr>
);

export default AdminConferencesTable;

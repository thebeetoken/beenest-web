import * as React from 'react';
import { Query } from 'react-apollo';

import AdminSupportFeedbackTableContainer from './AdminSupportFeedbackTable.container';
import AdminSupportFeedbackTableRow from './AdminSupportFeedbackTableRow';
import AdminLoading from '../../adminShared/components/AdminLoading';
import { Feedback, GET_ALL_FEEDBACK } from 'networking/feedback';

const AdminSupportFeedbackTable = (): JSX.Element => (
  // refer to other tables to see query
  <AdminSupportFeedbackTableContainer>
    <Query query={GET_ALL_FEEDBACK}>
      {({ loading, error, data }): JSX.Element => {
        if (loading) {
          return <AdminLoading />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const { allFeedback } = data;
        const renderAdminFeedbackTableRow = allFeedback.map((feedback: Feedback) => (
          <AdminSupportFeedbackTableRow key={feedback.id} {...feedback} />
        ));
        return (
          <table>
            <thead>
              <AdminSupportFeedbackTableHeader />
            </thead>
            <tbody>{renderAdminFeedbackTableRow}</tbody>
          </table>
        );
      }}
    </Query>
  </AdminSupportFeedbackTableContainer>
);

const AdminSupportFeedbackTableHeader = () => (
  <tr className="admin-table-header-container">
    <th id="email" className="admin-table-header--item">Email</th>
    <th id="nps" className="admin-table-header--item">Nps</th>
    <th id="feedback" className="admin-table-header--item">Feedback</th>
    <th id="createdAt" className="admin-table-header--item">Date</th>
  </tr>
);

export default AdminSupportFeedbackTable;

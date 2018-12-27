import * as React from 'react';
import { Query } from 'react-apollo';

import AdminConferenceForm from './AdminConferenceForm';
import { GET_CONFERENCE_FORM } from 'networking/conferences';
import AdminLoading from 'components/Admin/adminShared/components/AdminLoading';

const AdminConferenceEdit = ({ match }: RouterProps): JSX.Element => {
  return <div>
    <Query query={GET_CONFERENCE_FORM} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AdminLoading />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const { conference } = data;
        return (
          <>
            <header><h1>Edit Conference ID: {match.params.id}</h1></header>
            <AdminConferenceForm conference={conference} />
          </>
        );
      }}
    </Query>
  </div>
};

export default AdminConferenceEdit;

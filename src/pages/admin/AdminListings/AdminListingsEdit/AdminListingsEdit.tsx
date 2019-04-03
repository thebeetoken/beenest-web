import React from 'react';
import { Query } from 'react-apollo';

import AdminListingsFormContainer from '../AdminListingsForm/AdminListingsForm.container';
import AdminListingsForm from '../AdminListingsForm';
import { GET_LISTING_FORM } from 'networking/listings';
import AdminLoading from '../../adminShared/components/AdminLoading';

const AdminListingsEdit = ({ match }: any): JSX.Element => (
  <AdminListingsFormContainer>
    <Query query={GET_LISTING_FORM} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AdminLoading />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const { listing } = data;
        return (
          <>
            <header><h1>Edit Listing ID: {match.params.id}</h1></header>
            <AdminListingsForm listing={listing} />
          </>
        );
      }}
    </Query>
  </AdminListingsFormContainer>
);

export default AdminListingsEdit;

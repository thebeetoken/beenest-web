import * as React from 'react';
import { Query } from 'react-apollo';
import AdminLoading from '../../adminShared/components/AdminLoading';
import AdminUsersHostFormContainer from './AdminUsersHostForm.container';
import AdminUsersHostForm from './AdminUsersHostForm';
import { GET_USER_BY_ID } from 'networking/users';

const AdminUsersEditHost = ({ match }: any) => (
  <AdminUsersHostFormContainer>
    <Query query={GET_USER_BY_ID} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AdminLoading />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const user = data.getUserById;
        return (
          <section className="admin-host-form-container">
            <header>
              <h1>Edit User Profile</h1>
            </header>
            <AdminUsersHostForm host={user} />
          </section>
        );
      }}
    </Query>
  </AdminUsersHostFormContainer>
);

export default AdminUsersEditHost;

import * as React from 'react';
import AdminUsersHostFormContainer from './AdminUsersHostForm.container';
import AdminUsersHostForm from './AdminUsersHostForm';

const AdminUsersCreateHost = (): JSX.Element => (
  <AdminUsersHostFormContainer>
    <section className="admin-host-form-container">
      <header>
        <h1>Create User Profile</h1>
      </header>
      <AdminUsersHostForm />
    </section>
  </AdminUsersHostFormContainer>
);

export default AdminUsersCreateHost;

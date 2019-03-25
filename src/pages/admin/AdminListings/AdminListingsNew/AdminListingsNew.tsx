import * as React from 'react';

import AdminListingsFormContainer from '../AdminListingsForm/AdminListingsForm.container';
import AdminListingsForm from '../AdminListingsForm/index';

const AdminListingsNew = () => (
  <AdminListingsFormContainer>
    <header>
      <h1>Add a new listing</h1>
    </header>
    <AdminListingsForm />
  </AdminListingsFormContainer>
);

export default AdminListingsNew;

import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdminUsersContainer from './AdminUsers.container';
import AdminAllUsersTable from './AdminAllUsersTable';
import AdminUsersHostTable from './AdminUsersHostTable';
import {
  AdminUsersCreateHost,
  AdminUsersEditHost,
} from './AdminUsersHostForm';

import NotFound from 'pages/notFound';

const AdminUsers = () => (
  <AdminUsersContainer className="admin-sub-container">
    <div className="admin-sub-content-container">
      <Switch>
        <Redirect exact from="/admin/users" to="/admin/users/all" />
        <Route exact path="/admin/users/all" component={AdminAllUsersTable} />
        <Route exact path="/admin/users/hosts" component={AdminUsersHostTable} />
        <Route exact path="/admin/users/new" component={AdminUsersCreateHost} />
        <Route exact path="/admin/users/:id/edit" component={(props: any) => <AdminUsersEditHost {...props} /> } />
        <Route exact path="/admin/users/:id" component={(props: any) => <AdminUsersEditHost {...props} /> } />
        <Route component={NotFound} />
      </Switch>
    </div>
  </AdminUsersContainer>
);

export default AdminUsers;

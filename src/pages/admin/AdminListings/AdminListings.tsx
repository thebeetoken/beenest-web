import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdminListingsTable from './AdminListingsTable';
import AdminListingsContainer from './AdminListings.container';
import AdminListingsNew from './AdminListingsNew';
import AdminListingsEdit from './AdminListingsEdit';

import NotFound from 'pages/notFound';

const AdminListings = () => (
  <AdminListingsContainer className="admin-sub-container">
    <div className="admin-sub-content-container">
      <Switch>
        <Redirect exact from="/admin/listings" to={{ pathname: '/admin/listings/all', search: location.search }} />
        <Route exact path="/admin/listings/all" component={AdminListingsTable} />
        <Route exact path="/admin/listings/new" component={AdminListingsNew} />
        <Route exact path={`/admin/listings/:id/edit`} component={(props: RouterProps) => <AdminListingsEdit {...props} />} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </AdminListingsContainer>
);

export default AdminListings;

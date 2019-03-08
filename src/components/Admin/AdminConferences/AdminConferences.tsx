import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminConferencesContainer from './AdminConferences.container';
import AdminConferencesTable from './AdminConferencesTable';
import AdminConferenceNew from './AdminConferenceNew';
import AdminConferenceEdit from './AdminConferenceEdit';

import NotFound from 'legacy/routes/NotFound';

const AdminConferences = () => (
  <AdminConferencesContainer className="admin-sub-container">
    <div className="admin-sub-content-container">
      <Switch>
        <Redirect exact from="/admin/conferences" to="/admin/conferences/all" />
        <Route exact path="/admin/conferences/all" component={AdminConferencesTable} />
        <Route exact path="/admin/conferences/new" component={AdminConferenceNew} />
        <Route exact path="/admin/conferences/:id/edit" component={AdminConferenceEdit} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </AdminConferencesContainer>
);

export default AdminConferences;

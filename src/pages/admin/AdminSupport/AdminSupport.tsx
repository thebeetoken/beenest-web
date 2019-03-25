import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminSupportContainer from './AdminSupport.container';
import AdminSupportFeedbackTable from './AdminSupportFeedbackTable';

import NotFound from 'pages/notFound';

const AdminSupport = () => (
  <AdminSupportContainer className="admin-sub-container">
    <div className="admin-sub-content-container">
      <Switch>
        <Redirect exact from="/admin/support" to="/admin/support/feedback" />
        <Route exact path="/admin/support/feedback" component={AdminSupportFeedbackTable} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </AdminSupportContainer>
);

export default AdminSupport;

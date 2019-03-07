import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminBookingsContainer from './AdminBookings.container';
import AdminBookingsTable from './AdminBookingsTable';
import AdminBooking from './AdminBooking';
import NotFound from 'legacy/routes/NotFound';

const AdminBookings = () => (
  <AdminBookingsContainer className="admin-sub-container">
    <div className="admin-sub-content-container">
      <Switch>
        <Redirect exact from="/admin/bookings" to="/admin/bookings/all" />
        <Route exact path="/admin/bookings/all" component={AdminBookingsTable} />
        <Route exact path="/admin/bookings/:id" component={AdminBooking} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </AdminBookingsContainer>
);

export default AdminBookings;

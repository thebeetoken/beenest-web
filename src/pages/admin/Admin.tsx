/**
 * This is the main Admin screen
 *
 * In addition, it will render default tab, AdminTabsBooking
 *
 * @author tommy, andy, kevin
 **/

import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';

import AdminContainer from './Admin.container';
import AdminHeader from './AdminHeader';
import AdminBookings from './AdminBookings';
import AdminConferences from './AdminConferences';
import AdminSupport from './AdminSupport';
import AdminListings from './AdminListings';
import AdminNavigation from './AdminNavigation';
import AdminUsers from './AdminUsers';
import AdminSideNavigation from './AdminSideNavigation';

import Divider from 'components/shared/Divider';
import NotFound from 'pages/notFound';

const Admin = (): JSX.Element => (
  <AdminContainer className="admin-container">
    <AdminHeader />
    <div className="admin-body">
      <AdminNavigation />
      <AdminSideNavigation />
      <Divider className="admin-divider" color="up" />
      <Switch>
        <Route path="/admin/bookings" component={AdminBookings} />
        <Route path="/admin/listings" component={AdminListings} />
        <Route path="/admin/users" component={AdminUsers} />
        <Route path="/admin/conferences" component={AdminConferences} />
        <Route path="/admin/support" component={AdminSupport} />
        <Redirect from="/admin" to="/admin/bookings/all" />
        <Route component={NotFound} />
      </Switch>
    </div>
  </AdminContainer>
);

// We are wrapping a route guard on top of the Admin component
// The guard will verify whether the user is an admin
// according to firebase
export default () => (
  <FirebaseConsumer>
    {({ isAdmin, loading }: FirebaseUserProps) => {
      if (loading) {
        return null;
      }
      return isAdmin ? <Admin /> : <Redirect to="/login" />;
    }}
  </FirebaseConsumer>
);

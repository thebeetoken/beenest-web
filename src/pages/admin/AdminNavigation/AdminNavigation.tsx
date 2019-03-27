/**
 * This is the Admin tabs component
 * that houses the link/routing
 * to the various tabs.
 *
 *
 * @author @tommy, @andy, @kevin
 **/

import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Fab from 'components/shared/Fab';
import AdminNavigationContainer from './AdminNavigation.container';

const AdminNavigation = (): JSX.Element => (
  <AdminNavigationContainer>
    <NavLink to="/admin/bookings" activeClassName="active">
      <Fab
        background="white"
        icon="admin/booking"
        noPadding />
    </NavLink>
    <NavLink to="/admin/listings" activeClassName="active">
      <Fab
        background="white"
        icon="admin/listing"
        noPadding />
    </NavLink>
    <NavLink to="/admin/users" activeClassName="active">
      <Fab
        background="white"
        icon="admin/user"
        noPadding />
    </NavLink>
    <NavLink to="/admin/conferences" activeClassName="active">
      <Fab
        background="white"
        icon="admin/conference"
        noPadding />
    </NavLink>
    <NavLink to="/admin/support" activeClassName="active">
      <Fab
        background="white"
        icon="decorative/chat"
        noPadding />
    </NavLink>
  </AdminNavigationContainer>
);

export default AdminNavigation;

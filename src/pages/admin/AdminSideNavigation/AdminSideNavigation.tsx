/**
 * This is the side nav component
 * that houses the link/routing
 * to the various tabs.
 *
 *
 * @author kevin
 **/

import * as React from 'react';
import { LocationDescriptor } from 'history';

import { AdminSideNavigationData } from './AdminSideNavigation.config';
import AdminSideNavigationContainer from './AdminSideNavigation.container';
import BeeLink from 'components/BeeLink';

interface AdminSideNavigationItemProps {
  href?: string;
  isNav: boolean;
  target?: string;
  title: string;
  to?: string;
}

interface RoutesObjectProps {
  parent: string;
  header: string;
  children: Children[];
}

interface Children {
  children?: React.ReactNode;
  exact?: boolean;
  href?: string;
  isNav: boolean;
  target?: string;
  title: string;
  to?: LocationDescriptor;
}

const AdminSideNavigation = (): JSX.Element | null => {
  let parentRoute: string;

  // hijack react router
  if (location.pathname === '/admin' || location.pathname === '/admin/') {
    parentRoute = 'bookings';
  } else {
    parentRoute = location.pathname.replace('/admin/', '').split('/')[0];
  }

  const routeIndex = AdminSideNavigationData.findIndex(({ parent }: RoutesObjectProps) => parent === parentRoute);

  if (!AdminSideNavigationData[routeIndex]) {
    return null;
  }
  const { children, header } = AdminSideNavigationData[routeIndex];
  const renderAdminSideNavigationItems = children.map((props: AdminSideNavigationItemProps) => (
    <div className="admin-side-navigation--items" key={props.title}>
      <BeeLink {...props}>
        <span>{props.title}</span>
      </BeeLink>
    </div>
  ));

  return (
    <AdminSideNavigationContainer>
      <div className="admin-side-navigation-content">
        <header>{header}</header>
        {renderAdminSideNavigationItems}
      </div>
    </AdminSideNavigationContainer>
  );
};

export default AdminSideNavigation;

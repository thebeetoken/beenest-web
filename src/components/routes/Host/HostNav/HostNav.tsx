import * as React from 'react';

import HostNavContainer from './HostNav.container';

import TabNav from 'shared/TabNav';

interface HostNav {
  title: string;
  to: string;
}

const hostNavConfig = [
  {
    title: 'Bookings',
    to: '/host/bookings',
  },
  {
    title: 'Listings',
    to: '/host/listings',
  },
  {
    title: 'Payments',
    to: '/host/payments',
  },
];

const HostNav = (): JSX.Element => (
  <HostNavContainer>
    <TabNav config={hostNavConfig} height={48} width={160} />
  </HostNavContainer>
);

export default HostNav;
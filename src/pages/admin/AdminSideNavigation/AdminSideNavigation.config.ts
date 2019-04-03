export const AdminSideNavigationData = [
  {
    parent: 'bookings',
    header: 'Booking',
    children: [
      {
        isNav: true,
        title: 'All Bookings',
        to: '/admin/bookings/all',
      },
    ],
  },
  {
    parent: 'listings',
    header: 'Listing',
    children: [
      {
        isNav: true,
        title: 'All Listings',
        to: '/admin/listings/all',
      },
      {
        isNav: true,
        title: 'Create Listing',
        to: '/admin/listings/new',
      }
    ],
  },
  {
    parent: 'conferences',
    header: 'Conference',
    children: [
      {
        isNav: true,
        title: 'Conferences',
        to: '/admin/conferences/all',
      },
      {
        isNav: true,
        title: 'Create Conference',
        to: '/admin/conferences/new',
      }
    ],
  },
  {
    parent: 'users',
    header: 'User',
    children: [
      {
        isNav: true,
        title: 'All Users',
        to: '/admin/users/all',
      },
      {
        isNav: true,
        title: 'Hosts',
        to: '/admin/users/hosts',
      },
      {
        isNav: true,
        title: 'Create Host',
        to: '/admin/users/new',
      }
    ],
  },
  {
    parent: 'support',
    header: 'Support',
    children: [
      {
        isNav: true,
        title: 'Feedback',
        to: '/admin/support/feedback',
      },
    ],
  },
];

import * as React from 'react';

import { SEARCH_HOSTS } from 'networking/users';
import AdminUsersTable from '../AdminUsersTable';

export default () => <AdminUsersTable gqlQuery={SEARCH_HOSTS} gqlProperty='searchHosts' />;

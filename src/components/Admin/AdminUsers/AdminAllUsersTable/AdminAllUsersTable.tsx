import * as React from 'react';

import { SEARCH_USERS } from 'networking/users';
import AdminUsersTable from '../AdminUsersTable';

export default () => <AdminUsersTable gqlQuery={SEARCH_USERS} gqlProperty='searchUsers' />;


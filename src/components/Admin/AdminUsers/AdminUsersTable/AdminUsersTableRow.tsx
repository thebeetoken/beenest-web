import * as React from 'react';
import { Link } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import AdminUsersDeleteCard from './AdminUsersDeleteCard';

import BeeLink from 'shared/BeeLink';
import Fab from 'shared/Fab';
import Portal from 'shared/Portal';
import { ToggleProvider, ToggleProviderRef } from 'shared/ToggleProvider';
import { User } from 'networking/users';

interface Props extends User {
  onDeleteUser: (id: string) => Promise<any>;
}

const AdminUsersTableRow = (props: Props) => {
  const { completedVerification, onDeleteUser, id, email, firstName, lastName, stripeAccountDashboardLink, walletAddress, listingCount } = props;
  return (
    <tr className="admin-table-row-container">
      <td className="admin-table-row--item">
      <CopyToClipboard text={id}>
        <span>{id}</span>
      </CopyToClipboard>
      </td>
      <td className="admin-table-row--item">
        <span>{firstName} {lastName}</span>
        <CopyToClipboard text={email || 'email does not exist'}>
          <span>{email}</span>
        </CopyToClipboard>
      </td>
      <td className="admin-table-row--item">
        <span className={walletAddress ? 'found' : 'not-found'}>Wallet: {walletAddress ? 'Found' : 'Not Found'}</span>
        <span className={stripeAccountDashboardLink ? 'found' : 'not-found'}>Stripe:
          {stripeAccountDashboardLink ? 'Found' : 'Not Found' }
        </span>
      </td>
      <td className="admin-table-row--item">
        <span>{completedVerification ? 'Verified' : 'Not Verified'}</span>
        <span><BeeLink href={`https://app.autopilothq.com/#contacts/list/all/search/${email}/`} target="_blank">User Activity Autopilot</BeeLink></span>
        {!!listingCount && listingCount > 0 && <span><BeeLink to={`/admin/listings?userId=${id}`}>See {listingCount} listings</BeeLink></span> }
      </td>
      <td className="admin-table-row--item">
        <span className="edit-container">
          <Link to={`${id}/edit`}>
            <Fab
              clear
              color="edit"
              height="24px"
              icon="utils/edit-circle"
              noPadding
              width="24px" />
          </Link>
          <div>
            <ToggleProvider>
              {({ show, toggle }: ToggleProviderRef) => (
                <>
                  <Fab
                    clear
                    color="error"
                    height="24px"
                    icon="utils/trash-circle"
                    noPadding
                    onClick={toggle}
                    width="24px" />
                  {show &&
                    <Portal color="up" opacity={0.9} onClick={toggle}>
                      <AdminUsersDeleteCard
                        onDeleteUser={onDeleteUser}
                        onClose={toggle}
                        {...props}
                      />
                    </Portal>
                  }
                </>
              )}
            </ToggleProvider>
          </div>
        </span>
      </td>
    </tr>
  );
};

export default AdminUsersTableRow;

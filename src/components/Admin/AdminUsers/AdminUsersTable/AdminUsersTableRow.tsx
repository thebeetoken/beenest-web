import * as React from 'react';
import { Link } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import AdminUsersDeleteCard from './AdminUsersDeleteCard';

import { SETTINGS } from 'configs/settings';
import BeeLink from 'shared/BeeLink';
import Fab from 'shared/Fab';
import Portal from 'shared/Portal';
import { ToggleProvider, ToggleProviderRef } from 'shared/ToggleProvider';
import { User } from 'networking/users';

const { BEENEST_HOST } = SETTINGS;

interface Props extends User {
  onDeleteUser: (id: string) => Promise<any>;
}

const AdminUsersTableRow = (props: Props) => {
  const { completedVerification, onDeleteUser, id, email, firstName, lastName, stripeAccountDashboardLink, walletAddress } = props;
  const splitEmail = email ? email.split('@') : 'email does not exist';
  return (
    <tr className="admin-table-row-container">
      <td className="admin-table-row--item">
      <CopyToClipboard text={id}>
        <span>{id}</span>
      </CopyToClipboard>
      </td>
      <td className="admin-table-row--item">
      <CopyToClipboard text={email || 'email does not exist'}>
        <span>
          <span>{email ? splitEmail[0] : 'email does not exist'}</span>
          <span>@{email ? splitEmail[1] : 'email does not exist'}</span>
        </span>
      </CopyToClipboard>
      </td>
      <td className="admin-table-row--item">
        <span>{firstName}</span>
        <span>{lastName}</span>
      </td>
      <td className="admin-table-row--item">
        <span className={walletAddress ? 'found' : 'not-found'}>Wallet: {walletAddress ? 'Found' : 'Not Found'}</span>
        <span className={stripeAccountDashboardLink ? 'found' : 'not-found'}>Stripe:
          {stripeAccountDashboardLink
            ? 'Found'
            : <BeeLink href={`${BEENEST_HOST}/account/stripe_express/new`} target="_blank">
                Not Found
              </BeeLink>
          }
        </span>
      </td>
      <td className="admin-table-row--item">
        <span>{completedVerification ? 'Verified' : 'Not Verified'}</span>
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

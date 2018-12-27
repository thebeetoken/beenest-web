import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { Query } from 'react-apollo';

import AdminListingsTableContainer from './AdminListingsTable.container';
import AdminListingTableRow from './AdminListingTableRow';
import { Listing, DELETE_LISTING, GET_ALL_LISTINGS } from 'networking/listings';
import AdminLoading from '../../adminShared/components/AdminLoading';

interface Props {
  deleteListing: (id: string) => Promise<any>,
}

const AdminListingsTable = ({ deleteListing }: Props): JSX.Element => (
  <AdminListingsTableContainer>
    <Query query={GET_ALL_LISTINGS}>
      {({ loading, error, data }): JSX.Element => {
        if (loading) {
          return <AdminLoading />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const { allListings } = data;
        const renderAdminListingTableRow = allListings.map((listing: Listing) => (
          <AdminListingTableRow key={listing.id} {...listing} deleteListing={deleteListing} />
        ));
        return (
          <table>
            <thead>
              <AdminListingsTableHeader />
            </thead>
            <tbody>{renderAdminListingTableRow}</tbody>
          </table>
        );
      }}
    </Query>
  </AdminListingsTableContainer>
);

const AdminListingsTableHeader = () => (
  <tr className="admin-table-header-container">
    <th className="admin-table-header--item">ID</th>
    <th className="admin-table-header--item">Listing Title</th>
    <th className="admin-table-header--item">Location</th>
    <th className="admin-table-header--item">Host</th>
    <th className="admin-table-header--item">Host Email</th>
    <th className="admin-table-header--item">Status</th>
    <th className="admin-table-header--item">Edit/Remove</th>
  </tr>
);

export default compose(
  graphql(DELETE_LISTING, {
    props: ({ mutate }: any) => ({
      deleteListing: (id: string) => {
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_ALL_LISTINGS }],
          update: (store: any) => {
            const { allListings } = store.readQuery({ query: GET_ALL_LISTINGS });
            store.writeQuery({
              query: GET_ALL_LISTINGS,
              data: {
                allListings
              },
            });
          },
        });
      },
    }),
  })
)(AdminListingsTable);

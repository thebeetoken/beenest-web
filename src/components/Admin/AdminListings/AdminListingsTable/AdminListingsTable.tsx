import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { Query } from 'react-apollo';

import AdminListingsTableContainer from './AdminListingsTable.container';
import AdminListingTableRow from './AdminListingTableRow';
import { Listing, DELETE_LISTING, GET_ALL_LISTINGS } from 'networking/listings';
import AdminLoading from '../../adminShared/components/AdminLoading';

import Button from 'shared/Button';
import { Paginator, PaginatorRef } from 'shared/Paginator';
import { parseQueryString } from 'utils/queryParams';

interface QueryParams {
  userId?: string;
  userEmail?: string;
}

interface Props {
  deleteListing: (id: string) => Promise<any>,
}

const AdminListingsTable = ({ deleteListing }: Props): JSX.Element => {
  const queryParams: QueryParams = parseQueryString(location.search);
  const { userId, userEmail } = queryParams;
  const limit = 20;
  return (<AdminListingsTableContainer>
    <Paginator limit={20}>{({ offset, next, previous }: PaginatorRef) => (
      <Query query={GET_ALL_LISTINGS} fetchPolicy="cache-and-network" variables={{ input: { offset, limit, userId, userEmail } }}>
        {({ loading, error, data }): JSX.Element => {
          if (loading) {
            return <AdminLoading />;
          }
          if (error || !data) {
            return <h1>{error ? error.message : 'Error / No Data'}</h1>;
          }
          const { listings, count } = data.allListings;
          const renderAdminListingTableRow = listings.map((listing: Listing) => (
            <AdminListingTableRow key={listing.id} {...listing} deleteListing={deleteListing} />
          ));
          return (
            <table>
              <thead>
                <AdminListingsTableHeader />
              </thead>
              <tbody>{renderAdminListingTableRow}</tbody>
              {(count > limit) &&
                <tfoot>
                    <tr className="admin-table-row-container paginator">
                      <td>
                        <Button
                          disabled={offset === 0}
                          onClick={() => previous(count)}>
                          Previous
                        </Button>
                      </td>
                      <td>
                        <h6 className="admin-table-count">
                          {offset + 1} to {offset + listings.length} of {count}
                        </h6>
                      </td>
                      <td>
                        <Button
                          disabled={offset >= count - limit}
                          onClick={() => next(count)}>
                          Next
                        </Button>
                      </td>
                    </tr>
                </tfoot>
              }
            </table>
          );
        }}
      </Query>
    )}</Paginator>
  </AdminListingsTableContainer>);
};

const AdminListingsTableHeader = () => (
  <tr className="admin-table-row-container">
    <th className="admin-table-row--item">ID</th>
    <th className="admin-table-row--item">Title</th>
    <th className="admin-table-row--item">Location</th>
    <th className="admin-table-row--item">Host</th>
    <th className="admin-table-row--item">Status</th>
    <th className="admin-table-row--item">Edit</th>
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

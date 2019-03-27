import * as React from 'react';
import { DocumentNode } from 'graphql';
import { compose, graphql, Query } from 'react-apollo';

import AdminUsersTableContainer from './AdminUsersTable.container';
import AdminUsersTableRow from './AdminUsersTableRow';
import AdminLoading from '../../adminShared/components/AdminLoading';

import { DELETE_USER, User } from 'networking/users';
import AdminInputWrapper from 'components/shared/AdminInputWrapper';
import Button from 'components/shared/Button';

import { Paginator, PaginatorRef } from 'components/shared/Paginator';

const limit = 20;

interface State {
  query: string;
}

interface Props {
  gqlQuery: DocumentNode;
  gqlProperty: string;
  deleteUser: (id: string) => Promise<any>;
}

class AdminUsersTable extends React.Component<Props, State> {
  readonly state = {
    query: '',
  }

  render() {
    const { gqlQuery, gqlProperty } = this.props;
    const { query } = this.state;
    return (
      <AdminUsersTableContainer>
        <SearchInput onSubmit={this.handleSubmit} />
        <Paginator limit={limit} key={query}>
          {({ offset, next, previous }: PaginatorRef) => (
            <Query query={gqlQuery} variables={{ input: { query, limit, offset } }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <AdminLoading />;
                }
                if (error || !data) {
                  return <h1>{error ? error.message : 'Error / No Data'}</h1>;
                }
                const { users, count } = data[gqlProperty];
                const renderAdminUsersTableRow = users.map((user: User) => (
                  <AdminUsersTableRow key={user.id} {...user} onDeleteUser={this.props.deleteUser} />
                ));
                return (
                  <table>
                    <thead>
                      <AdminUsersTableHeader />
                    </thead>
                    <tbody>
                      {renderAdminUsersTableRow}
                    </tbody>
                    {!(offset === 0 && users.length < limit) &&
                      <tfoot>
                          <tr className="admin-table-row-container paginator">
                            <td>
                              <Button
                                disabled={offset === 0}
                                onClick={() => previous(users.length)}>
                                Previous
                              </Button>
                            </td>
                            <td>
                              <h6 className="admin-table-count">
                                {offset + 1} to {offset + users.length} of {count}
                              </h6>
                            </td>
                            <td>
                              <Button
                                disabled={users.length !== limit}
                                onClick={() => next(users.length)}>
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
          )}
        </Paginator>
      </AdminUsersTableContainer>
    );
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.setState({ query: event.target[0].value });
  }
}

const AdminUsersTableHeader = () => (
  <tr className="admin-table-row-container">
    <th className="admin-table-row--item">ID</th>
    <th className="admin-table-row--item">User</th>
    <th className="admin-table-row--item">Payout Accounts</th>
    <th className="admin-table-row--item">Account Status</th>
    <th className="admin-table-row--item">Edit</th>
  </tr>
);

interface SearchInputState {
  query: string;
}

interface SearchInputProps {
  onSubmit: (event: React.FormEvent) => void;
}

class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
  readonly state = {
    query: '',
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit} className="user-searchbar">
        <AdminInputWrapper>
          <input
            onChange={this.handleInput}
            placeholder="Enter email"
            name="query"
            type="text"
            value={this.state.query} />
        </AdminInputWrapper>
        <Button
          background="secondary"
          color="white"
          radius="4px"
          type="submit"
          size="small">
          Search
        </Button>
      </form>
    )
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  }
}

export default compose(
  graphql(DELETE_USER, {
    props: ({ mutate }: any) => ({
      deleteUser: (id: string) => {
        return mutate({
          variables: { id },
        });
      },
    }),
  })
)(AdminUsersTable);

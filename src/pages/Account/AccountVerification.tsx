import * as React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { REFRESH_VERIFICATION_STATUS, GET_USER } from 'networking/users';

class AccountVerification extends React.Component<any> {
  render() {
    return (
      <ListGroup className="mb-2 d-flex flex-column">
        <ListGroupItem className="mb-5 w-100 d-flex flex-column">
          <h6 className="mb-0">Phone (Required) <span className="small">(Verified)</span></h6>
          <div className="d-flex justify-content-between">
            <h6 className="mb-0 small text-muted">Click here to change and verify your phone number</h6>
            <i className="fa fa-lock"></i>
          </div>
        </ListGroupItem>

        <ListGroupItem className="w-100 d-flex flex-column">
          <h6 className="mb-0">Email (Required) <span className="small">(Verified)</span></h6>
          <div className="d-flex justify-content-between">
            <h6 className="mb-0 small text-muted">Your email has been verified</h6>
            <i className="fa fa-lock"></i>
          </div>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
export default compose(
  graphql(REFRESH_VERIFICATION_STATUS, {
    props: ({ mutate }: any) => ({
      refreshVerificationStatus: () => {
        return mutate({
          refetchQueries: [{ query: GET_USER }],
          update: (store: any, { data: refreshVerificationStatus }: any) => {
            const { user } = store.readQuery({ query: GET_USER });
            const updatedUser = {...user, ...refreshVerificationStatus};
            store.writeQuery({ query: GET_USER, data: { user: updatedUser} });
          },
        });
      },
    }),
  }),
)(AccountVerification);
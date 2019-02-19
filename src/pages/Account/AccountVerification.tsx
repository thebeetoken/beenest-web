import * as React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { REFRESH_VERIFICATION_STATUS, GET_USER } from 'networking/users';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { FirebaseUser } from 'utils/firebase';

class AccountVerification extends React.Component<any> {
  render() {
    return (
      <FirebaseConsumer>
        {({ user }: FirebaseUserProps) => {
          const emailVerified = !!(user && user.emailVerified);
          const phoneVerified = (user && user.providerData || []).some((provider: FirebaseUser) => provider && provider.providerId === 'phone');

          return (
            <>
              <ListGroup className="mb-2 d-flex flex-column">
                <ListGroupItem className="mb-5 w-100 d-flex flex-column" disabled={phoneVerified}>
                  <h6 className="mb-0">Phone (Required){' '}
                    {phoneVerified
                      ? <span className="small text-success">(Verified)</span>
                      : <span className="small text-danger">(Not Verified)</span>
                    }
                  </h6>
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0 small text-muted">Click here to change and verify your phone number</h6>
                    <i className="fa fa-lock"></i>
                  </div>
                </ListGroupItem>

                <ListGroupItem className="w-100 d-flex flex-column" disabled={emailVerified}>
                  <h6 className="mb-0">Email (Required){' '}
                    {emailVerified
                      ? <span className="small text-success">(Verified)</span>
                      : <span className="small text-danger">(Not Verified)</span>
                    }
                  </h6>
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0 small text-muted">Your email has been verified</h6>
                    <i className="fa fa-lock"></i>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </>
          )
        }}
      </FirebaseConsumer>
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
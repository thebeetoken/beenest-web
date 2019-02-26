import * as React from 'react';
import { Modal, ModalHeader, ModalBody, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { REFRESH_VERIFICATION_STATUS, GET_USER } from 'networking/users';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { FirebaseUser } from 'utils/firebase';
import PhoneNumberVerificationForm from './PhoneNumberVerificationForm';

function AccountVerification() {
  const [modal, setModal] = React.useState<boolean>(false);

    return (
      <FirebaseConsumer>
        {({ user }: FirebaseUserProps) => {
          const emailVerified = !!(user && user.emailVerified);
          const phoneVerified = (user && user.providerData || []).some((provider: FirebaseUser) => provider && provider.providerId === 'phone');

          return (
            <>
              <ListGroup className="d-flex flex-column">
                <ListGroupItem
                  disabled={phoneVerified}
                  className="mb-5"
                  onClick={toggleModal}>
                  <CardBody>
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
                  </CardBody>
                </ListGroupItem>

                <ListGroupItem
                  disabled={emailVerified}>
                  <CardBody>
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
                  </CardBody>
                </ListGroupItem>
              </ListGroup>

              {modal &&
                <PhoneNumberVerificationForm
                  // onClose={this.closeModal}
                  // showSnackBarSuccess={this.closeModalAndShowSuccessSnackbar}
                  refreshVerificationStatus={''}
                  user={user} />
              }
            </>
          )
        }}
      </FirebaseConsumer>
    );
  
    function toggleModal() {
      setModal(!modal);
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
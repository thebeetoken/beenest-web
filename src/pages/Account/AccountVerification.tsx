import * as React from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { CardBody, ListGroup, ListGroupItem, Alert } from 'reactstrap';
import { REFRESH_VERIFICATION_STATUS, GET_USER } from 'networking/users';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { auth, FirebaseUser } from 'utils/firebase';

import PhoneNumberVerificationForm from './PhoneNumberVerificationForm';
import { AlertProperties } from 'components/work/Alert/Alert';
import { getDisplaySuccessMessage, SuccessMessage } from 'utils/validators';

interface Props {
  refreshVerificationStatus: () => Promise<void>;
}

const VERIFICATION_MESSAGE = {
  EMAIL: {
    VERIFIED: 'Your email has been verified',
    VERIFY: 'Click here to verify your email address',
  },
  LOADING: 'Loading',
  PHONE: {
    ADD: 'Click here to add and verify your phone number',
    CHANGE: 'Click here to change and verify your phone number',
  },
};

const AccountVerification: React.SFC<Props> = ({ refreshVerificationStatus }: Props) => {
  const [isOpen, setModal] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<AlertProperties>({ color: '', msg: '', show: false });
  const [isEmailSubmitting, setEmailSubmitting] = React.useState<boolean>(false);

  React.useEffect(() => {
    refreshVerificationStatus();
  });

  return (
    <FirebaseConsumer>
      {({ user }: FirebaseUserProps) => {
        const emailVerified = !!(user && user.emailVerified);
        const phoneVerified = (user && user.providerData || []).some((provider: FirebaseUser) => provider && provider.providerId === 'phone');

        if (!user) {
          return (
            <ListGroup className="d-flex flex-column">
              <ListGroupItem
                disabled={phoneVerified}
                className="mb-5">
                <CardBody>
                  {VERIFICATION_MESSAGE.LOADING}
                </CardBody>
              </ListGroupItem>

              <ListGroupItem
                disabled={emailVerified}>
                <CardBody>
                  {VERIFICATION_MESSAGE.LOADING}
                </CardBody>
              </ListGroupItem>
            </ListGroup>
          );
        }

        return (
          <>
            <Alert
              color={alert.color}
              isOpen={alert.show}
              toggle={() => setAlert({ ...alert, show: false })}>
              {alert.msg}
            </Alert>

            <ListGroup className="d-flex flex-column">
              <ListGroupItem
                className="mb-5"
                onClick={toggleModal}>
                <CardBody>
                  <h6 className="mb-0">Phone (Required){' '}
                    {phoneVerified
                      ? <span className="small text-success">(Verified)</span>
                      : <span className="small text-danger">(Not{'\u00A0'}Verified)</span>
                    }
                  </h6>
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0 small text-muted">
                      {phoneVerified
                        ? VERIFICATION_MESSAGE.PHONE.CHANGE
                        : VERIFICATION_MESSAGE.PHONE.ADD
                      }
                    </h6>
                    <i className="fa fa-lock"></i>
                  </div>
                </CardBody>
              </ListGroupItem>

              <ListGroupItem
                disabled={emailVerified || isEmailSubmitting}
                onClick={handleEmailVerification}>
                <CardBody>
                  <h6 className="mb-0">Email (Required){' '}
                    {emailVerified
                      ? <span className="small text-success">(Verified)</span>
                      : <span className="small text-danger">(Not{'\u00A0'}Verified)</span>
                    }
                  </h6>
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0 small text-muted">
                      {emailVerified
                        ? VERIFICATION_MESSAGE.EMAIL.VERIFIED
                        : VERIFICATION_MESSAGE.EMAIL.VERIFY
                      }
                    </h6>
                    <i className="fa fa-lock"></i>
                  </div>
                </CardBody>
              </ListGroupItem>
            </ListGroup>

            <PhoneNumberVerificationForm
              isOpen={isOpen}
              toggleModal={toggleModal}
              refreshVerificationStatus={refreshVerificationStatus}
              user={user} />
          </>
        )
      }}
    </FirebaseConsumer>
  );

  function handleEmailVerification() {
    if (!auth.currentUser) {
      return setAlert({
        color: 'danger',
        msg: 'Could not find current user.',
        show: true,
      });
    }

    setEmailSubmitting(true);
    auth.currentUser.sendEmailVerification()
      .then(() => {
        setAlert({
          color: 'success',
          msg: getDisplaySuccessMessage(SuccessMessage.EMAIL_VERIFICATION_SENT),
          show: true,
        })
      })
      .catch((error: Error) => {
        console.error(error);
        setAlert({
          color: 'danger',
          msg: error.message,
          show: true,
        })
      })
      .finally(() => setEmailSubmitting(false));
  }

  function toggleModal() {
    setModal(!isOpen);
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
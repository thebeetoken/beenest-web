import * as React from 'react';
import { ListGroup, ListGroupItem, Alert, CardBody } from 'reactstrap';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { User } from 'firebase';

import { getDisplaySuccessMessage, SuccessMessage, getDisplayErrorMessage, ErrorMessage, errorMessages } from 'utils/validators';
import { resetPassword } from 'utils/firebase';
import { AlertProperties } from 'components/work/Alert/Alert';

function AccountSecurity() {
  const [alert, setAlert] = React.useState<AlertProperties>({ color: '', msg: '', show: false });
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);

  return (
    <>
      <Alert
        isOpen={alert.show}
        color={alert.color}
        toggle={() => setAlert({ ...alert, show: false })}>
        {alert.msg}
      </Alert>

      <FirebaseConsumer>
        {({ user }: FirebaseUserProps) => (
          <ListGroup className="mb-2 d-flex flex-column">
            {user &&
              <ListGroupItem
                className="w-100 d-flex flex-column"
                disabled={isSubmitting}
                onClick={() => handleResetPasswordClick(user)}>
                <CardBody>
                  <h6 className="mb-0">Reset Password</h6>
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0 small text-muted">Click here to reset your password</h6>
                    <i className="fas fa-lock"></i>
                  </div>
                </CardBody>
              </ListGroupItem>
            }
          </ListGroup>
        )}
      </FirebaseConsumer>
    </>
  );

  function handleResetPasswordClick(user: User) {
    if (!user.email) {
      setAlert({
        color: 'danger',
        msg: getDisplayErrorMessage(errorMessages.emailMissing),
        show: true,
      });
      return;
    }
    
    setSubmitting(true);
    resetPassword(user.email)
      .then(() => {
        setAlert({
          color: 'success',
          msg: getDisplaySuccessMessage(SuccessMessage.CHECK_EMAIL),
          show: true,
        });
      })
      .catch(() => {
        setAlert({
          color: 'danger',
          msg: getDisplayErrorMessage(ErrorMessage.GENERIC),
          show: true,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }
}

export default AccountSecurity;

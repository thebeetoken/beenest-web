import * as React from 'react';
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import { resetPassword } from 'utils/firebase';
import { getDisplaySuccessMessage, SuccessMessage, getDisplayErrorMessage, ErrorMessage } from 'utils/validators';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { User } from 'firebase';

interface AlertProperties {
  color: string;
  msg: string;
}

function AccountSecurity() {
  const [alert, setAlert] = React.useState<AlertProperties>({ color: '', msg: '' });
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);

  function handleClick(user: User) {
    if (!user.email) return;
    
    setSubmitting(true);
    resetPassword(user.email)
      .then(() => {
        setAlert({
          color: 'success',
          msg: getDisplaySuccessMessage(SuccessMessage.CHECK_EMAIL),
        });
      })
      .catch(() => {
        setAlert({
          color: 'danger',
          msg: getDisplayErrorMessage(ErrorMessage.GENERIC),
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <>
      <FirebaseConsumer>
        {({ user }: FirebaseUserProps) => (
          <ListGroup className="mb-2 d-flex flex-column">
            {user &&
              <ListGroupItem
                className="w-100 d-flex flex-column"
                disabled={isSubmitting}
                onClick={() => handleClick(user)}>
                <h6 className="mb-0">Reset Password</h6>
                <div className="d-flex justify-content-between">
                  <h6 className="mb-0 small text-muted">Click here to reset your password</h6>
                  <i className="fa fa-lock"></i>
                </div>
              </ListGroupItem>
            }
          </ListGroup>
        )}
      </FirebaseConsumer>

      {alert.msg &&
        <Alert
          color={alert.color}>
          {alert.msg}
        </Alert>
      }
    </>
  );
}

export default AccountSecurity;

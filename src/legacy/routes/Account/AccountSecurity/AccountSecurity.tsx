import * as React from 'react';

import AccountSecurityContainer from './AccountSecurity.container';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import ListButton from 'legacy/shared/ListButton';
import Snackbar from 'legacy/shared/Snackbar';
import { resetPassword } from 'utils/firebase';
import {
  ErrorMessage,
  getDisplayErrorMessage,
  getDisplaySuccessMessage,
  SuccessMessage,
} from 'utils/validators';

const SNACKBAR_DURATION_MS = 5000;

interface State {
  snackbar: {
    autoHideDuration: number;
    message: string;
    open: boolean;
  };
  submitStatus: SubmitStatus;
}

export enum SubmitStatus {
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  PRISTINE = 'PRISTINE',
  SUCCESS = 'SUCCESS'
}

export class AccountSecurity extends React.Component {
  readonly state: State = {
    snackbar: {
      autoHideDuration: SNACKBAR_DURATION_MS,
      message: '',
      open: false,
    },
    submitStatus: SubmitStatus.PRISTINE
  };

  render() {
    return (
      <AccountSecurityContainer>
        <FirebaseConsumer>
          {({ user }: FirebaseUserProps) => {
            if (user && (this.state.submitStatus !== SubmitStatus.LOADING)) {
              const { snackbar } = this.state;
              return (
                <>
                  <ListButton
                    label="Reset Password"
                    onClick={this.handleSubmit.bind(this, user.email)}
                    src="decorative/lock">
                    Click here to reset your password
                  </ListButton>
                  {snackbar.open &&
                    <Snackbar
                      autoHideDuration={snackbar.autoHideDuration}
                      open={snackbar.open}
                      onClose={this.closeSnackbar}>
                      {snackbar.message}
                    </Snackbar>
                  }
                </>
              );
            }

            return (
              <ListButton
                label="Reset Password"
                disabled
                src="decorative/lock">
                Click here to reset your password
              </ListButton>
            );
          }}
        </FirebaseConsumer>
      </AccountSecurityContainer>
    );
  }



  handleSubmit = (email: string) => {
    this.setState({ submitStatus: SubmitStatus.LOADING });
    resetPassword(email)
      .then(() => {
        this.setState({
          snackbar: {
            autoHideDuration: SNACKBAR_DURATION_MS,
            message: getDisplaySuccessMessage(SuccessMessage.CHECK_EMAIL),
            open: true,
          },
          submitStatus: SubmitStatus.SUCCESS,
        });
      })
      .catch(() => {
        this.setState({
          snackbar: {
            autoHideDuration: SNACKBAR_DURATION_MS,
            message: getDisplayErrorMessage(ErrorMessage.GENERIC),
            open: true,
          },
          submitStatus: SubmitStatus.ERROR,
        });
      });
  }

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false,
      }
    });
  }
};

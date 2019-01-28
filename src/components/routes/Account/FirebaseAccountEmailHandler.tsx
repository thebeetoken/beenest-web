import * as React from 'react';
import { Redirect } from 'react-router';
import { parseQueryString } from 'utils/queryParams';
import AudioLoading from 'shared/loading/AudioLoading';
import { auth } from 'utils/firebase';
import Button from 'shared/Button';
import InputWrapper from 'shared/InputWrapper';
import BeeLink from 'shared/BeeLink';
import GeneralWrapper from 'shared/GeneralWrapper';
import styled from 'styled-components';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';

interface State {
  isSubmitting: boolean;
  hasError: boolean;
  showPasswordResetForm: boolean;
  showPasswordResetSuccess: boolean;
  showVerifyEmailSuccess: boolean;
  successMessage: string;
  errorMessage: string;
  password: string;
  oobCode: string; //firebase code from email
}

interface QueryParams {
  mode?: string;
  oobCode?: string;
  continueUrl?: string;
  lang?: string;
}

const DefaultContainer = styled.div`
    h2 {
      margin-top: 18px;
    }

    section {
      margin-top: 18px;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      margin: 16px 0px 28px 0px;
      width: 100%;
    }
  }
`;

export default class FirebaseAccountEmailHandler extends React.Component<RouterProps> {
  readonly state: State = {
    isSubmitting: false,
    hasError: false,
    showPasswordResetForm: true,
    showPasswordResetSuccess: false,
    showVerifyEmailSuccess: false,
    errorMessage: '',
    successMessage: '',
    password: '',
    oobCode: ''
  };

  componentDidMount() {
    const queryParams: QueryParams = parseQueryString(this.props.location.search);
    const { mode, oobCode } = queryParams;

    if (!mode) {
      alert('Error, no mode defined.');
      return;
    }

    if (!oobCode) {
      alert('Error, no oobCode defined.');
      return;
    }
    this.setState({oobCode});

    // @see https://firebase.google.com/docs/auth/custom-email-handler
    switch (mode) {
     case 'resetPassword':
        this.handleResetPassword(oobCode);
        break;
     case 'verifyEmail':
        this.handleVerifyEmail(oobCode);
       break;
     default:
       // Error: invalid mode.
    }
  }

  handleFormChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    return this.setState({[name]: value });
  }

  handleVerifyEmail(oobCode:string) {
    auth.applyActionCode(oobCode).then(() => {
      this.setState({ isSubmitting: false, showVerifyEmailSuccess: true, successMessage: 'Thanks for verifying your email.' });
    }).catch(err => {
      console.error(err);
      this.setState({ isSubmitting: false, hasError: true, errorMessage: 'There was an error verifying your email.' });
    });
  }

  // @see https://firebase.google.com/docs/auth/custom-email-handler
  handleResetPassword(actionCode:string) {
    // Verify the password reset code is valid.
    auth.verifyPasswordResetCode(actionCode).then(() => {
      this.setState({showPasswordResetForm: true});
    }).catch(() => {
      this.setState({hasError: true, errorMessage: 'Invalid or expired action code. Ask user to try to reset the password again.'});
    });
  }

  handlePasswordResetSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Save the new password.
    auth.confirmPasswordReset(this.state.oobCode, this.state.password).then(() => {
      // Password reset has been confirmed and new password updated.
      // Redirect user back to /login to confirm their password worked
      this.setState({showPasswordResetSuccess: true});
    }).catch(() => {
      this.setState({hasError: true, errorMessage: 'Password is too weak or the password reset link has expired.'});
    });
  }

  renderError() {
    return <>
      <h2>Sorry, there was an error.</h2>
      <p>{this.state.errorMessage}</p>
      <p>
        <BeeLink href="mailto:support@beenest.com">
          <Button>Contact us for further help.</Button>
        </BeeLink>
      </p>
    </>;
  }

  renderVerifyEmailSuccess() {
     return <>
            <h2>{this.state.successMessage}</h2>

            <FirebaseConsumer>
            {({ loading, user, completedVerification }: FirebaseUserProps) => {
              if (loading) {
                return <AudioLoading />;
              }

              if (user && !completedVerification) {
                return <section>
                        <BeeLink href="/account/verification">
                          <Button>Verify your phone number to book a rental</Button>
                        </BeeLink>
                      </section>;
              }

              if (user && !!completedVerification) {
                return <section>
                  <BeeLink to="/host/listings">
                    <Button>List your home for rent</Button>
                  </BeeLink>
                  or
                  <BeeLink to="/">
                    <Button border="black" background="white">Find a place to stay at</Button>
                  </BeeLink>
                </section>;
              }

              return <></>;
            }}
            </FirebaseConsumer>
          </>;
  }

  renderPasswordResetForm() {
      return <>
          <h2>Reset Password</h2>
              <form onSubmit={this.handlePasswordResetSubmit}>
                 <div className="input-container">
                   <InputWrapper>
                   <label>New Password:</label>
                   <input type="password" value={this.state.password} onChange={this.handleFormChange} id="password" name="password" />
                   </InputWrapper>
                 </div>
                 <Button type="submit">Save</Button>
             </form>
          </>;
  }

  renderPasswordResetSuccess() {
     return <Redirect to="/login" />;
  }

  render() {
    if (this.state.isSubmitting) {
      return <GeneralWrapper width={976}>
             <AudioLoading height={48} width={96} />
           </GeneralWrapper>;
    }

    return (
        <GeneralWrapper width={976}>
          <DefaultContainer>
          <div className="complete">
            {this.state.hasError && this.renderError()}
            {this.state.showVerifyEmailSuccess && this.renderVerifyEmailSuccess()}
            {this.state.showPasswordResetForm && this.renderPasswordResetForm()}
            {this.state.showPasswordResetSuccess && this.renderPasswordResetSuccess()}
          </div>
          </DefaultContainer>
        </GeneralWrapper>
    );
  }
};

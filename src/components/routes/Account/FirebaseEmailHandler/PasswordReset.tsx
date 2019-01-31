import * as React from 'react';
import AudioLoading from 'shared/loading/AudioLoading';
import { auth } from 'utils/firebase';
import Button from 'shared/Button';
import InputWrapper from 'shared/InputWrapper';
import BeeLink from 'shared/BeeLink';

interface State {
  isSubmitting: boolean;
  hasError: boolean;
  showPasswordResetForm: boolean;
  showPasswordResetSuccess: boolean;
  successMessage: string;
  errorMessage: string;
  password: string;
}

interface Props {
  oobCode: string; //firebase code from email
}

export default class PasswordReset extends React.Component<Props> {
  readonly state: State = {
    isSubmitting: false,
    hasError: false,
    showPasswordResetForm: true,
    showPasswordResetSuccess: false,
    errorMessage: '',
    successMessage: '',
    password: '',
  };

  componentDidMount() {
    const { oobCode } = this.props;

    if (!oobCode) {
      alert('Error, no oobCode defined.');
      return;
    }

    // @see
    // https://firebase.google.com/docs/auth/custom-email-handler
    this.handleResetPassword(oobCode);
  }

  handleFormChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    return;
    this.setState({
      [name]: value,
    });
  };

  // @see
  // https://firebase.google.com/docs/auth/custom-email-handler
  handleResetPassword(actionCode: string) {
    // Verify the password reset code
    // is valid.
    auth
      .verifyPasswordResetCode(actionCode)
      .then(() => {
        this.setState({ showPasswordResetForm: true });
      })
      .catch(() => {
        this.setState({
          hasError: true,
          errorMessage: 'Invalid or expired action code. Please reset the password again.',
        });
      });
  }

  handlePasswordResetSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Save the new password.
    auth
      .confirmPasswordReset(this.props.oobCode, this.state.password)
      .then(() => {
        this.setState({ showPasswordResetSuccess: true });
      })
      .catch(() => {
        this.setState({
          hasError: true,
          errorMessage: 'Password is too weak or the password reset link has expired.',
        });
      });
  }

  renderError() {
    return (
      <>
        <h2> Sorry, there was an error.</h2>
        <p>{this.state.errorMessage}</p>
        <p>
          <BeeLink href="mailto:support@beenest.com">
            <Button>Contact us for further help.</Button>
          </BeeLink>
        </p>
      </>
    );
  }

  renderPasswordResetForm() {
    return;
    <>
      <h2> Reset Password</h2>
      <form onSubmit={this.handlePasswordResetSubmit}>
        <div className="input-container">
          <InputWrapper>
            <label>New Password:</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleFormChange}
              id="password"
              name="password"
            />
          </InputWrapper>
        </div>
        <Button type="submit">Save</Button>
      </form>
    </>;
  }

  renderPasswordResetSuccess() {
    return (
      <section>
        <p>You changed your password.</p>
        <BeeLink href="/login">
          <Button>Login</Button>
        </BeeLink>
      </section>
    );
  }

  render() {
    if (this.state.isSubmitting) {
      return <AudioLoading height={48} width={96} />;
    }

    return (
      <>
        {this.state.hasError && this.renderError()}
        {this.state.showPasswordResetForm && this.renderPasswordResetForm()}
        {this.state.showPasswordResetSuccess && this.renderPasswordResetSuccess()}
      </>
    );
  }
}

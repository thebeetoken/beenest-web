import * as React from 'react';
import { Button, Col, Container, Fade, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

import Loading from 'shared/loading/Loading';
import {
  CONTAINER_CLASSES,
  CONTENT_CLASSES,
  PRIMARY_BUTTON_CLASSES
} from 'styled/custom.styled';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';
import { auth } from 'utils/firebase';

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
    showPasswordResetForm: false,
    showPasswordResetSuccess: false,
    errorMessage: '',
    successMessage: '',
    password: '',
  };

  componentDidMount() {
    const { oobCode } = this.props;

    if (!oobCode) {
      alert('Error, no oobCode defined.');
    }

    // @see
    // https://firebase.google.com/docs/auth/custom-email-handler
    this.handleResetPassword(oobCode);
  }

  handleFormChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // @see
  // https://firebase.google.com/docs/auth/custom-email-handler
  handleResetPassword = (actionCode: string) => {
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

  handlePasswordResetSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!this.props.oobCode) {
      return this.setState({
        hasError: true,
        errorMessage: 'Invalid or expired action code. Please reset the password again.',
      });
    }

    if (!this.state.password) {
      return alert('Invalid password.');
    }

    // Save the new password.
    auth
      .confirmPasswordReset(this.props.oobCode, this.state.password)
      .then(() => {
        this.setState({ showPasswordResetForm: false, showPasswordResetSuccess: true });
      }).catch((err: Error) => {
        console.error(err);
        this.setState({
          hasError: true,
          errorMessage: 'Password is too weak(at least 8 characters) or the password reset link has expired.',
        });
      });
  }

  renderError(): React.ReactNode {
    return (
      <Container tag={Fade} className={CONTAINER_CLASSES}>
        <h2 className={CONTENT_CLASSES.TITLE}>Sorry, there was an error</h2>
        <p className={CONTENT_CLASSES.SUBTITLE}>{this.state.errorMessage}</p>
        <Row>
          <a target="_blank" href="https://support.beenest.com/" className={PRIMARY_BUTTON_CLASSES}>
            Contact us for further help
          </a>
        </Row>
      </Container>
    );
  }

  renderPasswordResetForm(): React.ReactNode {
    return (
      <Container tag={Fade} className={CONTAINER_CLASSES}>
        <Col md="6" lg="5">
          <h2 className={CONTENT_CLASSES.TITLE}>Reset Password</h2>
          <Form className="mt-4" onSubmit={this.handlePasswordResetSubmit} type="POST">
            <FormGroup>
              <Label for="password" className="form-label">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                id="password"
                onChange={this.handleFormChange}
                placeholder="********"
              />
            </FormGroup>
            <Button color="primary" className={`${PRIMARY_BUTTON_CLASSES} w-100 mt-3`} type="submit">Save</Button>
          </Form>
        </Col>
      </Container>
    );
  }

  renderPasswordResetSuccess() {
    return (
      <Container tag={Fade} className={CONTAINER_CLASSES}>
        <h2 className={CONTENT_CLASSES.TITLE}>You have changed your password</h2>
        <p className={CONTENT_CLASSES.SUBTITLE}>You can now login with your new password.</p>
        <Row>
          <Link to="/work/login">
            <Button color="primary" className={PRIMARY_BUTTON_CLASSES}>Login</Button>
          </Link>
        </Row>
      </Container>
    );
  }

  render() {
    if (this.state.isSubmitting) {
      return (
        <Container tag={Fade} className={VIEWPORT_CENTER_LAYOUT}>
          <Loading height="8rem" width="8rem" />
        </Container>
      );
    }

    return (
      <Fade>
        {this.state.hasError && this.renderError()}
        {this.state.showPasswordResetForm && this.renderPasswordResetForm()}
        {this.state.showPasswordResetSuccess && this.renderPasswordResetSuccess()}
      </Fade>
    );
  }
}

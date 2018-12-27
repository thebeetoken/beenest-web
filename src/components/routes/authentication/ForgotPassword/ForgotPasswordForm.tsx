import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from 'shared/Button';
import InputWrapper from 'shared/InputWrapper';
import { resetPassword } from 'utils/firebase';
import {
  ErrorMessage,
  FieldValidation,
  getDisplayErrorMessage,
  getInputErrorClass,
} from 'utils/validators';

interface State {
  inputForm: {
    email: string;
  };
  inputValidation: {
    email: FieldValidation
  };
}

class ForgotPasswordForm extends Component<RouterProps, State> {
  readonly state: State = {
    inputForm: {
      email: '',
    },
    inputValidation: {
      email: FieldValidation.PRISTINE,
    }
  };

  render() {
    const { inputForm, inputValidation } = this.state;
    return (
      <form
        className="forgot-password-form"
        onSubmit={this.handleSubmit}>
        <div className="forgot-password-input-container">
          <InputWrapper>
            <input
              onChange={this.handleInput}
              placeholder="Email"
              type="email"
              name="email"
              value={inputForm.email} />
          </InputWrapper>
          <span
            className={`bee-error-message ${getInputErrorClass(inputValidation.email)}`.trim()}>
            {getDisplayErrorMessage(ErrorMessage.INVALID_EMAIL)}
          </span>
        </div>
        <Button
          type="submit">
          Send Request
        </Button>
      </form>
    );
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resetPassword(this.state.inputForm.email)
      .then(() => this.props.history.push('/forgot_password_confirmation'))
      .catch(() => this.setEmailError());
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ inputForm: { email: event.target.value }});
  setEmailError = () => {
    this.setState({
      inputForm: { email: '' },
      inputValidation: { email: FieldValidation.ERROR }
    });
  }
}

export default withRouter(ForgotPasswordForm);

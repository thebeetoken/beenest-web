import * as React from 'react';
import { compose, graphql } from 'react-apollo';

import {
  CreateUser,
  CREATE_OR_LOGIN_FACEBOOK_USER,
  CREATE_USER,
  User
} from 'networking/users';
import Button from 'shared/Button';
import Divider from 'shared/Divider';
import InputWrapper from 'shared/InputWrapper';
import AudioLoading from 'shared/loading/AudioLoading';
import { auth, login, signInWithFacebookPopUp } from 'utils/firebase';
import { parseQueryString } from 'utils/queryParams';
import {
  ErrorMessage,
  FieldValidation,
  getDisplayErrorMessage,
  getInputValidationClass,
  getInputErrorClass,
  isValidEmail,
  isNotEmpty,
  isValidPassword,
  getFriendlyErrorMessage
} from 'utils/validators';

interface State {
  inputForm: {
    email: string;
    code: string | undefined;
    firstName: string;
    lastName: string;
    password: string;
    [name: string]: string | undefined;
  };
  inputValidation: {
    email: FieldValidation;
    firstName: FieldValidation;
    submitError: FieldValidation;
    lastName: FieldValidation;
    password: FieldValidation;
    [name: string]: string;
  };
  isSubmitting: boolean;
  redirect: boolean;
  submitErrorMessage: string;
}

interface SignUpProps extends RouterProps {
  createOrLoginFacebookUser: (id: string) => Promise<any>;
  createUser: (user: CreateUser) => Promise<User>;
}

interface QueryParams {
  code?: string;
}

class SignUpForm extends React.Component<SignUpProps, State> {
  readonly state = {
    inputForm: {
      email: '',
      code: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    inputValidation: {
      email: FieldValidation.PRISTINE,
      firstName: FieldValidation.PRISTINE,
      submitError: FieldValidation.PRISTINE,
      lastName: FieldValidation.PRISTINE,
      password: FieldValidation.PRISTINE,
    },
    isSubmitting: false,
    redirect: false,
    submitErrorMessage: getDisplayErrorMessage(ErrorMessage.GENERIC)
  };

  componentDidMount() {
    const queryParams: QueryParams = parseQueryString(location.search);
    if (queryParams.code) {
      this.setState({
        inputForm: {
          ...this.state.inputForm,
          code: queryParams.code,
        }
      });
    }
  }

  render() {
    const { inputForm, inputValidation, isSubmitting, submitErrorMessage } = this.state;

    return (
      <>
        {!isSubmitting ? (
          <>
            <Button
              background="facebook"
              color="white"
              onClick={this.signInWithFacebook}
              prefix="social/facebook-circle">
              Sign up with Facebook
            </Button>
            <div className="authentication-divider">
              <Divider />
              <span>or</span>
              <Divider />
            </div>
            <h1>Sign up with email</h1>
            <form
              className="signup-form"
              onSubmit={this.handleSubmit}>
              <div className="signup-input-container">

                <div className="signup-form-name-wrapper">
                  <div className="signup-form-name-container">
                    <InputWrapper>
                      <input
                        className={getInputValidationClass(inputValidation.firstName)}
                        onChange={this.handleInput}
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        value={inputForm.firstName} />
                    </InputWrapper>
                    <span
                      className={`bee-error-message ${getInputErrorClass(inputValidation.firstName)}`.trim()}>
                      {getDisplayErrorMessage(ErrorMessage.IS_EMPTY)}
                    </span>
                  </div>

                  <div className="signup-form-name-container">
                    <InputWrapper>
                      <input
                        className={getInputValidationClass(inputValidation.lastName)}
                        onChange={this.handleInput}
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={inputForm.lastName} />
                    </InputWrapper>
                    <span
                      className={`bee-error-message ${getInputErrorClass(inputValidation.lastName)}`.trim()}>
                      {getDisplayErrorMessage(ErrorMessage.IS_EMPTY)}
                    </span>
                  </div>
                </div>

                <div className="signup-form-email-container">
                  <InputWrapper>
                    <input
                      className={getInputValidationClass(inputValidation.email)}
                      onChange={this.handleInput}
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={inputForm.email} />
                  </InputWrapper>
                  <span
                    className={`bee-error-message ${getInputErrorClass(inputValidation.email)}`.trim()}>
                    {getDisplayErrorMessage(ErrorMessage.EMAIL)}
                  </span>
                </div>

                <div className="signup-form-password-container">
                  <InputWrapper>
                    <input
                      className={getInputValidationClass(inputValidation.password)}
                      onChange={this.handleInput}
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={inputForm.password} />
                  </InputWrapper>
                  <span
                    className={`bee-error-message ${getInputErrorClass(inputValidation.password)}`.trim()}>
                    {getDisplayErrorMessage(ErrorMessage.PASSWORD)}
                  </span>
                  <span
                    className={`bee-error-message ${this.getSubmitErrorClass()}`.trim()}>
                    {submitErrorMessage}
                  </span>
                </div>

              </div>
              <Button
                disabled={this.state.isSubmitting || this.areFormInputsValid()}
                type="submit">
                Sign Up
            </Button>
            </form>
          </>
        ) : (
          <div className="signup-loading">
            <AudioLoading height={48} width={96} />
          </div>
        )}
      </>
    );
  }

  getSubmitErrorClass = () => {
    const { submitError, password } = this.state.inputValidation;
    return password === FieldValidation.ERROR ? '' : getInputErrorClass(submitError);
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { inputForm, inputValidation } = this.state;
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        this.setState({
          inputForm: { ...inputForm, email: value },
          inputValidation: {
            ...inputValidation,
            email: isValidEmail(value),
            submitError: FieldValidation.PRISTINE
          }
        });
        break;
      case 'password':
        this.setState({
          inputForm: { ...inputForm, password: value },
          inputValidation: {
            ...inputValidation,
            password: isValidPassword(value),
            submitError: FieldValidation.PRISTINE
          }
        });
        break;
      default:
        this.setState({
          inputForm: { ...inputForm, [name]: value },
          inputValidation: {
            ...inputValidation,
            [name]: isNotEmpty(value),
            submitError: FieldValidation.PRISTINE
          }
        });
    }
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { inputForm } = this.state;
    this.setState({ isSubmitting: true });
    this.props.createUser(inputForm)
      .then((_) => login(inputForm.email, inputForm.password))
      .then((_) => !auth.currentUser ? Promise.resolve() : auth.currentUser.sendEmailVerification())
      .catch((error: Error) => this.setSignupError(error));
  }

  areFormInputsValid = () => {
    const { email, firstName, lastName, password } = this.state.inputValidation;
    const isEmailValid = email === FieldValidation.SUCCESS;
    const isFirstNameValid = firstName === FieldValidation.SUCCESS;
    const isLastNameValid = lastName === FieldValidation.SUCCESS;
    const isPasswordValid = password === FieldValidation.SUCCESS;
    const allValid = !(isEmailValid && isFirstNameValid && isLastNameValid && isPasswordValid);
    return allValid;
  }

  setSignupError = (error: Error) => {
    this.setState({
      inputValidation: {
        ...this.state.inputValidation,
        submitError: FieldValidation.ERROR
      },
      isSubmitting: false,
      submitErrorMessage: getFriendlyErrorMessage(error),
    });
  }

  signInWithFacebook = () => {
    signInWithFacebookPopUp()
      .then((result) => this.props.createOrLoginFacebookUser(result.user.uid))
      .catch((error: Error) => this.setSignupError(error));
  }
}

export default compose(
  graphql(CREATE_USER, {
    props: ({ mutate }: any) => ({
      createUser: (input: CreateUser): Promise<any> => {
        return mutate({ variables: { input } });
      },
    }),
  }),
  graphql(CREATE_OR_LOGIN_FACEBOOK_USER, {
    props: ({ mutate }: any) => ({
      createOrLoginFacebookUser: (id: string): Promise<User> => {
        return mutate({ variables: { id } });
      },
    }),
  })
)(SignUpForm);

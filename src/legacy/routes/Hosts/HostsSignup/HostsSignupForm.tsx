import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import {
  CreateHost,
  CREATE_HOST,
  User
} from 'networking/users';
import Button from 'legacy/shared/Button';
import InputWrapper from 'legacy/shared/InputWrapper';
import AudioLoading from 'legacy/shared/loading/AudioLoading';
import { auth, login } from 'utils/firebase';
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
    isAlreadyListed: string;
    lastName: string;
    password: string;
    propertiesManaged: string;
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
  submitted: boolean;
}

interface HostsSignupProps extends RouterProps {
  createUser: (user: CreateHost) => Promise<User>;
}

interface QueryParams {
  code?: string;
}

const NUMBER_OF_PROPERTIES_MANAGED = [
  '1-5',
  '6-10',
  '11-50',
  '51-100+',
];

class HostsSignupForm extends React.Component<HostsSignupProps, State> {
  readonly state = {
    inputForm: {
      email: '',
      code: '',
      firstName: '',
      isAlreadyListed: 'true',
      lastName: '',
      password: '',
      propertiesManaged: NUMBER_OF_PROPERTIES_MANAGED[0],
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
    submitErrorMessage: getDisplayErrorMessage(ErrorMessage.GENERIC),
    submitted: false,
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
    const { inputForm, inputValidation, isSubmitting, submitErrorMessage, submitted } = this.state;
    return (
      <FirebaseConsumer>
        {({ user }: FirebaseUserProps) => {
          /*
            We're handling the redirect here because when we sign up the user, we also
            sign them in, causing 'user' to become true and trickle down to redirect the user
            before we can access the .then() in the handleSubmit function.
          */
          if (user && submitted) {
            return <Redirect to="/legacy/host/listings?utm_campaign=host_account_created" />
          }

          if (user && !submitted) {
            return <Redirect to="/legacy/host/listings" />
          }

          return (
            <>
              {!isSubmitting ? (
                <>
                  <h1>You're 1 Step Away from Earning Passive Income on Beenest!</h1>
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

                      <div className="signup-form-number-of-properties-container" id="number-of-properties">
                        <h2>How many properties do you own?</h2>
                        <div className="hosts-signup-radio-group">
                          {NUMBER_OF_PROPERTIES_MANAGED.map((option) => {
                            return (
                              <div className="hosts-signup-radio-container" key={option}>
                                <input 
                                  type="radio"
                                  name="number-of-properties" 
                                  value={option} 
                                  checked={inputForm.propertiesManaged === option} 
                                  onChange={this.onPropertiesOwnedChange} />
                                <span>{option}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="signup-form-properties-listed-container" id="already-listed">
                        <h2>Is your property already listed on another platform?</h2>
                        <div className="hosts-signup-radio-group">
                          <div className="hosts-signup-radio-container">
                            <input 
                              type="radio"
                              name="already-listed"
                              value="true" 
                              checked={inputForm.isAlreadyListed === "true"} 
                              onChange={this.onPropertiesListedChange} />
                            <span>Yes, it's already listed</span>
                          </div>
                          <div className="hosts-signup-radio-container">
                            <input 
                              type="radio"
                              name="already-listed"
                              value="false" 
                              checked={inputForm.isAlreadyListed === "false"} 
                              onChange={this.onPropertiesListedChange} />
                            <span>No, it's my first time earning</span>
                          </div>
                        </div>
                      </div>

                      {!!inputForm.code && <h4>You are using the referral code: {inputForm.code}</h4> }
                    </div>

                    <div className="bee-flex-div" />
                    <Button
                      disabled={this.state.isSubmitting || this.areFormInputsValid()}
                      color="white"
                      type="submit">
                      Start Earning Now
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
        }}
      </FirebaseConsumer>
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

    this.setState({
      isSubmitting: true,
      submitted: true,
    });
    this.props.createUser(inputForm)
      .then((_) => login(inputForm.email, inputForm.password))
      .then((_) => !auth.currentUser ? Promise.resolve() : auth.currentUser.sendEmailVerification())
      .catch((error: Error) => this.setSignupError(error));
  }

  onPropertiesOwnedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { inputForm } = this.state;
    this.setState({
      inputForm: {
        ...inputForm,
        propertiesManaged: event.currentTarget.value
      }
    });
  }

  onPropertiesListedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { inputForm } = this.state;
    this.setState({
      inputForm: {
        ...inputForm,
        isAlreadyListed: event.currentTarget.value
      }
    });
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
      submitted: false,
    });
  }
}

export default compose(
  graphql(CREATE_HOST, {
    props: ({ mutate }: any) => ({
      createUser: (input: CreateHost): Promise<any> => {
        return mutate({ variables: { input } });
      },
    }),
  })
)(HostsSignupForm);

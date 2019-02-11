import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import {
  CREATE_OR_LOGIN_WITH_PROVIDERS,
  User
} from 'networking/users';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import Divider from 'shared/Divider';
import InputWrapper from 'shared/InputWrapper';
import { login, signInWithFacebookPopUp, signInWithGooglePopUp } from 'utils/firebase';
import {
  FieldValidation,
  getFriendlyErrorMessage,
  getInputErrorClass,
} from 'utils/validators';

interface State {
  isSubmitDisabled: boolean;
  inputForm: {
    email: string;
    password: string;
    [name: string]: string;
  };
  inputValidation: {
    credentials: FieldValidation;
    facebookError: FieldValidation;
  };
  loginErrorMessage: string;
}

interface LoginProps extends RouterProps {
  createOrLoginWithProviders: (id: string) => Promise<any>;
}

class LoginForm extends React.Component<LoginProps, State> {
  readonly state = {
    isSubmitDisabled: false,
    inputForm: {
      email: '',
      password: '',
    },
    inputValidation: {
      credentials: FieldValidation.PRISTINE,
      facebookError: FieldValidation.PRISTINE,
    },
    loginErrorMessage: ''
  };

  render() {
    const { isSubmitDisabled, inputForm, inputValidation, loginErrorMessage } = this.state;
    return (
      <form className="login-container-header" onSubmit={this.handleSubmit}>
        <h1>Log in to Beenest</h1>
        <AppConsumer>
          {({ screenType }: AppConsumerProps) => {
            if (screenType > ScreenType.MOBILE) return null;
            return (
              <div className="login-signup-container">
                <p>
                  Don't have an account?
                  <BeeLink to="/signup">
                    Sign Up!
                  </BeeLink>
                </p>
              </div>
            );
          }}
        </AppConsumer>
        <div className="login-input-container">
          <InputWrapper>
            <input
              onChange={this.handleInput}
              placeholder="Email"
              type="email"
              name="email"
              value={inputForm.email} />
          </InputWrapper>
          <InputWrapper>
            <input
              onChange={this.handleInput}
              placeholder="Password"
              type="password"
              name="password"
              value={inputForm.password} />
          </InputWrapper>
          <span
            className={`bee-error-message ${getInputErrorClass(inputValidation.credentials)}`.trim()}>
            {loginErrorMessage}
          </span>
        </div>
        <div className="login-cta-container">
          <Button disabled={isSubmitDisabled} type="submit">
            Log In
          </Button>
          <div className="authentication-divider">
            <Divider />
            <span>or</span>
            <Divider />
          </div>
          <Button
            background="google"
            color="white"
            onClick={this.signInWithGoogle}
            prefix="social/google"
            type="button">
            Log In with Google
          </Button>
          <Button
            background="facebook"
            color="white"
            onClick={this.signInWithFacebook}
            prefix="social/facebook-circle"
            type="button">
            Log In with Facebook
          </Button>
        </div>
        <BeeLink to="/forgot_password">
          <span>Forgot your password?</span>
        </BeeLink>
      </form>
    );
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const { inputForm, inputValidation } = this.state;
    this.setState({
      inputForm: { ...inputForm, [name]: value },
      inputValidation: { ...inputValidation },
    });
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { inputForm } = this.state;
    this.setState({isSubmitDisabled: true});
    login(inputForm.email, inputForm.password)
      .catch(error => this.setErrorMessage(error));
  }

  setErrorMessage = (error: Error) => {
    this.setState({
      isSubmitDisabled: false,
      inputValidation: { ...this.state.inputValidation, credentials: FieldValidation.ERROR },
	    loginErrorMessage: getFriendlyErrorMessage(error)
    });
  }

  signInWithFacebook = () => {
    signInWithFacebookPopUp()
      .then((result) => {
        return this.props.createOrLoginWithProviders(result.user.uid);
      })
      .catch((error: Error) => this.setErrorMessage(error));
  }

  signInWithGoogle = () => {
    signInWithGooglePopUp()
      .then((result) => {
        return this.props.createOrLoginWithProviders(result.user.uid);
      })
      .catch((error: Error) => this.setErrorMessage(error));
  }
}

export default compose(
  graphql(CREATE_OR_LOGIN_WITH_PROVIDERS, {
    props: ({ mutate }: any) => ({
      createOrLoginWithProviders: (id: string): Promise<User> => {
        return mutate({ variables: { id } });
      },
    }),
  })
)(withRouter(LoginForm));

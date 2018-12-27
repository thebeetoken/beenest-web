import { compose, graphql } from 'react-apollo';
import * as React from 'react';

import AccountGeneralContainer from './AccountGeneral.container';

import { UPDATE_USER, User } from 'networking/users';
import Button from 'shared/Button';
import Divider from 'shared/Divider';
import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import {
  errorMessages,
  FieldValidation,
  getInputErrorClass,
  isNotEmpty,
} from 'utils/validators';

interface Props {
  user: User;
  updateUser: (user: UpdateUserInput) => Promise<User>;
}

interface State {
  form: {
    about: string;
    firstName: string;
    // greeting: string; // Greeting column not in DB yet
    email: string;
    lastName: string;
  };
  isFormChanged: boolean;
  submitErrorMessage: string;
  validation: {
    about: FieldValidation;
    firstName: FieldValidation;
    // greeting: FieldValidation;
    lastName: FieldValidation;
    submitError: FieldValidation;
  };
}

interface UpdateUserInput {
  about: string;
  firstName: string;
  // greeting: string; // Greeting column not in DB yet
  lastName: string;
}

class AccountGeneral extends React.Component<Props, State> {
  readonly state: State = setDefaultState(this.props.user);
  render(): JSX.Element {
    const { form, validation } = this.state;
    return (
      <AccountGeneralContainer>
        <div className="account-general-content">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-container half">
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <InputWrapper>
                  <input
                    id="firstName"
                    onChange={this.handleChange}
                    placeholder="Maxamillion"
                    type="firstName"
                    name="firstName"
                    value={form.firstName} />
                </InputWrapper>
                <span
                  className={`bee-error-message ${getInputErrorClass(validation.firstName)}`.trim()}>
                  {errorMessages.isEmpty}
                </span>
              </div>
              <div className="input-container half">
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <InputWrapper>
                  <input
                    id="lastName"
                    onChange={this.handleChange}
                    placeholder="Aurelies"
                    type="lastName"
                    name="lastName"
                    value={form.lastName} />
                </InputWrapper>
                <span
                  className={`bee-error-message ${getInputErrorClass(validation.lastName)}`.trim()}>
                  {errorMessages.isEmpty}
                </span>
              </div>
            </div>
            <div className="input-container readOnly">
              <InputWrapper>
                <input
                  disabled
                  onChange={this.handleChange}
                  placeholder="example@email.com"
                  type="text"
                  name="email"
                  value={form.email} />
              </InputWrapper>
            </div>
            {/* Greeting column not in DB yet */}
            {/* <div className="input-container">
              <InputWrapper>
                <input
                  onChange={this.handleChange}
                  placeholder="Woof! Woof! Meow?"
                  type="text"
                  name="greeting"
                  value={form.greeting} /> rapper>
            </div> */}
            <div className="textarea-container">
              <InputLabel htmlFor="about">About</InputLabel>
              <textarea
                id="about"
                name="about"
                onChange={this.handleChange}
                placeholder="Tell us about yourself"
                value={form.about}>
              </textarea>
              <span
                className={`bee-error-message ${getInputErrorClass(validation.about)}`.trim()}>
                {errorMessages.isEmpty}
              </span>
              <span
                className={`bee-error-message ${this.getSubmitErrorClass()}`.trim()}>
                {this.state.submitErrorMessage}
              </span>
            </div>
            <Divider />
            <div className="actions">
              <Button className="cancel" textStyle="title-8" type="button" background="light" onClick={this.clearForm}>
                Cancel
              </Button>
              <Button className="submit" textStyle="title-8" type="submit" disabled={this.isSubmitDisabled()}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </AccountGeneralContainer>
    );
  }

  clearForm = (): void => this.setState(setDefaultState(this.props.user));

  getSubmitErrorClass = (): string => {
    const { submitError } = this.state.validation;
    return getInputErrorClass(submitError);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { form, validation } = this.state;
    const { name, value } = event.target;
    this.setState({
      form: { ...form, [name]: value },
      isFormChanged: true,
      validation: {
        ...validation,
        [name]: isNotEmpty(value),
        submitError: FieldValidation.PRISTINE
      }
    });
  }

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const { form } = this.state;
    this.props.updateUser(form)
      .then(() => {
        alert('user successfully updated');
      })
      .catch((error: any) => {
        console.log('error: ', error);
        this.setUpdateUserError(error);
      });
  }

  isSubmitDisabled = (): boolean => {
    const { about, firstName, lastName } = this.state.validation;
    const isAboutValid = about === FieldValidation.SUCCESS;
    const isFirstNameValid = firstName === FieldValidation.SUCCESS;
    // const isGreetingValid = greeting === FieldValidation.SUCCESS;
    const isLastNameValid = lastName === FieldValidation.SUCCESS;
    const isSubmitDisabled = !(
      isAboutValid &&
      isFirstNameValid &&
      // isGreetingValid &&
      isLastNameValid &&
      this.state.isFormChanged
    );
    return isSubmitDisabled;
  }

  setUpdateUserError = (error: Error): void => {
    const { validation } = this.state;
    this.setState({
      ...this.state,
      submitErrorMessage: error.message,
      validation: {
        ...validation,
        submitError: FieldValidation.ERROR
      },
    });
  }
}

export default compose(
  graphql(UPDATE_USER, {
    props: ({ mutate }: any) => ({
      updateUser: (input: State): Promise<User> => {
        return mutate({ variables: { input } });
      },
    })
  })
)(AccountGeneral);


/** Helper Functions */

function setDefaultState(user: User): State {
  return {
    form: {
      about: user.about || '',
      email: user.email || '',
      firstName: user.firstName,
      // greeting: user.greeting,
      lastName: user.lastName,
    },
    isFormChanged: false,
    submitErrorMessage: errorMessages.generic,
    validation: {
      about: user.about ? FieldValidation.SUCCESS : FieldValidation.PRISTINE,
      firstName: user.firstName ? FieldValidation.SUCCESS : FieldValidation.PRISTINE,
      // greeting: user.greeting ? FieldValidation.SUCCESS : FieldValidation.PRISTINE,
      lastName: user.lastName ? FieldValidation.SUCCESS : FieldValidation.PRISTINE,
      submitError: FieldValidation.PRISTINE,
    },
  };
}

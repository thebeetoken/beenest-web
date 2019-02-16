import { Field, Formik, FormikActions } from 'formik';
import * as React from 'react';
import { Button, Col, FormFeedback, FormText, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { compose, graphql } from 'react-apollo';
import * as Yup from 'yup';

import { CreateUser, CREATE_OR_LOGIN_WITH_PROVIDERS, CREATE_USER, User } from 'networking/users';
import { auth, login, signInWithGooglePopUp } from 'utils/firebase';
import { getFriendlyErrorMessage } from 'utils/validators';

interface SignupProps {
  createOrLoginWithProviders: (id: string) => Promise<any>;
  createUser: (user: CreateUser) => Promise<User>;
}

const LoginSchema = Yup.object().shape({
  signupEmail: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter an email address.'),
  signupFirstName: Yup.string()
    .required('Please enter your first name.'),
  signupLastName: Yup.string()
    .required('Please enter your last name.'),
  signupPassword: Yup.string()
    .min(8, 'Your password is too short, please enter a password that is at least 8 characters long')
    .required('Please enter a valid password.'),
  signupConfirmPassword: Yup.string()
    .oneOf([Yup.ref('signupPassword')], 'Your passwords do not match.')
    .required('Please re-enter your password here.'),
});

interface SignupFormInput {
  signupEmail: string;
  signupFirstName: string;
  signupLastName: string;
  signupPassword: string;
  signupConfirmPassword: string;
  authenticationError: string;
}

interface State {
  providerError: string | null;
}

class SignupForm extends React.Component<SignupProps, State> {
  readonly state = {
    providerError: null,
  };

  render() {
    return (
      <Formik
        initialValues={{
          signupEmail: '',
          signupFirstName: '',
          signupLastName: '',
          signupPassword: '',
          signupConfirmPassword: '',
          authenticationError: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={this.handleSubmit}
      >
        {({ errors, touched, setFieldValue, submitForm, isSubmitting }) => (
          <Form method="POST">
            <div className="mb-7">
              <h2 className="h3 text-primary font-weight-normal mb-0">
                Welcome to <span className="font-weight-semi-bold">Beenest</span>
              </h2>
              <p>Fill out the form to get started.</p>
            </div>

            <Row className="d-flex flex-sm-column flex-md-row">
              <Col md={6}>
                <FormGroup>
                  <Label for="signupFirstName" className="form-label">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="signupFirstName"
                    id="signupFirstName"
                    tag={Field}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      setFieldValue('signupFirstName', event.currentTarget.value);

                      if (this.state.providerError !== null) {
                        this.setState({ providerError: null });
                      }
                    }}
                    placeholder="First Name"
                    invalid={!!errors.signupFirstName && touched.signupFirstName}
                  />
                  <FormFeedback>{errors.signupFirstName}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                  <Label for="signupLastName" className="form-label">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="signupLastName"
                    id="signupLastName"
                    tag={Field}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      setFieldValue('signupLastName', event.currentTarget.value);

                      if (this.state.providerError !== null) {
                        this.setState({ providerError: null });
                      }
                    }}
                    placeholder="Last Name"
                    invalid={!!errors.signupLastName && touched.signupLastName}
                  />
                  <FormFeedback>{errors.signupLastName}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="signupEmail" className="form-label">
                Email Address
              </Label>
              <Input
                type="email"
                name="signupEmail"
                id="signupEmail"
                tag={Field}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  setFieldValue('signupEmail', event.currentTarget.value);

                  if (this.state.providerError !== null) {
                    this.setState({ providerError: null });
                  }
                }}
                placeholder="Email address"
                invalid={!!errors.signupEmail && touched.signupEmail}
              />
              <FormFeedback>{errors.signupEmail}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="signupPassword" className="form-label">
                Password
              </Label>
              <Input
                type="password"
                name="signupPassword"
                id="signupPassword"
                tag={Field}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  setFieldValue('signupPassword', event.currentTarget.value);

                  if (this.state.providerError !== null) {
                    this.setState({ providerError: null });
                  }
                }}
                placeholder="********"
                invalid={!!errors.signupPassword && touched.signupPassword}
              />
              <FormFeedback>{errors.signupPassword}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="signupConfirmPassword" className="form-label">
                Confirm Password
              </Label>
              <Input
                type="password"
                name="signupConfirmPassword"
                id="signupConfirmPassword"
                tag={Field}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  setFieldValue('signupConfirmPassword', event.currentTarget.value);

                  if (this.state.providerError !== null) {
                    this.setState({ providerError: null });
                  }
                }}
                placeholder="Re-enter password"
                invalid={!!errors.signupConfirmPassword && touched.signupConfirmPassword}
              />
              <FormFeedback>{errors.signupConfirmPassword}</FormFeedback>
            </FormGroup>

            <FormText className="mb-3" color="danger">
              {errors.authenticationError || this.state.providerError}
            </FormText>

            <Row className="d-flex align-items-center justify-content-end my-5">
              <Col className="d-flex justify-content-end">
                <Button
                  className="btn-primary transition-3d-hover w-100"
                  type="submit"
                  onClick={submitForm}
                  disabled={isSubmitting}
                  color="primary"
                >
                  Create an account
                </Button>
              </Col>
            </Row>

            <Row className="d-flex flex-column align-items-center px-3">
              <Button
                className="btn-google transition-3d-hover w-100 d-flex justify-content-between align-items-center"
                type="button"
                onClick={this.signInWithProvider.bind(this, signInWithGooglePopUp)}
              >
                <i className="fab fa-google" />
                Signup with Google
                <div />
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }

  handleSubmit = (values: SignupFormInput, actions: FormikActions<SignupFormInput>) => {
    const input = {
      email: values.signupEmail,
      firstName: values.signupFirstName,
      lastName: values.signupLastName,
      password: values.signupConfirmPassword,
    }

    this.props.createUser(input)
      .then((_) => login(input.email, input.password))
      .then((_) => !auth.currentUser ? Promise.resolve() : auth.currentUser.sendEmailVerification())
      .catch((error: Error) => {
        actions.setErrors({ authenticationError: getFriendlyErrorMessage(error) });
        actions.setSubmitting(false);
      });
  };

  signInWithProvider = (callback: () => Promise<any>) => {
    callback()
      .then(result => {
        return this.props.createOrLoginWithProviders(result.user.uid);
      })
      .catch(error => {
        if (error.message.includes('You are already logged in.')) {
          return;
        }

        this.setState({ providerError: error.message });
      });
  };
}

export default compose(
  graphql(CREATE_USER, {
    props: ({ mutate }: any) => ({
      createUser: (input: CreateUser): Promise<any> => {
        return mutate({ variables: { input } });
      },
    }),
  }),
  graphql(CREATE_OR_LOGIN_WITH_PROVIDERS, {
    props: ({ mutate }: any) => ({
      createOrLoginWithProviders: (id: string): Promise<User> => {
        return mutate({ variables: { id } });
      },
    }),
  })
)(SignupForm);

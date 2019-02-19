import { Field, Formik, FormikActions } from 'formik';
import * as React from 'react';
import { Button, Col, FormFeedback, FormText, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { CreateUser, CREATE_OR_LOGIN_WITH_PROVIDERS, CREATE_USER, User } from 'networking/users';
import { auth, login, signInWithGooglePopUp } from 'utils/firebase';
import { getFriendlyErrorMessage } from 'utils/validators';

interface SignupProps {
  createOrLoginWithProviders: (id: string) => Promise<any>;
  createUser: (user: CreateUser) => Promise<User>;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter an email address.'),
  firstName: Yup.string()
    .required('Please enter your first name.'),
  lastName: Yup.string()
    .required('Please enter your last name.'),
  password: Yup.string()
    .min(8, 'Your password is too short, please enter a password that is at least 8 characters long')
    .required('Please enter a valid password.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Your passwords do not match.')
    .required('Please re-enter your password here.'),
});

enum SignupFormField {
  EMAIL = 'email',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  SUBMIT_ERROR = 'submitError',
}

interface SignupFormInput {
  [SignupFormField.EMAIL]: string;
  [SignupFormField.FIRST_NAME]: string;
  [SignupFormField.LAST_NAME]: string;
  [SignupFormField.PASSWORD]: string;
  [SignupFormField.CONFIRM_PASSWORD]: string;
  [SignupFormField.SUBMIT_ERROR]: string;
}

interface State {
  providerError: string | null;
}

class SignupForm extends React.Component<SignupProps, State> {
  readonly state = {
    providerError: null,
  };

  render() {
    const {
      EMAIL,
      FIRST_NAME,
      LAST_NAME,
      PASSWORD,
      CONFIRM_PASSWORD,
      SUBMIT_ERROR
    } = SignupFormField;
    return (
      <Formik
        initialValues={{
          [EMAIL]: '',
          [FIRST_NAME]: '',
          [LAST_NAME]: '',
          [PASSWORD]: '',
          [CONFIRM_PASSWORD]: '',
          [SUBMIT_ERROR]: '',
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
                  <Label for={FIRST_NAME} className="form-label">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name={FIRST_NAME}
                    id={FIRST_NAME}
                    tag={Field}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => this.handleChange(event, setFieldValue)}
                    placeholder="First Name"
                    invalid={!!errors[FIRST_NAME] && touched[FIRST_NAME]}
                  />
                  <FormFeedback>{errors[FIRST_NAME]}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                  <Label for={LAST_NAME} className="form-label">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name={LAST_NAME}
                    id={LAST_NAME}
                    tag={Field}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => this.handleChange(event, setFieldValue)}
                    placeholder="Last Name"
                    invalid={!!errors[LAST_NAME] && touched[LAST_NAME]}
                  />
                  <FormFeedback>{errors[LAST_NAME]}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for={EMAIL} className="form-label">
                Email Address
              </Label>
              <Input
                type="email"
                name={EMAIL}
                id={EMAIL}
                tag={Field}
                onChange={(event: React.FormEvent<HTMLInputElement>) => this.handleChange(event, setFieldValue)}
                placeholder="Email address"
                invalid={!!errors[EMAIL] && touched[EMAIL]}
              />
              <FormFeedback>{errors[EMAIL]}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for={PASSWORD} className="form-label">
                Password
              </Label>
              <Input
                type="password"
                name={PASSWORD}
                id={PASSWORD}
                tag={Field}
                onChange={(event: React.FormEvent<HTMLInputElement>) => this.handleChange(event, setFieldValue)}
                placeholder="********"
                invalid={!!errors[PASSWORD] && touched[PASSWORD]}
              />
              <FormFeedback>{errors[PASSWORD]}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for={CONFIRM_PASSWORD} className="form-label">
                Confirm Password
              </Label>
              <Input
                type="password"
                name={CONFIRM_PASSWORD}
                id={CONFIRM_PASSWORD}
                tag={Field}
                onChange={(event: React.FormEvent<HTMLInputElement>) => this.handleChange(event, setFieldValue)}
                placeholder="Re-enter password"
                invalid={!!errors[CONFIRM_PASSWORD] && touched[CONFIRM_PASSWORD]}
              />
              <FormFeedback>{errors[CONFIRM_PASSWORD]}</FormFeedback>
            </FormGroup>

            <FormText className="mb-3" color="danger">
              {errors[SUBMIT_ERROR] || this.state.providerError}
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

            <Row className="d-flex align-items-center mt-3">
              <Col className="d-flex align-items-center justify-content-center">
                <span className="small text-muted">Already have an account?</span>
                <Link className="small ml-1" to="/work/login">Login</Link>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }

  handleSubmit = (values: SignupFormInput, actions: FormikActions<SignupFormInput>) => {
    const {
      EMAIL,
      FIRST_NAME,
      LAST_NAME,
      CONFIRM_PASSWORD,
      SUBMIT_ERROR,
    } = SignupFormField;
    const input = {
      email: values[EMAIL],
      firstName: values[FIRST_NAME],
      lastName: values[LAST_NAME],
      password: values[CONFIRM_PASSWORD],
    }

    this.props.createUser(input)
      .then((_) => login(input.email, input.password))
      .then((_) => !auth.currentUser ? Promise.resolve() : auth.currentUser.sendEmailVerification())
      .catch((error: Error) => {
        actions.setErrors({ [SUBMIT_ERROR]: getFriendlyErrorMessage(error) });
        actions.setSubmitting(false);
      });
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const { name, value } = event.currentTarget;
    setFieldValue(name, value);
    if (this.state.providerError !== null) {
      this.setState({ providerError: null });
    }
  }

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

import { Field, Formik, FormikActions, Form as FormikForm } from 'formik';
import * as React from 'react';
import { Button, Col, FormFeedback, FormText, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { CREATE_OR_LOGIN_WITH_PROVIDERS, User } from 'networking/users';
import { login, signInWithFacebookPopUp, signInWithGooglePopUp } from 'utils/firebase';
import { getFriendlyErrorMessage } from 'utils/validators';

interface LoginProps {
  createOrLoginWithProviders: (id: string) => Promise<any>;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter an email address.'),
  password: Yup.string()
    .min(8, 'Your password is too short, please enter a valid password')
    .required('Please enter a valid password.'),
});

enum LoginFormField {
  EMAIL = 'email',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  SUBMIT_ERROR = 'submitError',
}

interface LoginFormInput {
  [LoginFormField.EMAIL]: string;
  [LoginFormField.PASSWORD]: string;
  [LoginFormField.SUBMIT_ERROR]: string;
}

const LoginForm = (props: LoginProps) => {
  const [providerError, setError] = React.useState<String | null>(null);
  const { EMAIL, PASSWORD, SUBMIT_ERROR } = LoginFormField;

  return (
    <Formik
      initialValues={{
        [EMAIL]: '',
        [PASSWORD]: '',
        [SUBMIT_ERROR]: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, submitForm, isSubmitting }) => (
        <Form tag={FormikForm}>
          <div className="mb-7">
            <h2 className="h3 text-primary font-weight-normal mb-0">
              Welcome <span className="font-weight-semi-bold">back</span>
            </h2>
            <p>Login to manage your account.</p>
          </div>
          <FormGroup>
            <Label for={EMAIL} className="form-label">
              Email Address
            </Label>
            <Input
              type="email"
              name={EMAIL}
              id={EMAIL}
              tag={Field}
              onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event, setFieldValue)}
              placeholder="Email address"
              invalid={!!errors[EMAIL] && touched[EMAIL]}
            />
            <FormFeedback>{errors[EMAIL]}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for={PASSWORD} className="form-label">
              <span className="d-flex justify-content-between align-items-center">
                Password{' '}
                <Link className="link-muted text-capitalize font-weight-normal" to="/work/forgot_password">
                  Forgot Password?
                </Link>
              </span>
            </Label>
            <Input
              type="password"
              name={PASSWORD}
              id={PASSWORD}
              tag={Field}
              onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event, setFieldValue)}
              placeholder="********"
              invalid={!!errors[PASSWORD] && touched[PASSWORD]}
            />
            <FormFeedback>{errors[PASSWORD]}</FormFeedback>
          </FormGroup>

          <FormText className="mb-3" color="danger">
            {errors[SUBMIT_ERROR] || providerError}
          </FormText>

          <Row className="d-flex align-items-center my-5">
            <Col xs="6">
              <span className="small text-muted">Don't have an account?</span>{' '}
              <Link className="small" to="/work/signup">
                Signup
              </Link>
            </Col>
            <Col xs="6" className="text-right">
              <Button
                className="btn-primary transition-3d-hover"
                type="submit"
                onClick={submitForm}
                disabled={isSubmitting}
                color="primary"
              >
                Get Started
              </Button>
            </Col>
          </Row>

          <Row className="d-flex flex-column align-items-center px-3">
            <Button
              className="btn-google transition-3d-hover mb-4 w-100 d-flex justify-content-between align-items-center"
              type="button"
              onClick={signInWithProvider.bind(null, signInWithGooglePopUp)}
            >
              <i className="fab fa-google" />
              Sign in with Google
              <div />
            </Button>

            <Button
              className="btn-facebook transition-3d-hover w-100 d-flex justify-content-between align-items-center"
              type="button"
              onClick={signInWithProvider.bind(null, signInWithFacebookPopUp)}
            >
              <i className="fab fa-facebook" />
              Sign in with Facebook
              <div />
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );

  function handleSubmit(values: LoginFormInput, actions: FormikActions<LoginFormInput>) {
    const { EMAIL, PASSWORD } = LoginFormField;
    login(values[EMAIL], values[PASSWORD]).catch(error => {
      actions.setErrors({ submitError: getFriendlyErrorMessage(error) });
      actions.setSubmitting(false);
    });
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) {
    const { name, value } = event.currentTarget;
    setFieldValue(name, value);
    if (providerError !== null) {
      setError(null);
    }
  }

  function signInWithProvider(callback: () => Promise<any>) {
    callback()
      .then(result => {
        return props.createOrLoginWithProviders(result.user.uid);
      })
      .catch(error => {
        if (error.message.includes('You are already logged in.')) {
          return;
        }

        setError(error.message);
      });
  }
};

export default compose(
  graphql(CREATE_OR_LOGIN_WITH_PROVIDERS, {
    props: ({ mutate }: any) => ({
      createOrLoginWithProviders: (id: string): Promise<User> => {
        return mutate({ variables: { id } });
      },
    }),
  })
)(LoginForm);

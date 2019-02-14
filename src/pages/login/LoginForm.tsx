import { Field, Formik, FormikActions } from 'formik';
import * as React from 'react';
import { Button, Col, FormFeedback, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { compose, graphql } from 'react-apollo';
import * as Yup from 'yup';

import {
  CREATE_OR_LOGIN_WITH_PROVIDERS,
  User
} from 'networking/users';
import { login, signInWithFacebookPopUp, signInWithGooglePopUp } from 'utils/firebase';

interface LoginProps {
  createOrLoginWithProviders: (id: string) => Promise<any>;
}

const LoginSchema = Yup.object().shape({
  loginEmail: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter an email address.'),
  loginPassword: Yup.string()
    .min(8, 'Your password is too short, please enter a valid password')
    .required('Please enter a valid password.'),
});

interface LoginFormInput {
  loginEmail: string;
  loginPassword: string;
}

class LoginForm extends React.Component<LoginProps> {
  render() {
    return (
      <Formik
        initialValues={{
          loginEmail: '',
          loginPassword: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={this.handleSubmit}
      >
        {({ errors, touched, setFieldTouched, setFieldValue, submitForm, isSubmitting }) => (
          <Form className="mt-5">
            <div className="mb-7">
              <h2 className="h3 text-primary font-weight-normal mb-0">
                Welcome <span className="font-weight-semi-bold">back</span>
              </h2>
              <p>Login to manage your account</p>
            </div>
            <FormGroup>
              <Label for="loginEmail" className="form-label">
                Email Address
              </Label>
              <Input
                type="email"
                name="loginEmail"
                id="loginEmail"
                tag={Field}
                onBlur={() => setFieldTouched('loginEmail', true)}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  setFieldValue('loginEmail', event.currentTarget.value);
                }}
                placeholder="Email address"
                invalid={!!errors.loginEmail && touched.loginEmail}
              />
              <FormFeedback>{errors.loginEmail}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="loginPassword" className="form-label">
                <span className="d-flex justify-content-between align-items-center">
                  Password{' '}
                  <a className="link-muted text-capitalize font-weight-normal" href="/work">
                    Forgot Password?
                  </a>
                </span>
              </Label>
              <Input
                type="password"
                name="loginPassword"
                id="loginPassword"
                tag={Field}
                onBlur={() => setFieldTouched('loginPassword', true)}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  setFieldValue('loginPassword', event.currentTarget.value);
                }}
                placeholder="********"
                invalid={!!errors.loginPassword && touched.loginPassword}
              />
              <FormFeedback>{errors.loginPassword}</FormFeedback>
            </FormGroup>

            <Row className="d-flex align-items-center mb-5">
              <Col xs="6">
                <span className="small text-muted">Don't have an account?</span>
                <a className="small" href="/">
                  Signup
                </a>
              </Col>
              <Col xs="6" className="text-right">
                <Button 
                  className="btn-primary transition-3d-hover"
                  type="submit"
                  onClick={submitForm}
                  disabled={isSubmitting}
                  color="primary">
                  Get Started
                </Button>
              </Col>
            </Row>

            <Row className="d-flex flex-column align-items-center mb-5 px-3">
            <Button 
              className="btn-google transition-3d-hover mb-4 w-100"
              type="button"
              onClick={this.signInWithGoogle}>
              Sign in with Google
            </Button>

            <Button 
              className="btn-facebook transition-3d-hover w-100"
              type="button"
              onClick={this.signInWithFacebook}>
              Sign in with Facebook
            </Button>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }

  handleSubmit = (values: LoginFormInput, actions: FormikActions<LoginFormInput>) => {
    login(values.loginEmail, values.loginPassword)
      .catch(error => {
        console.log(error);
        // formik set error object?
        actions.setSubmitting(false);
      });
  }

  signInWithFacebook = () => {
    signInWithFacebookPopUp()
      .then((result) => {
        return this.props.createOrLoginWithProviders(result.user.uid);
      })
      .catch(error => {
        console.log(error);
        // formik set error object?
        // how to set isSubmitting to true?
      });
  }

  signInWithGoogle = () => {
    signInWithGooglePopUp()
      .then((result) => {
        return this.props.createOrLoginWithProviders(result.user.uid);
      })
      .catch(error => {
        console.log(error);
        // formik set error object?
        // how to set isSubmitting to true?
      });
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
)(LoginForm);

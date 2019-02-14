import { Formik, Field } from 'formik';
import * as React from 'react';
import { Button, Col, FormFeedback, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter an email address.'),
  password: Yup.string()
    .min(8, 'Your password is too short, please enter a valid password')
    .required('Please enter a valid password.'),
});

const LoginForm = () => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validationSchema={LoginSchema}
    onSubmit={values => {
      // same shape as initial values
      console.log(values);
    }}
  >
    {({ errors, touched, setFieldTouched, setFieldValue, }) => (
      <Form className="mt-5">
        <div className="mb-7">
          <h2 className="h3 text-primary font-weight-normal mb-0">
            Welcome <span className="font-weight-semi-bold">back</span>
          </h2>
          <p>Login to manage your account</p>
        </div>
      {console.log(errors)}
        <FormGroup>
          <Label for="email" className="form-label">
            Email Address
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            tag={Field}
            onBlur={() => setFieldTouched('email', true)}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setFieldValue('email', event.currentTarget);
            }}
            placeholder="Email address"
            invalid={!!errors.email && touched.email} />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="password" className="form-label">
            <span className="d-flex justify-content-between align-items-center">
              Password{' '}
              <a className="link-muted text-capitalize font-weight-normal" href="/work">
                Forgot Password?
              </a>
            </span>
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            tag={Field}
            onBlur={() => setFieldTouched('password', true)}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setFieldValue('password', event.currentTarget);
            }}
            placeholder="********"
            invalid={!!errors.password && touched.password} />
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>

        <Row className="align-items-center mb-5">
          <Col xs="6">
            <span className="small text-muted">Don't have an account?</span>{' '}
            <a className="small" href="/">
              Signup
            </a>
          </Col>
          <Col xs="6" className="text-right">
            <Button type="submit" color="primary" className="btn-primary transition-3d-hover">
              Get Started
            </Button>
          </Col>
        </Row>
      </Form>
    )}
  </Formik>
);

export default LoginForm;

import { Field, Formik, FormikActions, Form as FormikForm } from 'formik';
import * as React from 'react';
import { Button, Col, FormFeedback, FormText, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { CreateHost, CREATE_HOST, User } from 'networking/users';
import { auth, login } from 'utils/firebase';
import { getFriendlyErrorMessage } from 'utils/validators';

interface HostsSignupProps {
  createHost: (user: CreateHost) => Promise<User>;
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
});

enum HostsSignupFormField {
  EMAIL = 'email',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PASSWORD = 'password',
  PROPERTIES_MANAGED = 'propertiesManaged',
  IS_ALREADY_LISTED = 'isAlreadyListed',
  SUBMIT_ERROR = 'submitError',
}

interface HostsSignupFormInput {
  [HostsSignupFormField.EMAIL]: string;
  [HostsSignupFormField.FIRST_NAME]: string;
  [HostsSignupFormField.LAST_NAME]: string;
  [HostsSignupFormField.PASSWORD]: string;
  [HostsSignupFormField.PROPERTIES_MANAGED]: string;
  [HostsSignupFormField.IS_ALREADY_LISTED]: string;
  [HostsSignupFormField.SUBMIT_ERROR]: string;
}

const NUMBER_OF_PROPERTIES_MANAGED = [
  '1-5',
  '6-10',
  '11-50',
  '51-100+',
];

const HostsSignupForm = (props: HostsSignupProps) => {
  const [providerError, setError] = React.useState<string | null>(null);
  const {
    EMAIL,
    FIRST_NAME,
    LAST_NAME,
    PASSWORD,
    PROPERTIES_MANAGED,
    IS_ALREADY_LISTED,
    SUBMIT_ERROR,
  } = HostsSignupFormField;

  return (
    <Formik
      initialValues={{
        [EMAIL]: '',
        [FIRST_NAME]: '',
        [LAST_NAME]: '',
        [PASSWORD]: '',
        [PROPERTIES_MANAGED]: NUMBER_OF_PROPERTIES_MANAGED[0],
        [IS_ALREADY_LISTED]: 'true',
        [SUBMIT_ERROR]: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, submitForm, isSubmitting, values }) => (
        <Form tag={FormikForm}>
          <div className="mb-4">
            <h2 className="h3 text-primary font-weight-normal mb-0">
              Earn passive income on <span className="font-weight-semi-bold">Beenest</span>
            </h2>
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
                  onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event, setFieldValue)}
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
                  onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event, setFieldValue)}
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
              onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event, setFieldValue)}
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
              onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event, setFieldValue)}
              placeholder="********"
              invalid={!!errors[PASSWORD] && touched[PASSWORD]}
            />
            <FormFeedback>{errors[PASSWORD]}</FormFeedback>
          </FormGroup>

          <FormGroup tag="fieldset">
            <Label for={PROPERTIES_MANAGED} className="small font-weight-medium">
              How many properties do you own?
            </Label>
            {NUMBER_OF_PROPERTIES_MANAGED.map((option) => {
              return (
                <FormGroup check key={option}>
                  <Input
                    type="radio"
                    name={PROPERTIES_MANAGED}
                    id={option}
                    checked={option === values[PROPERTIES_MANAGED]}
                    tag={Field}
                    value={option} />
                  <span>{option}</span>
                </FormGroup>
              );
            })}
          </FormGroup>

          <FormGroup tag="fieldset">
            <Label className="small font-weight-medium">
              Is your property already listed on another platform?
            </Label>
            <FormGroup check>
              <Input
                type="radio"
                name={IS_ALREADY_LISTED}
                id={IS_ALREADY_LISTED}
                checked={'true' === values[IS_ALREADY_LISTED]}
                tag={Field}
                value='true' />
              <span>Yes, it's already listed</span>
            </FormGroup>
            <FormGroup check>
              <Input
                type="radio"
                name={IS_ALREADY_LISTED}
                id={IS_ALREADY_LISTED}
                checked={'false' === values[IS_ALREADY_LISTED]}
                tag={Field}
                value='false' />
              <span>No, it's my first time earning</span>
            </FormGroup>
          </FormGroup>

          <FormText className="mb-3" color="danger">
            {errors[SUBMIT_ERROR] || providerError}
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
                Start Earning Now
              </Button>
            </Col>
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

  function handleSubmit(values: HostsSignupFormInput, actions: FormikActions<HostsSignupFormInput>) {
    const {
      EMAIL,
      FIRST_NAME,
      LAST_NAME,
      PROPERTIES_MANAGED,
      IS_ALREADY_LISTED,
      PASSWORD,
      SUBMIT_ERROR,
    } = HostsSignupFormField;
    const input = {
      email: values[EMAIL],
      firstName: values[FIRST_NAME],
      lastName: values[LAST_NAME],
      password: values[PASSWORD],
      propertiesManaged: values[PROPERTIES_MANAGED],
      isAlreadyListed: values[IS_ALREADY_LISTED],
    }

    props.createHost(input)
      .then((_) => login(input.email, input.password))
      .then((_) => !auth.currentUser ? Promise.resolve() : auth.currentUser.sendEmailVerification())
      .catch((error: Error) => {
        actions.setErrors({ [SUBMIT_ERROR]: getFriendlyErrorMessage(error) });
        actions.setSubmitting(false);
      });
  };

  function handleChange(event: React.FormEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) {
    const { name, value } = event.currentTarget;
    setFieldValue(name, value);
    if (providerError !== null) {
      setError(null);
    }
  }
}

export default compose(
  graphql(CREATE_HOST, {
    props: ({ mutate }: any) => ({
      createHost: (input: CreateHost): Promise<any> => {
        return mutate({ variables: { input } });
      },
    }),
  })
)(HostsSignupForm);

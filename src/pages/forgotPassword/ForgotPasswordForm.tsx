import { Field, Formik, FormikActions, Form as FormikForm } from 'formik';
import * as React from 'react';
import { Button, Card, Fade, Form, FormFeedback, FormGroup, FormText, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import { resetPassword } from 'utils/firebase';
import { getFriendlyErrorMessage } from 'utils/validators';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter an email address.')
});

enum ForgotPasswordFormField {
  EMAIL = 'email',
  SUBMIT_ERROR = 'submitError',
}

interface ForgotPasswordFormInput {
  [ForgotPasswordFormField.EMAIL]: string;
  [ForgotPasswordFormField.SUBMIT_ERROR]: string;
}

const ForgotPasswordForm = (props: RouterProps) => {
  const [providerError, setError] = React.useState<String | null>(null);
  const [isOpen, toggleModal] = React.useState<Boolean>(false);
  const { EMAIL, SUBMIT_ERROR } = ForgotPasswordFormField;

  return (
    <Card tag={Fade} className="p-md-5">
      <Formik
        initialValues={{
          [EMAIL]: '',
          [SUBMIT_ERROR]: '',
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, submitForm, isSubmitting }) => (
          <Form tag={FormikForm}>
            <div className="mb-4">
              <h2 className="h3 text-primary font-weight-normal mb-0">
                Forgot <span className="font-weight-semi-bold">password?</span>
              </h2>
              <p>Enter your email to reset your password.</p>
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

                <FormText color="danger">
                  {errors[SUBMIT_ERROR] || providerError}
                </FormText>

            <Row className="d-flex align-items-center mt-5" noGutters>
              <Button
                className="btn-primary transition-3d-hover w-md-100"
                type="submit"
                onClick={submitForm}
                disabled={isSubmitting}
                color="primary">
                Reset Password
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </Card>
  );

  function handleSubmit(values: ForgotPasswordFormInput, actions: FormikActions<ForgotPasswordFormInput>) {
    const { EMAIL } = ForgotPasswordFormField;
    resetPassword(values[EMAIL])
      .then(() => )
      .catch(error => {
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
};

export default withRouter(ForgotPasswordForm);
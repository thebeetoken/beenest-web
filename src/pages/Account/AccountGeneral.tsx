import * as React from 'react';
import { Button, Col, Form, FormGroup, FormFeedback, Input, Label, Row } from 'reactstrap';
import { compose, graphql } from 'react-apollo';
import { UPDATE_USER, User, GET_ACCOUNT_PAGE, UserField } from 'networking/users';
import { Field, Formik, FormikProps, FormikActions } from 'formik';
import * as Yup from 'yup';
import Textarea from 'components/shared/Textarea';
import { TextareaEvent } from 'components/shared/Textarea/Textarea';

interface FormValues {
  [name: string]: boolean | string | string[] | number | object | undefined;
}

const GeneralInfoSchema = Yup.object().shape({
  [UserField.FIRST_NAME]: Yup.string()
    .required('Please provide your first name.'),
  [UserField.LAST_NAME]: Yup.string()
    .required('Please provide your last name.'),
  [UserField.EMAIL]: Yup.string(),
  [UserField.ABOUT]: Yup.string()
    .required('Please fill out the About section.'),
})

const defaultValues: FormValues = {
  [UserField.FIRST_NAME]: '',
  [UserField.LAST_NAME]: '',
  [UserField.EMAIL]: '',
  [UserField.ABOUT]: '',
}

function AccountGeneral({ user, updateUser }: any) {
  const initialValues = populateForm(defaultValues, user);
  return (
    <Formik
      initialValues={initialValues}
      isInitialValid
      validationSchema={GeneralInfoSchema}
      onSubmit={handleSubmit}>
      {({ errors, isSubmitting, setFieldTouched, setFieldValue, submitForm, touched, values }: FormikProps<any>) => (
        <Form method="POST">
          <Row>
            <Col md={6}>
              <FormGroup inline>
                <Label for={UserField.FIRST_NAME} className="form-label">First Name</Label>
                <Input
                  id={UserField.FIRST_NAME}
                  invalid={!!errors.firstName && !!touched.firstName}
                  name={UserField.FIRST_NAME}
                  placeholder="First name"
                  tag={Field}
                  type="text" />
                <FormFeedback>{errors.firstName}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup inline>
                <Label for={UserField.LAST_NAME} className="form-label">Last Name</Label>
                <Input
                  id={UserField.LAST_NAME}
                  invalid={!!errors.lastName && !!touched.lastName}
                  name={UserField.LAST_NAME}
                  placeholder="Last name"
                  tag={Field}
                  type="text" />
                <FormFeedback>{errors.lastName}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          
          <FormGroup>
            <Label for={UserField.EMAIL} className="form-label">Email</Label>
            <Input
              disabled
              id={UserField.EMAIL}
              invalid={!!errors.email && !!touched.email}
              name={UserField.EMAIL}
              tag={Field}
              type="email" />
            <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for={UserField.ABOUT} className="form-label">About</Label>
            <Textarea
              className={`form-control${errors.about ? ' is-invalid' : ''}`}
              html
              name={UserField.ABOUT}
              onBlur={() => setFieldTouched(UserField.ABOUT, true)}
              onChange={(event: TextareaEvent) => {
                setFieldValue(UserField.ABOUT, event.target.value);
              }}
              placeholder="Tell us about yourself"
              value={values.about} />
            <FormFeedback>{errors.about}</FormFeedback>
          </FormGroup>

          <hr />

          <Row className="align-items-center justify-content-end">
            <Col xs="auto" className="text-right float-right">
              <Button
                disabled={isSubmitting}
                className="btn-success transition-3d-hover"
                color="success"
                onClick={submitForm}
                type="button">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );

  function handleSubmit(values: any, actions: FormikActions<any>) {
    updateUser(values)
      .then(() => {
        alert('user successfully updated');
      })
      .catch((error: any) => {
        console.log('error: ', error);
        alert(error);
      })
      .finally(() => actions.setSubmitting(false));
  }
}

export default compose(
  graphql(UPDATE_USER, {
    props: ({ mutate }: any) => ({
      updateUser: (input: any): Promise<User> => {
        return mutate({ variables: { input },
          refetchQueries: [{ query: GET_ACCOUNT_PAGE }],
        });
      },
    })
  })
)(AccountGeneral);

function populateForm(defaultValues: FormValues, incomingObject: FormValues) {
  return Object.keys(defaultValues).reduce((result: any, key) => {
    result[key] = incomingObject[key] || defaultValues[key];
    return result;
  }, {});
}

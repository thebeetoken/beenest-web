import * as React from 'react';
import { Col, FormGroup, Label, FormFeedback, Row, Button, Input } from 'reactstrap';
import { compose, graphql } from 'react-apollo';
import { UPDATE_USER, User, GET_ACCOUNT_PAGE, UserField } from 'networking/users';
import { Formik, Form, FormikProps, Field, FormikActions } from 'formik';
import * as Yup from 'yup';
import Textarea from 'components/shared/Textarea';
import { TextareaEvent } from 'components/shared/Textarea/Textarea';

interface FormValues {
  [name: string]: boolean | string | string[] | number | object | undefined;
}

const GeneralInfoSchema = Yup.object().shape({
  [UserField.FIRST_NAME]: Yup.string().min(5),
  [UserField.LAST_NAME]: Yup.string().min(1),
  [UserField.EMAIL]: Yup.string().min(1),
  [UserField.ABOUT]: Yup.string().min(1),
})

const defaultValues: FormValues = {
  [UserField.FIRST_NAME]: '',
  [UserField.LAST_NAME]: '',
  [UserField.EMAIL]: '',
  [UserField.ABOUT]: '',
}

function AccountGeneral({ user, updateUser }: any) {
  return (
    <Formik
      initialValues={populateForm(defaultValues, user)}
      isInitialValid
      validationSchema={GeneralInfoSchema}
      onSubmit={handleSubmit}>
      {({ errors, resetForm, isSubmitting, setFieldValue, values }: FormikProps<any>) => (
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup inline>
                <Label for={UserField.FIRST_NAME} className="form-label">First Name</Label>
                <Input
                  className="form-control"
                  id={UserField.FIRST_NAME}
                  name={UserField.FIRST_NAME}
                  placeholder="First name"
                  type="text" />
                <FormFeedback>{errors.firstName}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup inline>
                <Label for={UserField.LAST_NAME} className="form-label">Last Name</Label>
                <Field
                  className="form-control"
                  id={UserField.LAST_NAME}
                  name={UserField.LAST_NAME}
                  placeholder="Last name"
                  type="text" />
                <FormFeedback>{errors.lastName}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          
          <FormGroup>
            <Label for={UserField.EMAIL} className="form-label">Email</Label>
            <Field
              className="form-control"
              disabled
              id={UserField.EMAIL}
              name={UserField.EMAIL}
              type="text" />
            <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for={UserField.ABOUT} className="form-label">About</Label>
            <Textarea
              html
              name={UserField.ABOUT}
              onChange={(event: TextareaEvent) => {
                setFieldValue(UserField.ABOUT, event.target.value);
                console.log('errors:', errors);
              }}
              placeholder="Tell us about yourself"
              value={values.about} />
            <FormFeedback>{errors.about}</FormFeedback>
          </FormGroup>

          <hr />

          <Row className="align-items-center justify-content-end">
            <Col xs="auto" className="text-right float-right">
              <Button
                color="secondary"
                className="btn-secondary transition-3d-hover"
                onClick={resetForm}
                type="button">
                Cancel
              </Button>
            </Col>
            <Col xs="auto" className="text-right float-right">
              <Button
                disabled={isSubmitting}
                className="btn-success transition-3d-hover"
                color="success"
                type="submit">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );

  function handleSubmit(values: any, actions: FormikActions<any>) {
    actions.setSubmitting(true);
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

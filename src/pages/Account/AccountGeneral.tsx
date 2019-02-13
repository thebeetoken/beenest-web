import * as React from 'react';
import { Col, Container, FormGroup, Label, Input, FormFeedback, Row, Button } from 'reactstrap';
import { compose, graphql } from 'react-apollo';
import { UPDATE_USER, User, GET_ACCOUNT_PAGE, UserField } from 'networking/users';
import { Formik, Form, FormikProps, Field } from 'formik';
import * as Yup from 'yup';
import Textarea from 'components/shared/Textarea';
import { TextareaEvent } from 'components/shared/Textarea/Textarea';

const GeneralInfoSchema = Yup.object().shape({
  [UserField.FIRST_NAME]: Yup.string().min(1),
  [UserField.LAST_NAME]: Yup.string().min(1),
  [UserField.EMAIL]: Yup.string().min(1),
  [UserField.ABOUT]: Yup.string().min(1),
})

class AccountGeneral extends React.Component<any> {
  render() {
    return (
      <Container>
        <h1>This is the General Info Page</h1>
        <Row>
          <Col md={6}>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                about: '',
              }}
              isInitialValid
              validationSchema={GeneralInfoSchema}
              onSubmit={this.handleSubmit}>
              {({ errors, setFieldValue }: FormikProps<any>) => (
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup inline>
                        <Label for={UserField.FIRST_NAME} className="form-label">First Name</Label>
                        <Input
                          id={UserField.EMAIL}
                          name={UserField.EMAIL}
                          placeholder="First name"
                          type="text" />
                        <FormFeedback>{errors.firstName}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup inline>
                        <Label for={UserField.LAST_NAME} className="form-label">Last Name</Label>
                        <Input
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
                    <Input
                      type="text"
                      id={UserField.EMAIL}
                      name={UserField.EMAIL} />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for={UserField.ABOUT} className="form-label">About</Label>
                    <Textarea
                      html
                      name={UserField.ABOUT}
                      onChange={(event: TextareaEvent) => {
                        setFieldValue(UserField.ABOUT, event.target.value);
                      }} />
                    <FormFeedback>{errors.about}</FormFeedback>
                  </FormGroup>

                  <hr />

                  <Row className="align-items-center justify-content-end">
                    <Col xs="auto" className="text-right float-right">
                      <Button type="submit" color="secondary" className="btn-secondary transition-3d-hover">
                        Cancel
                      </Button>
                    </Col>
                    <Col xs="auto" className="text-right float-right">
                      <Button type="submit" color="success" className="btn-success transition-3d-hover">
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  }

  handleSubmit = (values: any, errors: any) => {
    console.log('values:', values);
    console.log('errors:', errors);
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
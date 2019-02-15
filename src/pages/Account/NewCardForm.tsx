import * as React from 'react';
import { Button, Form, Row, Col, FormGroup, Label, FormFeedback, Input } from 'reactstrap';
import { GET_PAYMENT_SOURCES } from 'networking/paymentSources';
import { Formik, Field } from 'formik';
import Yup from 'yup';

interface Props {
  stripe: Window['Stripe'];
  createPaymentSource: (stripeToken: string) => void;
  onClose: () => void;
}

enum NewCardField {
  CARD_NUMBER = 'cardNumber',
  CVC = 'CVC',
  ID = 'id',
  NAME_ON_CARD = 'nameOnCard',
  YY = 'yy',
  MM = 'mm',
  ZIP = 'zip',
}
  
const NewCardSchema = Yup.object().shape({
  [NewCardField.CARD_NUMBER]: Yup.string().required(),
  [NewCardField.CVC]: Yup.string().required(),
  [NewCardField.ID]: Yup.string().required(),
  [NewCardField.NAME_ON_CARD]: Yup.string().required(),
  [NewCardField.YY]: Yup.string().required(),
  [NewCardField.MM]: Yup.string().required(),
  [NewCardField.ZIP]: Yup.string().required(),
});

const NewCardForm = ({ stripe }: Props) => (
  <Formik
    initialValues={{
      cardNumber: '',
      CVC: '',
      id: '',
      nameOnCard: '',
      yy: '',
      mm: '',
      zip: '',
    }}
    isInitialValid
    validationSchema={NewCardSchema}
    onSubmit={(values, actions) => {
      return stripe
      .createToken(values)
      .then(({ token }: any) => {
        return createPaymentSource(token.id);
      })
      .then(() => {
        alert('Credit card successfully added.');
      })
      .catch((error: Error) => {
        console.error('error: ', error);
        alert(error);
      })
      .finally(() => actions.setSubmitting(false));
    }}>
    {({ errors, isSubmitting, setFieldTouched, setFieldValue, submitForm, touched, values }: FormikProps<any>) => (
      <Form method="POST">
        <Row>
          <Col md={6}>
            <FormGroup inline>
              <Label for={NewCardField.CARD_NUMBER} className="form-label">Card Number</Label>
              <Input
                id={NewCardField.CARD_NUMBER}
                invalid={!!errors.cardNumber && !!touched.cardNumber}
                name={NewCardField.CARD_NUMBER}
                placeholder="1234 1234 1234 1234"
                tag={Field} />
              <FormFeedback>{errors.cardNumber}</FormFeedback>
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

const EnhancedNewCardForm = compose(
  graphql(CREATE_PAYMENT_SOURCE, {
    props: ({ mutate }: any) => ({
      createPaymentSource: (stripeToken: string): Promise<any> => {
        return mutate({
          variables: { stripeToken },
          refetchQueries: [{ query: GET_PAYMENT_SOURCES }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.getPaymentSources) {
              return;
            }

            const { createPaymentSource } = data;
            const paymentSources = store.readQuery({ query: GET_PAYMENT_SOURCES });
            const { getPaymentSources } = paymentSources;
            store.writeQuery({ query: GET_PAYMENT_SOURCES,
              data: {
                getPaymentSources: [
                  ...getPaymentSources,
                  createPaymentSource
                ]
              }
            });
          },
        });
      },
    }),
  })
)(injectStripe(NewCardForm));
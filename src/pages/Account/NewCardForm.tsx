import * as React from 'react';
import { Button, Form, Row, Col, FormGroup, Label, FormFeedback, Input } from 'reactstrap';
import { GET_PAYMENT_SOURCES, CREATE_PAYMENT_SOURCE } from 'networking/paymentSources';
import { Formik, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { compose, graphql } from 'react-apollo';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement } from 'react-stripe-elements';
import StripeWrapper from 'HOCs/StripeWrapper';

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
  CARD_EXPIRY = 'cardExpiry',
  ZIP = 'zip',
}
  
const NewCardSchema = Yup.object().shape({
  [NewCardField.CARD_NUMBER]: Yup.string().required(),
  [NewCardField.CVC]: Yup.string().required(),
  [NewCardField.ID]: Yup.string().required(),
  [NewCardField.NAME_ON_CARD]: Yup.string().required(),
  [NewCardField.CARD_EXPIRY]: Yup.string().required(),
  [NewCardField.ZIP]: Yup.string().required(),
});

const NewCardForm = ({ createPaymentSource, stripe }: Props) => (
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
    validationSchema={NewCardSchema}
    onSubmit={(values, actions) => {
      return console.log('values:', values);
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
    {({ errors, isSubmitting, submitForm, touched }: FormikProps<any>) => (
      <Form method="POST">
        <Row>
          <Col>
            <FormGroup>
              <Label for={NewCardField.NAME_ON_CARD} className="form-label">Name on Card</Label>
              <Input
                id={NewCardField.NAME_ON_CARD}
                invalid={!!errors.nameOnCard && !!touched.nameOnCard}
                name={NewCardField.NAME_ON_CARD}
                placeholder="Name on Card"
                tag={Field} />
              <FormFeedback>{errors.nameOnCard}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for={NewCardField.CARD_NUMBER} className="form-label">Card Number</Label>
              <Input
                id={NewCardField.CARD_NUMBER}
                name={NewCardField.CARD_NUMBER}
                tag={CardNumberElement} />
              <FormFeedback>{errors.cardNumber}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for={NewCardField.CARD_EXPIRY} className="form-label">Card Expiry</Label>
              <Input
                id={NewCardField.CARD_EXPIRY}
                name={NewCardField.CARD_EXPIRY}
                tag={CardExpiryElement} />
              <FormFeedback>{errors.cardExpiry}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
            <Label for={NewCardField.CVC} className="form-label">CVC</Label>
              <Input
                id={NewCardField.CVC}
                name={NewCardField.CVC}
                tag={CardCVCElement} />
              <FormFeedback>{errors.CVC}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for={NewCardField.ZIP} className="form-label">ZIP</Label>
                <Input
                  id={NewCardField.ZIP}
                  name={NewCardField.ZIP}
                  tag={PostalCodeElement} />
                <FormFeedback>{errors.zip}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <hr />

        <Row className="align-items-center justify-content-end">
          <Col xs="auto" className="text-right float-right">
            <Button
              disabled={isSubmitting}
              className="btn-success transition-3d-hover"
              color="success"
              onClick={() => {
                console.log('errors:', errors);
                submitForm();
              }}
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

const StripeWrappedNewCardForm = () => (
  <StripeWrapper>
    <EnhancedNewCardForm />
  </StripeWrapper>
)

export default StripeWrappedNewCardForm;
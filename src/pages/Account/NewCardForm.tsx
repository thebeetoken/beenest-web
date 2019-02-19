import * as React from 'react';
import { Button, Form, Row, Col, FormGroup, Label, FormFeedback, Input } from 'reactstrap';
import { GET_PAYMENT_SOURCES, CREATE_PAYMENT_SOURCE } from 'networking/paymentSources';
import { compose, graphql } from 'react-apollo';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement } from 'react-stripe-elements';
import StripeWrapper from 'HOCs/StripeWrapper';
import styled from 'styled-components';

interface Props {
  stripe: Window['Stripe'];
  createPaymentSource: (stripeToken: string) => void;
  handleModal: (modal?: string) => void;
  setAlert: (msg?: string) => void;
}

interface State {
  completed: {
    cardExpiry: boolean;
    cardNumber: boolean;
    cardCvc: boolean;
    name: boolean;
    postalCode: boolean;
    [key: string]: boolean;
  },
  errors: {
    cardExpiry: string;
    cardNumber: string;
    cardCvc: string;
    name: string;
    postalCode: string;
    submit: string;
    [key: string]: string;
  };
  isSubmitting: boolean;
  name: string;
}

const StripeInputContainer = styled.div`
  .__PrivateStripeElement {
    width: 100%;
  }
`

enum NewCardField {
  CARD_NUMBER = 'cardNumber',
  CARD_CVC = 'cardCvc',
  NAME = 'name',
  CARD_EXPIRY = 'cardExpiry',
  POSTAL_CODE = 'postalCode',
}

class NewCardForm extends React.Component<Props, State> {
  readonly state: State = {
    completed: Object.values(NewCardField)
      .reduce((obj, curr) => { return { ...obj, [curr]: false }}, {}),
    errors: Object.values(NewCardField)
      .reduce((obj, curr) => { return { ...obj, [curr]: '' }}, {}),
    [NewCardField.NAME]: '',  // name isn't a stripe element component; must collect separately
    isSubmitting: false,
  }
  render () {
    const { errors, isSubmitting } = this.state;
    return (  
      <Form method="POST">
        <Row>
          <Col>
            <FormGroup>
              <Label for={NewCardField.NAME} className="form-label">Name on Card</Label>
              <Input
                id={NewCardField.NAME}
                invalid={!!errors.name}
                name={NewCardField.NAME}
                onBlur={this.handleNameChange}
                onChange={this.handleNameChange}
                placeholder="Name on Card" />
              <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for={NewCardField.CARD_NUMBER} className="form-label">Card Number</Label>
              <StripeInputContainer>
                <CardNumberElement
                  className={`form-control d-flex align-items-center
                    ${!!errors.cardNumber ? ' is-invalid' : ''}`}
                  id={NewCardField.CARD_NUMBER}
                  onChange={this.handleStripeChange} />
              </StripeInputContainer>
              {errors.cardNumber && <FormFeedback className="d-block">{errors.cardNumber}</FormFeedback>}
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Label for={NewCardField.CARD_EXPIRY} className="form-label">Card Expiry</Label>
              <StripeInputContainer>
                <CardExpiryElement
                  className={`form-control d-flex align-items-center
                    ${!!errors.cardExpiry ? ' is-invalid' : ''}`}
                  id={NewCardField.CARD_EXPIRY}
                  onChange={this.handleStripeChange} />
              </StripeInputContainer>
              {errors.cardExpiry && <FormFeedback className="d-block">{errors.cardExpiry}</FormFeedback>}
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
            <Label for={NewCardField.CARD_CVC} className="form-label">CVC</Label>
              <StripeInputContainer>
                <CardCVCElement
                  className={`form-control d-flex align-items-center
                    ${!!errors.cardCvc ? ' is-invalid' : ''}`}
                  id={NewCardField.CARD_CVC}
                  onChange={this.handleStripeChange} />
              </StripeInputContainer>
              {errors.cardCvc && <FormFeedback className="d-block">{errors.cardCvc}</FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
          
        <Row>
          <Col>
            <FormGroup>
              <Label for={NewCardField.POSTAL_CODE} className="form-label">ZIP</Label>
                <StripeInputContainer>
                  <PostalCodeElement
                    className={`form-control d-flex align-items-center
                      ${!!errors.postalCode ? ' is-invalid' : ''}`}
                    id={NewCardField.POSTAL_CODE}
                    onChange={this.handleStripeChange} />
              </StripeInputContainer>
              {errors.postalCode && <FormFeedback className="d-block">{errors.postalCode}</FormFeedback>}
            </FormGroup>
          </Col>
        </Row>

        <hr />

        <Row className="align-items-center justify-content-end">
          <Col md={8} className="text-center">
            {errors.submit &&
              <FormFeedback className="d-block">
                {errors.submit.includes('Credit card already found')
                  ? errors.submit.slice(15)
                  : errors.submit
                }
              </FormFeedback>
            }
          </Col>
          <Col md={4} className="text-right">
            <Button
              disabled={isSubmitting || !this.isFilledOut() || this.hasErrors()}
              className="btn-success transition-3d-hover"
              color="success"
              onClick={this.handleSubmit}
              type="button">
              Add Card
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
  
  handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      completed: {
        ...this.state.completed,
        name: !!event.currentTarget.value,
      },
      errors: {
        ...this.state.errors,
        name: event.currentTarget.value
          ? ''
          : 'Name on Card is required.',
        submit: '',
      },
      name: event.currentTarget.value,
    })
  }

  handleStripeChange = (event: any): void => {
    const { elementType, error } = event;
    const errorMessage = error ? error.message : '';
    return this.setState({
      completed: {
        ...this.state.completed,
        [elementType]: event.complete,
      },
      errors: {
        ...this.state.errors,
        [elementType]: errorMessage,
        submit: '',
      },
    });
  };
  
  isFilledOut = () => {
    const { completed } = this.state;
    for (let key in completed) {
      if (!completed[key]) return false;
    }
    return true;
  }

  hasErrors = () => {
    const { errors } = this.state;
    for (let key in errors) {
      if (errors[key]) return true;
    }
    return false;
  }

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const { createPaymentSource, handleModal,  setAlert, stripe } = this.props;

    this.setState({ isSubmitting: true },
      () => (
        stripe.createToken({ name: this.state.name })
          .then(({ token }: any) => {
            return createPaymentSource(token.id);
          })
          .then(() => {
            this.setState({ isSubmitting: false }, handleModal);
            setAlert('Success! Your new card has been added.');
          })
          .catch((error: Error) => {
            console.error('error: ', error);
            this.setState({
              isSubmitting: false,
              errors: {
                ...this.state.errors,
                submit: error.message,
              }
            });
          })
      )
    );
  };
};

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

const StripeWrappedNewCardForm = ({ handleModal, setAlert }: any) => (
  <StripeWrapper>
    <EnhancedNewCardForm handleModal={handleModal} setAlert={setAlert} />
  </StripeWrapper>
)

export default StripeWrappedNewCardForm;
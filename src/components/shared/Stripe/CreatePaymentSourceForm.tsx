import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe,
} from 'react-stripe-elements';

import PaymentSourceFormContainer from './PaymentSourceForm.container';

import { CREATE_PAYMENT_SOURCE, GET_PAYMENT_SOURCES } from 'networking/paymentSources';
import Button from 'components/shared/Button';
import Divider from 'components/shared/Divider';
import InputWrapper from 'components/shared/InputWrapper';
import { isNotEmpty, FieldValidation, getInputErrorClass } from 'utils/validators';

interface Props {
  stripe: Window['Stripe'];
  createPaymentSource: (stripeToken: string) => void;
  onClose: () => void;
}

interface State {
  errors: {
    cardExpiry: string;
    cardNumber: string;
    cardCvc: string;
    nameOnCard: string;
    postalCode: string;
    submit: string;
  };
  form: {
    cardNumber: string;
    CVC: string;
    id: string;
    nameOnCard: string;
    yy: string;
    mm: string;
    zip: string;
  };
  validation: {
    cardExpiry: FieldValidation;
    cardNumber: FieldValidation;
    cardCvc: FieldValidation;
    nameOnCard: FieldValidation;
    postalCode: FieldValidation;
    submitError: FieldValidation;
  };
  isSubmitting: boolean;
}

const reactStripeElementStyle = {
  base: {
    '::placeholder': {
      fontSize: '14px',
      fontWeight: '300',
      color: '#ACB6BB',
    }
  }
};


class CreatePaymentSourceForm extends React.Component<Props, State> {
  readonly state = generateDefaultState();

  render() {
    const { errors, form, validation, isSubmitting } = this.state;
    return (
      <PaymentSourceFormContainer>
        <form className="payment-source-form-container" onSubmit={this.handleSubmit}>
          <div>
            <div className="payment-source-form column">
              <InputWrapper>
                <input
                  name="nameOnCard"
                  onChange={this.handleChange}
                  placeholder="Name on Card"
                  type="text"
                  value={form.nameOnCard}
                />
              </InputWrapper>
              {/* <span className={`name-error bee-error-message ${getInputErrorClass(validation.nameOnCard)}`.trim()}>
                {errorMessages.isEmpty}
              </span> */}
            </div>
            <div className="payment-source-form card-elements">
              <div className="number-field stripe-input-container">
                <CardNumberElement
                  className="stripe-input"
                  onChange={this.handleStripeChange}
                  style={reactStripeElementStyle} />
                <span className={`bee-error-message ${getInputErrorClass(validation.cardNumber)}`.trim()}>
                  {errors.cardNumber}
                </span>
              </div>
              <div className="split-container">
                <div className="expiry-field stripe-input-container">
                  <CardExpiryElement
                    className="stripe-input"
                    onChange={this.handleStripeChange}
                    style={reactStripeElementStyle} />
                  <span className={`bee-error-message ${getInputErrorClass(validation.cardExpiry)}`.trim()}>
                    {errors.cardExpiry}
                  </span>
                </div>
                <div className="cvc-field stripe-input-container">
                  <CardCVCElement
                    className="stripe-input"
                    onChange={this.handleStripeChange}
                    style={reactStripeElementStyle} />
                  <span className={`bee-error-message ${getInputErrorClass(validation.cardCvc)}`.trim()}>
                    {errors.cardCvc}
                  </span>
                </div>
              </div>
            </div>
            <div className="payment-source-form column">
              <PostalCodeElement
                className="stripe-input full"
                onChange={this.handleStripeChange}
                style={reactStripeElementStyle} />
              <span className={`bee-error-message ${getInputErrorClass(validation.postalCode)}`.trim()}>
                {errors.postalCode}
              </span>
            </div>
            <span className={`bee-error-message ${getInputErrorClass(validation.submitError)}`.trim()}>
              {errors.submit}
            </span>
          </div>
          <div className="bottom">
            <Divider />
            <div className="actions">
              <Button className="cancel" type="button" background="light" onClick={this.clearAndClose}>
                Cancel
              </Button>
              <Button className="submit" color="white" type="submit" background="style" disabled={this.isSubmitDisabled() || isSubmitting}>
                Add Card
              </Button>
            </div>
          </div>
        </form>
      </PaymentSourceFormContainer>
    );
  }

  clearAndClose = (): void => {
    this.setState(generateDefaultState());
    this.props.onClose();
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    return this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
      validation: {
        ...this.state.validation,
        [name]: isNotEmpty(value),
      },
    });
  };

  handleStripeChange = (event: any): void => {
    const { elementType, error } = event;
    const { errors, validation } = this.state;
    const validationResult = error ? FieldValidation.ERROR : FieldValidation.SUCCESS;
    const errorMessage = error ? error.message : '';
    return this.setState({
      validation: {
        ...validation,
        [elementType]: validationResult,
      },
      errors: {
        ...errors,
        [elementType]: errorMessage,
      },
    });
  };

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    return this.props.stripe
      .createToken(this.state.form)
      .then(({ token }: any) => {
        this.setState({ isSubmitting: false });
        return this.props.createPaymentSource(token.id);
      })
      .then(() => {
        alert('Credit card successfully added.');
        this.props.onClose();
      })
      .catch((error: Error) => {
        console.error('error: ', error);
        this.setState({ isSubmitting: false });
        this.setCreatePaymentSourceError(error);
      });
  };

  isSubmitDisabled = (): boolean => {
    const { cardExpiry, cardNumber, cardCvc, nameOnCard, postalCode } = this.state.validation;
    const isCardExpiryValid = cardExpiry === FieldValidation.SUCCESS;
    const isCardNumberValid = cardNumber === FieldValidation.SUCCESS;
    const isCardCvcValid = cardCvc === FieldValidation.SUCCESS;
    const isNameOnCardValid = nameOnCard === FieldValidation.SUCCESS;
    const isPostalCodeValid = postalCode === FieldValidation.SUCCESS;
    const isSubmitDisabled = !(
      isCardExpiryValid &&
      isCardNumberValid &&
      isCardCvcValid &&
      isNameOnCardValid &&
      isPostalCodeValid
    );
    return isSubmitDisabled;
  };

  setCreatePaymentSourceError = (error: Error): void => {
    const { errors, validation } = this.state;
    if (error.message.includes('Credit card already found')) {
      return this.setState({
        ...this.state,
        errors: {
          ...errors,
          submit: trimGraphQLError(error.message),
        },
        validation: {
          ...validation,
          submitError: FieldValidation.ERROR,
        },
      });
    } else {
      return this.setState({
        ...this.state,
        errors: {
          ...errors,
          submit: error.message,
        },
        validation: {
          ...validation,
          submitError: FieldValidation.ERROR,
        },
      });
    }
  };
}

export default compose(
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
)(injectStripe(CreatePaymentSourceForm));

/** Helper Functions */

function generateDefaultState(): State {
  return {
    errors: {
      cardExpiry: '',
      cardNumber: '',
      cardCvc: '',
      nameOnCard: '',
      postalCode: '',
      submit: '',
    },
    form: {
      cardNumber: '',
      CVC: '',
      id: '',
      nameOnCard: '',
      yy: '',
      mm: '',
      zip: '',
    },
    validation: {
      cardExpiry: FieldValidation.PRISTINE,
      cardNumber: FieldValidation.PRISTINE,
      cardCvc: FieldValidation.PRISTINE,
      nameOnCard: FieldValidation.PRISTINE,
      postalCode: FieldValidation.PRISTINE,
      submitError: FieldValidation.PRISTINE,
    },
    isSubmitting: false,
  };
}

function trimGraphQLError(errorMessage: string): string {
  return errorMessage.slice(15);
}

import * as React from 'react';
import { compose, graphql } from 'react-apollo';

import PaymentSourceFormContainer from './PaymentSourceForm.container';

import { GET_PAYMENT_SOURCES, PaymentSource, UPDATE_PAYMENT_SOURCE, UpdatePaymentSourceInput } from 'networking/paymentSources';
import Button from 'components/Button';
import Divider from 'components/Divider';
import InputLabel from 'components/InputLabel';
import InputWrapper from 'components/InputWrapper';
import Svg from 'components/Svg';
import {
  errorMessages,
  FieldValidation,
  getInputErrorClass,
  hasNoDigits,
  isAlphaChars,
  isDigits,
  isNotEmpty,
  isValidStreetAddress,
} from 'utils/validators';

interface Props {
  stripe: Window['Stripe'];
  paymentSource: PaymentSource;
  updatePaymentSource: (input: UpdatePaymentSourceInput) => Promise<any>;
  onClose: () => void;
}

interface State {
  errors: {
    addressCity: string;
    addressLine1: string;
    addressState: string;
    addressZip: string;
    expMonth: string;
    expYear: string;
    submit: string;
  };
  form: {
    addressCity: string;
    addressLine1: string;
    addressState: string;
    addressZip: string;
    expMonth: string;
    expYear: string;
  };
  validation: {
    addressCity: FieldValidation;
    addressLine1: FieldValidation;
    addressState: FieldValidation;
    addressZip: FieldValidation;
    expMonth: FieldValidation;
    expYear: FieldValidation;
    submitError: FieldValidation;
  };
}

class UpdatePaymentSourceForm extends React.Component<Props, State> {
  readonly state: State = generateDefaultState();

  render() {
    const { errors, form, validation } = this.state;
    const { stripeBrand, stripeLast4 } = this.props.paymentSource;
    const renderMonthOptions = getMonths().map((month: string) => <option key={month} value={month}>{month}</option>);
    const renderYearOptions = getYears().map((year: string) => <option key={year} value={year}>{year}</option>);
    return (
      <PaymentSourceFormContainer>
        <h4>{`${stripeBrand} XXXX-XXXX-XXXX-${stripeLast4}`}</h4>
        <form className="payment-source-form-container update" onSubmit={this.handleSubmit}>
          <div className="payment-source-form row">
            <div className="address-field">
              <InputLabel htmlFor="address">Billing Address</InputLabel>
              <InputWrapper>
                <input
                  name="addressLine1"
                  onChange={this.handleChange}
                  placeholder="Billing Address"
                  type="text"
                  value={form.addressLine1} />
              </InputWrapper>
              <span className={`bee-error-message ${getInputErrorClass(validation.addressLine1)}`.trim()}>
                {errorMessages.addressLine1}
              </span>
            </div>
          </div>
          <div className="payment-source-form row address-container">
            <div className="city-field">
              <InputWrapper>
                <input
                  name="addressCity"
                  onChange={this.handleChange}
                  placeholder="City"
                  type="text"
                  value={form.addressCity} />
              </InputWrapper>
              <span className={`bee-error-message ${getInputErrorClass(validation.addressCity)}`.trim()}>
                {errorMessages.isEmpty}
              </span>
            </div>
            <div className="state-field">
              <InputWrapper>
                <input
                  name="addressState"
                  onChange={this.handleChange}
                  placeholder="State"
                  type="text"
                  value={form.addressState} />
              </InputWrapper>
              <span className={`bee-error-message ${getInputErrorClass(validation.addressState)}`.trim()}>
                {errorMessages.isEmpty}
              </span>
            </div>
            <div className="zip-field">
              <InputWrapper>
                <input
                  name="addressZip"
                  onChange={this.handleChange}
                  placeholder="ZIP"
                  type="text"
                  value={form.addressZip} />
              </InputWrapper>
              <span className={`bee-error-message ${getInputErrorClass(validation.addressZip)}`.trim()}>
                {errorMessages.isEmpty}
              </span>
            </div>
          </div>
          <div className="payment-source-form column exp-container">
            <InputLabel htmlFor="expMonth">Exp Date</InputLabel>
            <div className="exp-input-container">
              <div className="select-container expMonth">
                <select name="expMonth" onChange={this.handleChange} value={form.expMonth}>
                  <option value='-1' disabled>MM</option>
                  {renderMonthOptions}
                </select>
                <Svg className="bee-svg" src="utils/carat-down" />
              </div>
              <div className="select-container expYear">
                <select name="expYear" onChange={this.handleChange} value={form.expYear}>
                  <option value='-1' disabled>YYYY</option>
                  {renderYearOptions}
                </select>
                <Svg className="bee-svg" src="utils/carat-down" />
              </div>
            </div>
            <span className={`bee-error-message ${getInputErrorClass(validation.expMonth, validation.expYear)}`.trim()}>
              {errorMessages.expirationDate}
            </span>
          </div>
          <span className={`bee-error-message ${this.getSubmitErrorClass()}`.trim()}>{errors.submit}</span>
          <Divider />
          <div className="actions">
            <Button className="cancel" textStyle="title-8" type="button" background="light" onClick={this.clearAndClose}>
              Cancel
            </Button>
            <Button className="submit" textStyle="title-8" type="submit" background="style" disabled={this.isSubmitDisabled()}>
              Update Card
            </Button>
          </div>
        </form>
      </PaymentSourceFormContainer>
    );
  }

  clearAndClose = (): void => {
    this.setState(generateDefaultState());
    this.props.onClose();
  }

  getSubmitErrorClass = (): string => getInputErrorClass(this.state.validation.submitError);

  handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
    const { form, validation } = this.state;
    const { name, value } = event.target;
    if (this.isInvalidInput(name, value)) {
      return;
    }
    return this.setState({
      form: { ...form, [name]: value },
      validation: {
        ...validation,
        [name]: name === 'addressLine1' ? isValidStreetAddress(value) : isNotEmpty(value),
        submitError: FieldValidation.PRISTINE
      }
    });
  }

  handleSubmit = (event: React.FormEvent): Promise<any> => {
    event.preventDefault();
    const input = {
      ...this.state.form,
      id: this.props.paymentSource.id,
    };
    return this.props.updatePaymentSource(input)
      .then(() => {
        alert('Payment information has been updated.');
        this.props.onClose();
      })
      .catch((error: Error) => {
        this.setUpdatePaymentSourceError(error);
      });
  }

  isInvalidInput(name: string, value: string): boolean {
    const { form } = this.state;
    if (name === 'addressCity' && !hasNoDigits(value)) {
      return true;
    }
    if (name === 'addressState') {
      if (form.addressState.length === 2 && value.length > 2) { return true; }
      if (!isAlphaChars(value) && value !== '') { return true; }
    }
    if (name === 'addressZip') {
      if (form.addressZip.length === 12 && value.length > 12) { return true; }
      if (!isDigits(value) && value) { return true; }
    }
    return false;
  }

  isSubmitDisabled = (): boolean => {
    const { validation } = this.state;
    const isAddressValid = validation.addressLine1 === FieldValidation.SUCCESS;
    const isCityValid = validation.addressCity === FieldValidation.SUCCESS;
    const isExpMonthValid = validation.expMonth === FieldValidation.SUCCESS;
    const isExpYearValid = validation.expYear === FieldValidation.SUCCESS;
    const isStateValid = validation.addressState === FieldValidation.SUCCESS;
    const isZipValid = validation.addressZip === FieldValidation.SUCCESS;
    return !(
      isAddressValid &&
      isCityValid &&
      isExpMonthValid &&
      isExpYearValid &&
      isZipValid &&
      isStateValid
    );
  }

  setUpdatePaymentSourceError = (error: Error): void => {
    const { errors, validation } = this.state;
    return this.setState({
      ...this.state,
      errors: {
        ...errors,
        submit: error.message,
      },
      validation: {
        ...validation,
        submitError: FieldValidation.ERROR,
      }
    });
  }
}

export default compose(
  graphql(UPDATE_PAYMENT_SOURCE, {
    props: ({ mutate }: any) => ({
      updatePaymentSource: (input: UpdatePaymentSourceInput): Promise<any> => {
        return mutate({
          variables: { input },
          refetchQueries: [{ query: GET_PAYMENT_SOURCES }],
          update: (store: any, { data: { updatePaymentSource } }: any) => {
            try {
              const paymentSources = store.readQuery({ query: GET_PAYMENT_SOURCES });
              paymentSources.push(updatePaymentSource);
              store.writeQuery({ query: GET_PAYMENT_SOURCES, data: paymentSources });
            } catch {
              // do nothing by default
              // in the event that the client doesn't have getPaymentSources queried, an
              // error will be thrown when apollo reads into the store. the logic in
              // 'try' should apply only if the getPaymentSources query exists in the store.
            }
          }
        });
      },
    }),
  }),
)(UpdatePaymentSourceForm);


/** Helper Functions */

function generateDefaultState() {
  return {
    errors: {
      addressCity: '',
      addressLine1: '',
      addressState: '',
      addressZip: '',
      expMonth: '',
      expYear: '',
      submit: '',
    },
    form: {
      addressCity: '',
      addressLine1: '',
      addressZip: '',
      addressState: '',
      expMonth: '-1',
      expYear: '-1',
    },
    validation: {
      addressCity: FieldValidation.PRISTINE,
      addressLine1: FieldValidation.PRISTINE,
      addressState: FieldValidation.PRISTINE,
      addressZip: FieldValidation.PRISTINE,
      expMonth: FieldValidation.PRISTINE,
      expYear: FieldValidation.PRISTINE,
      submitError: FieldValidation.PRISTINE,
    }
  };
}

function getMonths() {
  return Array(12).fill(null).map((_, i) => `${i + 1}`);
}

function getYears() {
  return Array(12).fill(null).map((_, i) => `${i + 2018}`);
}

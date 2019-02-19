import firebase from 'firebase/app';
import * as React from 'react'

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import Button from 'shared/Button';
import CloseButton from 'shared/CloseButton';
import Divider from 'shared/Divider';
import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import SelectBoxWrapper from 'shared/SelectBoxWrapper';
import Snackbar from 'shared/Snackbar';
import Svg from 'shared/Svg';
import { COUNTRY_CODES, CountryCode } from 'utils/countryCodes';
import {
  FirebaseUser,
  getPhoneCredential,
  phoneProvider,
} from 'utils/firebase';
import {
  FieldValidation,
  getDisplayErrorMessage,
  getDisplaySuccessMessage,
  getInputErrorClass,
  getInputValidationClass,
  isValidPhoneNumber,
  isValidVerificationCode,
  SuccessMessage,
} from 'utils/validators';

enum SubmitType {
  PHONE_NUMBER,
  VERIFICATION_CODE,
}

interface Props {
  onClose: () => void,
  showSnackBarSuccess: () => void,
  refreshVerificationStatus: () => Promise<void>;
  user: FirebaseUser,
};

interface State {
  countryCode: string;
  dialCode: string;
  inputForm: {
    phoneNumber: string;
    verificationCode: string;
  };
  inputValidation: {
    phoneNumber: FieldValidation;
    verificationCode: FieldValidation;
  };
  isSubmitting: boolean;
  phoneNumberErrorMessage: string;
  snackbar: {
    message: string;
    open: boolean;
  },
  submitType: SubmitType;
  verificationId: string;
}

class AccountVerificationPhoneCard extends React.Component<Props, State> {
  readonly state = {
    countryCode: 'USA',
    dialCode: '1',
    inputForm: {
      phoneNumber: '',
      verificationCode: '',
    },
    inputValidation: {
      phoneNumber: FieldValidation.PRISTINE,
      verificationCode: FieldValidation.PRISTINE,
    },
    isSubmitting: false,
    phoneNumberErrorMessage: '',
    snackbar: {
      message: '',
      open: false,
    },
    submitType: SubmitType.PHONE_NUMBER,
    verificationId: '',
  };

  appVerifier: any;
  currentUser = this.props.user;
  recaptcha: any;

  componentDidMount() {
    this.appVerifier = new firebase.auth.RecaptchaVerifier(this.recaptcha, {'size': 'invisible'});
  }

  render() {
    const { countryCode, inputForm, inputValidation, phoneNumberErrorMessage, snackbar, submitType } = this.state;
    const { onClose } = this.props;
    return (
      <>
        <div ref={(ref) => this.recaptcha = ref} />
        <CloseButton className="close" height="56px" iconColor="upper" onClose={onClose} width="56px" />
        <h1>Change/Add Phone Number</h1>
        <div className="phone-container">
          <InputLabel>Enter Your New Phone Number</InputLabel>
          <div className="phone-area-code-container">
            <SelectBoxWrapper end="large" suffixSize="tiny">
              <select 
                id="country-code"
                name="country-code"
                value={countryCode}
                onChange={this.handleDialCodeChange}>
                {COUNTRY_CODES.map((options: CountryCode) => (
                  <option
                    key={options.code}
                    value={options.code}>
                    +{options.phone} {options.name}
                  </option>
                ))}
              </select>
              <Svg className="suffix" src="utils/carat-down" />
            </SelectBoxWrapper>
            <InputWrapper>
              <input
                className={getInputValidationClass(inputValidation.phoneNumber)}
                onChange={this.handleInput}
                placeholder="555-555-5555"
                type="text"
                name="phoneNumber"
                value={inputForm.phoneNumber} />
            </InputWrapper>
          </div>
        </div>
        <span
          className={`bee-error-message ${getInputErrorClass(inputValidation.phoneNumber)}`.trim()}>
          {phoneNumberErrorMessage}
        </span>
        <div className={`verification-code-container ${this.enablePhoneVerification()}`.trim()}>
          <div className="verification-code-container-top">
            <div className="verification-code-input-container">
              <InputLabel>Verification Code</InputLabel>
              <InputWrapper>
                <input
                  className={getInputValidationClass(inputValidation.verificationCode)}
                  onChange={this.handleInput}
                  placeholder="6 digit code"
                  type="text"
                  name="verificationCode"
                  value={inputForm.verificationCode} />
              </InputWrapper>
            </div>
            <Button
              border="core"
              disabled={submitType === SubmitType.PHONE_NUMBER}
              size="small">
              Resend Code
            </Button>
          </div>
          <div className={`verification-code-messaging ${this.enablePhoneVerification()}`.trim()}>
            <span>
              {getDisplaySuccessMessage(SuccessMessage.NEW_CODE_SENT)}
            </span>
            <span>
              {getDisplaySuccessMessage(SuccessMessage.ENTER_SIX_DIGIT_CODE)}
            </span>
          </div>
        </div>
        <AppConsumer>
          {({ screenType }: AppConsumerProps) => {
            if (screenType > ScreenType.MOBILE) return null;
            return <div className="bee-flex-div" />;
          }}
        </AppConsumer>
        <Divider color="middle" />
        <AppConsumer>
          {({ screenType }: AppConsumerProps) => {
            if (screenType < ScreenType.TABLET) return null;
            return <div className="bee-flex-div" />;
          }}
        </AppConsumer>
        <div className="cta">
          <Button background="light" onClick={onClose}>Cancel</Button>
          {submitType === SubmitType.PHONE_NUMBER &&
            <Button
              disabled={(isValidPhoneNumber(inputForm.phoneNumber) !== FieldValidation.SUCCESS) || this.state.isSubmitting}
              onClick={this.handlePhoneNumberSubmit}>
              Submit Phone Number
            </Button>
          }
          {submitType === SubmitType.VERIFICATION_CODE &&
            <Button
              disabled={(isValidVerificationCode(inputForm.verificationCode) !== FieldValidation.SUCCESS) || this.state.isSubmitting}
              onClick={this.handleVerificationCodeSubmit}>
              Submit Verification Code
            </Button>
          }
        </div>

        {snackbar.open && 
          <Snackbar
            autoHideDuration={5000}
            open={snackbar.open}
            onClose={this.closeSnackbar}>
            {snackbar.message}
          </Snackbar>
        }
      </>
    )
  }

  closeSnackbar = () => {
    this.setState({ 
      snackbar: {
        ...this.state.snackbar,
        open: false,
      }
    });
  }

  enablePhoneVerification = () => this.state.submitType === SubmitType.VERIFICATION_CODE ? 'show' : '';

  handleDialCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { inputValidation } = this.state;
    const selectedCountry = COUNTRY_CODES.find((country: CountryCode) => event.target.value === country.code);
    this.setState({
      countryCode: event.target.value || 'USA',
      dialCode: selectedCountry && selectedCountry.phone || '1',
      inputValidation: { ...inputValidation, phoneNumber: FieldValidation.PRISTINE },
      phoneNumberErrorMessage: '',
      submitType: SubmitType.PHONE_NUMBER
    });
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const { inputForm, inputValidation } = this.state;
    if (name === 'phoneNumber') {
      this.setState({
        inputForm: { ...inputForm, [name]: value },
        submitType: SubmitType.PHONE_NUMBER,
      });
    } else {
      this.setState({
        inputForm: { ...inputForm, [name]: value },
        inputValidation: { ...inputValidation, [name]: isValidVerificationCode(value) },
      });
    }
  }

  handlePhoneNumberSubmit = () => {
    const { dialCode, inputForm, inputValidation } = this.state;
    const phoneNumber = `+${dialCode}${inputForm.phoneNumber.replace(/\D/g,'')}`;
    this.setState({ isSubmitting: true });
    phoneProvider.verifyPhoneNumber(phoneNumber, this.appVerifier)
      .then((verificationId) => this.setState({
        inputValidation: { ...inputValidation, phoneNumber: FieldValidation.PRISTINE },
        isSubmitting: false,
        phoneNumberErrorMessage: '',
        submitType: SubmitType.VERIFICATION_CODE,
        verificationId
      }))
      .catch((error: Error) => {
        console.log(error);
        return this.setState({
          inputValidation: { ...inputValidation, phoneNumber: FieldValidation.ERROR },
          isSubmitting: false,
          phoneNumberErrorMessage: getDisplayErrorMessage(error.message),
        });
      });
  }

  handleVerificationCodeSubmit = () => {
    const { inputForm, verificationId } = this.state;
    this.setState({ isSubmitting: true });
    getPhoneCredential(verificationId, inputForm.verificationCode)
      .then((phoneCredential) => {
        if (this.currentUser) {
          return this.currentUser.linkAndRetrieveDataWithCredential(phoneCredential)
        }
        return Promise.reject();
      })
      .then(() => this.props.refreshVerificationStatus())
      .then(() => {
        this.setState({ isSubmitting: false });
        this.props.showSnackBarSuccess();
      })
      .catch((error: Error) => {
        this.setState({ 
          inputForm: {
            ...inputForm,
            verificationCode: '',
          },
          isSubmitting: false,
          snackbar: {
            message: getDisplayErrorMessage(error.message),
            open: true,
          },
        });
      });
  }
}

export default AccountVerificationPhoneCard;

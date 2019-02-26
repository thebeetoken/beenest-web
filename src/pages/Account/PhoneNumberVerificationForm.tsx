import firebase from 'firebase/app';
import * as React from 'react'

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
  isValidPhoneNumber,
  isValidVerificationCode,
  SuccessMessage,
} from 'utils/validators';
import { Row, Col, Button, Alert, Input, FormGroup, Label, FormFeedback, Container, ModalFooter, Modal } from 'reactstrap';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';

enum SubmitType {
  PHONE_NUMBER,
  VERIFICATION_CODE,
}

interface Props {
  toggleModal: () => void,
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
  alert: {
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
    alert: {
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
    const { inputForm, phoneNumberErrorMessage, alert, submitType } = this.state;
    const { toggleModal } = this.props;
    return (
      <>
        <div ref={(ref) => this.recaptcha = ref} />
        <Modal isOpen toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Change/Add Phone Number</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="country-code">Country Code</Label>
              <Input
                id="country-code"
                name="country-code"
                onChange={this.handleDialCodeChange}
                type="select">
                {COUNTRY_CODES.map((options: CountryCode) => (
                  <option
                    key={options.code}
                    value={options.code}>
                    +{options.phone} {options.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                id="phoneNumber"
                invalid={!!phoneNumberErrorMessage}
                name="phoneNumber"
                onChange={this.handleInput}
                placeholder="555-555-5555"
                type="text" />
              <FormFeedback>{phoneNumberErrorMessage}</FormFeedback>
            </FormGroup>
            {submitType === SubmitType.VERIFICATION_CODE &&
              <div>
                <Label for="verificationCode">Verification Code</Label>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Input
                        onChange={this.handleInput}
                        placeholder="6 digit code"
                        type="text"
                        name="verificationCode"
                        value={inputForm.verificationCode} />
                    </FormGroup>
                  </Col>
                  <Col md={6} className="text-right">
                    <Button
                      border="core"
                      disabled={submitType === SubmitType.PHONE_NUMBER}
                      size="small">
                      Resend Code
                    </Button>
                  </Col>
                </Row>
                <div className="verification-code-messaging">
                  <p>
                    {getDisplaySuccessMessage(SuccessMessage.NEW_CODE_SENT)}
                  </p>
                  <p>
                    {getDisplaySuccessMessage(SuccessMessage.ENTER_SIX_DIGIT_CODE)}
                  </p>
                </div>
              </div>
            }
            <hr />

            <Row className="align-items-center justify-content-end">
              <Col className="text-right">
                <button
                  onClick={() => {
                    console.log('this.state:', this.state);
                  }}>
                  test
                </button>
                {submitType === SubmitType.PHONE_NUMBER &&
                  <Button
                    color="success"
                    disabled={(isValidPhoneNumber(inputForm.phoneNumber) !== FieldValidation.SUCCESS) || this.state.isSubmitting}
                    onClick={this.handlePhoneNumberSubmit}>
                    Submit Phone Number
                  </Button>
                }
                {submitType === SubmitType.VERIFICATION_CODE &&
                  <Button
                    color="success"
                    disabled={(isValidVerificationCode(inputForm.verificationCode) !== FieldValidation.SUCCESS) || this.state.isSubmitting}
                    onClick={this.handleVerificationCodeSubmit}>
                    Submit Verification Code
                  </Button>
                }
              </Col>
            </Row>

            <Alert
              isOpen={alert.open}
              color="success">
              {alert.message}
            </Alert>
          </ModalBody>
        </Modal>
      </>
    )
  }

  handleDialCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      })
      .catch((error: Error) => {
        this.setState({ 
          inputForm: {
            ...inputForm,
            verificationCode: '',
          },
          isSubmitting: false,
          alert: {
            message: getDisplayErrorMessage(error.message),
            open: true,
          },
        });
      });
  }
}

export default AccountVerificationPhoneCard;

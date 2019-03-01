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
import { Row, Col, Button, Alert, Input, FormGroup, Label, FormFeedback, Modal } from 'reactstrap';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';

enum SubmitType {
  PHONE_NUMBER,
  VERIFICATION_CODE,
}

interface Props {
  isOpen: boolean;
  refreshVerificationStatus: () => Promise<void>;
  toggleModal: () => void,
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
    color: string;
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
      color: 'danger',
      message: '',
      open: false,
    },
    submitType: SubmitType.PHONE_NUMBER,
    verificationId: '',
  };

  appVerifier: any;
  recaptcha: any;

  componentDidMount() {
    this.appVerifier = new firebase.auth.RecaptchaVerifier(this.recaptcha, {'size': 'invisible'});
  }

  render() {
    const { inputForm, phoneNumberErrorMessage, alert, submitType } = this.state;
    const { isOpen, toggleModal } = this.props;
    return (
      <>
        <div ref={(ref) => this.recaptcha = ref} />
        <Modal isOpen={isOpen} toggle={toggleModal}>
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

            {submitType ===  SubmitType.VERIFICATION_CODE &&
              <Row>
                <Col>
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
                        className="btn-success transition-3d-hover"
                        disabled={this.state.isSubmitting}
                        onClick={this.handlePhoneNumberSubmit}
                        size="small">
                        Resend Code
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }

            <Row>
              <Col>
                <Alert
                  isOpen={alert.open}
                  color={alert.color}>
                  {alert.message
                    ? alert.message
                    : <p className="mb-0 small">
                        {getDisplaySuccessMessage(SuccessMessage.NEW_CODE_SENT)}<br />{getDisplaySuccessMessage(SuccessMessage.ENTER_SIX_DIGIT_CODE)}
                      </p>
                  }
                </Alert>
              </Col>
            </Row>
            
            <hr />

            <Row className="align-items-center justify-content-end">
              <Col className="text-right">
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
        alert: {
          color: 'success',
          open: true,
          message: '',
        },
        inputValidation: { ...inputValidation, phoneNumber: FieldValidation.PRISTINE },
        isSubmitting: false,
        phoneNumberErrorMessage: '',
        submitType: SubmitType.VERIFICATION_CODE,
        verificationId
      }))
      .catch((error: Error) => {
        console.error(error);
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
        if (this.props.user) {
          return this.props.user.linkAndRetrieveDataWithCredential(phoneCredential)
        }
        return Promise.reject();
      })
      .then(() => this.props.refreshVerificationStatus())
      .then(() => {
        this.setState({
          isSubmitting: false,
        }, this.props.toggleModal)
      })
      .catch((error: Error) => {
        this.setState({ 
          inputForm: {
            ...inputForm,
            verificationCode: '',
          },
          isSubmitting: false,
          alert: {
            color: 'danger',
            message: getDisplayErrorMessage(error.message),
            open: true,
          },
        });
      });
  }
}

export default AccountVerificationPhoneCard;

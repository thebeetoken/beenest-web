import * as validator from 'validator';
import isValid from 'date-fns/is_valid';
import { ApolloError } from 'apollo-client';

import { isValidWalletAddress } from './AdminFormHelper';
import timeOptions from './timeOptions';

export enum HomeTypeHostForm {
  ENTIRE_PLACE = 'Entire Place',
  PRIVATE_ROOM = 'Private Room',
  SHARED_ROOM = 'Shared Room',
}

export enum HomeTypeAdminForm {
  ENTIRE_PLACE = 'Entire Place',
  HOTEL_ROOM = 'Hotel Room',
  PRIVATE_ROOM = 'Private Room',
  SHARED_ROOM = 'Shared Room',
}

export enum FieldValidation {
  ERROR = 'ERROR',
  PRISTINE = 'PRISTINE',
  SUCCESS = 'SUCCESS'
}

export enum ErrorMessage {
  EMAIL = 'EMAIL',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  GENERIC = 'GENERIC',
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_EMAIL_PASSWORD = 'INVALID_EMAIL_PASSWORD',
  INVALID_LENGTH = 'INVALID_LENGTH',
  INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER',
  INVALID_WALLET_ADDRESS = 'INVALID_WALLET_ADDRESS',
  IS_EMPTY = 'IS_EMPTY',
  PASSWORD = 'PASSWORD',
  PHONE_NUMBER = 'PHONE_NUMBER',
  PROFILE_VERIFICATION = 'PROFILE_VERIFICATION',
  SORRY = 'SORRY',
  TOO_LONG = 'TOO_LONG',
  TOO_SHORT = 'TOO_SHORT',
}

interface DisplayErrorMessage {
  EMAIL: string;
  EMAIL_EXISTS: string;
  GENERIC: string;
  INVALID_EMAIL: string;
  INVALID_EMAIL_PASSWORD: string;
  INVALID_LENGTH: string;
  INVALID_PHONE_NUMBER: string;
  INVALID_WALLET_ADDRESS: string;
  IS_EMPTY: string;
  PASSWORD: string;
  PHONE_NUMBER: string;
  PROFILE_VERIFICATION: string;
  SORRY: string;
  TOO_LONG: string;
  TOO_SHORT: string;
  [key: string]: string;
}

export const displayErrorMessage: DisplayErrorMessage = {
  EMAIL: 'Your email is invalid.',
  EMAIL_EXISTS: 'Sorry, there is already an account associated with this email, please try again with a different email.',
  GENERIC: 'Sorry, something went wrong!  Please try again later.',
  INVALID_EMAIL: 'Email address provided is invalid. Please make sure the email address is entered correctly.',
  INVALID_EMAIL_PASSWORD: 'Invalid email address or password, please make sure your spelling is correct.',
  INVALID_LENGTH: 'The phone number you have entered is invalid, please enter a valid phone number.',
  INVALID_PHONE_NUMBER: 'The phone number you have entered is invalid, please enter a valid phone number.',
  INVALID_WALLET_ADDRESS: 'The wallet address you entered is not valid, please enter a valid wallet address.',
  IS_EMPTY: 'Field cannot be empty',
  PASSWORD: 'Password must be at least 8 characters in length.',
  PHONE_NUMBER: 'Invalid phone number format. Please make sure to enter a valid phone number including country code (1 for United States).',
  PROFILE_VERIFICATION: 'Please verify your information below to begin booking on Beenest!',
  SORRY: 'Sorry!',
  TOO_LONG: 'The phone number you entered is too long, please enter a valid phone number.',
  TOO_SHORT: 'The phone number you entered is too short, please enter a valid phone number.'
}

export function getDisplayErrorMessage(error: string): string {
  const errorMessage = displayErrorMessage[error] || error;
  return errorMessage;
}

export enum SuccessMessage {
  CHECK_EMAIL = 'CHECK_EMAIL',
  CONFIRMATION_SENT = 'CONFIRMATION_SENT',
  EMAIL_VERIFICATION_SENT = 'EMAIL_VERIFICATION_SENT',
  ENTER_SIX_DIGIT_CODE = 'ENTER_SIX_DIGIT_CODE',
  FACEBOOK_LINKED = 'FACEBOOK_LINKED',
  GENERIC = 'GENERIC',
  NEW_CODE_SENT = 'NEW_CODE_SENT',
  PHONE_VERIFIED = 'PHONE_VERIFIED',
  WALLET_ADDED = 'WALLET_ADDED',
}

export const DisplaySuccessMessage = {
  [SuccessMessage.CHECK_EMAIL]: 'Please check your email for further instructions on resetting your password.',
  [SuccessMessage.CONFIRMATION_SENT]: 'Confirmation Sent!',
  [SuccessMessage.EMAIL_VERIFICATION_SENT]: 'An email has been sent with instructions to verify your email address. Please refresh your browser after verifying.',
  [SuccessMessage.ENTER_SIX_DIGIT_CODE]: '* Enter the six digit code that was sent to the phone number you provided.',
  [SuccessMessage.FACEBOOK_LINKED]: 'Your Facebook has been linked!',
  [SuccessMessage.GENERIC]: 'Thank you!',
  [SuccessMessage.NEW_CODE_SENT]: '* A new code has been sent!',
  [SuccessMessage.PHONE_VERIFIED]: 'Thank you! Your phone number has been verified',
  [SuccessMessage.WALLET_ADDED]: 'Your wallet has been successfully added.',
}

export function getDisplaySuccessMessage(successCode: SuccessMessage): string {
  return successCode ? DisplaySuccessMessage[successCode] : DisplaySuccessMessage.GENERIC;
}

export function getFriendlyErrorMessage(error: Error): string {
  const errorMessage = error.message;
  if (!errorMessage) {
    return '';
  }

  if (errorMessage.startsWith('GraphQL error: ')) {
    return errorMessage.slice(15);
  }

  return errorMessage;
}

export function getFieldValidation(validated: boolean): FieldValidation {
  return validated ? FieldValidation.SUCCESS : FieldValidation.ERROR;
}

export function getGraphQLErrorMessage(error: ApolloError): string {
  return error.graphQLErrors && error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.message;
}

// Validation className helper functions

export function getInputValidationClass(name: string) {
  switch (name) {
    case FieldValidation.ERROR:
      return 'has-error';
    case FieldValidation.SUCCESS:
      return 'is-success';
    default:
      return;
  }
}

export function getInputErrorClass(validation: string, siblingValidation?: string): string {
  return (
    validation === FieldValidation.ERROR ||
    (siblingValidation && siblingValidation === FieldValidation.ERROR)
  ) ? 'show-error' : '';
}

export function getInputSuccessClass(validation: string): string {
  return validation === FieldValidation.SUCCESS ? 'show-success' : '';
}


// Validation functions

export const bypass = (): FieldValidation => {
  return getFieldValidation(true);
};

export const getCreditCardNumberFieldValidation = (isValid: boolean): FieldValidation => {
  return getFieldValidation(isValid);
};

export const isNotEmpty = (input: string | string[]): FieldValidation => {
  if (Array.isArray(input)) {
    return getFieldValidation(!!input.length);
  }
  return getFieldValidation(!validator.isEmpty(input));
};

export const isOptional = (): FieldValidation => {
  return getFieldValidation(true);
};

export const isValidTimeOption = (time: string): FieldValidation => {
  return getFieldValidation(timeOptions.indexOf(time) !== -1);
};

export const isValidCheckOutTime = (checkOutTime: any): FieldValidation => {
  const { from, to } = checkOutTime;
  const fromIndex = timeOptions.indexOf(from);
  return getFieldValidation(fromIndex !== -1 && timeOptions.indexOf(to) > fromIndex);
}

export const isNonNegative = (input: string): FieldValidation => {
  const number = parseInt(input);
  return getFieldValidation(number >= 0);
};

export const isPositive = (input: string): FieldValidation => {
  const number = parseInt(input);
  return getFieldValidation(number > 0);
};

export const isValidStreetAddress = (char: string): FieldValidation => {
  const streetAddressRegex = /^\s*\S+(?:\s+\S+){2}/;
  return getFieldValidation(streetAddressRegex.test(char));
};

export const isValidIcalUrls = (urls: string[]): FieldValidation => {
  if (urls.length === 0) return getFieldValidation(true);
  
  return getFieldValidation(urls.every(url => validator.isURL(url) && url.startsWith('https://')));
};

export const isValidEmail = (email: string): FieldValidation => {
  return getFieldValidation(validator.isEmail(email));
};

export const isValidEthWallet = (address: string): FieldValidation => {
  // TODO use web3 checksum function
  return getFieldValidation(isValidWalletAddress(address));
};

export const isValidHomeType = (input: string): FieldValidation => {
  const validHomeTypes = ['Entire Place', 'Hotel Room', 'Private Room', 'Shared Room'];
  return getFieldValidation(validHomeTypes.includes(input));
};

export const isValidDateString = (input: string): FieldValidation => {
  return getFieldValidation(isValid(new Date(input)));
}

export const isValidPhotosArray = (input: string[]): FieldValidation => {
  return getFieldValidation(input && input.length >= 1 && input.every(url => validator.isURL(url)));
};

export const isValidTitle = (input: string): FieldValidation => {
  return getFieldValidation(5 <= input.length && input.length <= 50);
};

export const isValidUrl = (url: string): FieldValidation => {
  return getFieldValidation(validator.isURL(url));
};

export const isValidPassword = (password: string): FieldValidation => {
  return getFieldValidation(password.length >= 8);
};

export const isValidPhoneNumber = (phoneNumber: string): FieldValidation => {
  const isValidLength = isValidPhoneNumberLength(phoneNumber);
  return getFieldValidation(isValidLength);
};

export const isValidVerificationCode = (code: string): FieldValidation => {
  const isValidLength = isValidVerificationCodeLength(code);
  const isValidInput = isDigits(code);
  return getFieldValidation(isValidInput && isValidLength);
};

export const isValidOptionalUrl = (url: string): FieldValidation => {
  if (!url.length) return getFieldValidation(true);

  return getFieldValidation(validator.isURL(url));
};

export const errorMessages = {
  addressLine1: 'Please enter a valid street address',
  creditCardNumber: 'The credit card number you entered is invalid.',
  creditCardExpiry: 'Your card`s expiration year is invalid',
  creditCardCVC: 'Your card`s security code is incomplete',
  email: 'Your email is invalid.',
  emailExists: 'Sorry, there is already an account associated with this email, please try again with a different email.',
  expirationDate: 'Please select a valid expiration date',
  forgotEmail: 'Invalid email address, please make sure spelling is correct.',
  generic: 'Sorry, something went wrong!  Please try again later.',
  password: 'Password must be at least 8 characters in length.',
  phoneNumber: 'Please enter a valid international phone number.',
  postalCode: 'Please enter a valid zip/postal code',
  isEmpty: 'Field cannot be empty',
  emailMissing: 'User does not have an email.',
};


// Validation helper functions

export function isDigits(input: string): boolean {
  const isDigitsRegex = /^\d+$/;
  return isDigitsRegex.test(input);
}

export function hasNoDigits(input: string): boolean {
  const hasNoDigitsRegex = /^([^0-9]*)$/;
  return hasNoDigitsRegex.test(input);
}

export function isAlphaChars(chars: string): boolean {
  const isAlphaCharsRegex = /^[a-zA-Z]+$/;
  return isAlphaCharsRegex.test(chars);
}

export function isValidPhoneNumberLength(phoneNumber: string): boolean {
  return phoneNumber.length > 6;
}

function isValidVerificationCodeLength(code: string): boolean {
  return code.length === 6;
}

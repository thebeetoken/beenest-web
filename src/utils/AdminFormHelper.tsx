import * as validator from 'validator';

interface initialFormEntries {
  [key: string]: any;
}

interface UpdateHelperParams {
  fieldName: string;
  self: React.Component;
  status: boolean;
}

export const generateDefaultState = () => {
  return {
    formMessage: 'Missing or invalid fields.',
    id: '',
    isSubmitClicked: false,
    errors: {
      about: generateErrorBoundary(),
      btcWalletAddress: generateErrorBoundary(),
      email: generateErrorBoundary(),
      firstName: generateErrorBoundary(),
      lastName: generateErrorBoundary(),
      phoneNumber: generateErrorBoundary(),
      profilePicUrl: generateErrorBoundary(),
      walletAddress: generateErrorBoundary(),
    },
    userForm: {
      about: '',
      btcWalletAddress: '',
      email: '',
      firstName: '',
      id: '',
      lastName: '',
      password: `${Math.random() * 9999}`,
      phoneNumber: '+1',
      profilePicUrl: '',
      stripeAccountDashboardLink: '',
      walletAddress: '',
    },
  };
};

export const generateInitialState = (initialFormEntries: initialFormEntries) => {
  const defaultState = generateDefaultState();
  const filteredInitialState = Object.keys(initialFormEntries)
    .filter(key => initialFormEntries[key] !== null && initialFormEntries[key] !== undefined)
    .reduce((obj, key) => ({ ...obj, [key]: initialFormEntries[key] }), {});
  return {
    ...defaultState,
    userForm: {
      ...defaultState.userForm,
      ...filteredInitialState
    }
  };
};

export const generateErrorBoundary = () => {
  return { error: false, success: false, };
};

export const bypass = (): boolean => {
  return true;
};

export const isNotEmpty = (input: string): boolean => {
  return !validator.isEmpty(input);
};

export const isOptional = (): boolean => {
  return true;
};

export const isPositive = (input: number): boolean => {
  return input > 0;
};

export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const isValidName = (name: string): boolean => {
  return !!name && name.length >= 2;
};

export const isValidPhoneNumberInput = (phoneNumber: string) => {
  const isValidPhoneNumberRegex = /^\+\d+$/;
  return isValidPhoneNumberRegex.test(phoneNumber);
};

export const isValidPhoneNumberLength = (phoneNumber: string) => {
  return phoneNumber.length > 9;
};

export const isValidPhoneNumber = (phoneNumber: string) => {
  return isValidPhoneNumberInput(phoneNumber) && isValidPhoneNumberLength(phoneNumber);
};

export const isValidPhotosArray = (input: string[]) => {
  return input && input.length >= 4 && input.every(url => validator.isURL(url));
};

export const isValidTitle = (input: string) => {
  return 5 <= input.length && input.length <= 50;
};

export const isValidUrl = (url: string): boolean => {
  return validator.isURL(url);
};

export const isValidWalletAddress = (address: string) => {
  return address != null && address.match('^0x[a-fA-f0-9]{40}') != null;
};

export const updateErrorState = (params: UpdateHelperParams): void => {
  const { fieldName, self, status } = params;
  const newStatus = { error: !status, success: status };
  self.setState({ error: { [fieldName]: newStatus } });
};

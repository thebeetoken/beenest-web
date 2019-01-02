import * as React from 'react';
import { compose, graphql, Query } from 'react-apollo';

import HostPaymentsContainer from './HostPayments.container';

import { SETTINGS } from 'configs/settings';
import { GET_USER, UPDATE_HOST_WALLET, User, CREATE_STRIPE_LOGIN_LINK } from 'networking/users';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import AudioLoading from 'shared/loading/AudioLoading';
import Snackbar from 'shared/Snackbar';
import {
  ErrorMessage,
  FieldValidation,
  getDisplayErrorMessage,
  getDisplaySuccessMessage,
  getInputValidationClass,
  getInputErrorClass,
  getFriendlyErrorMessage,
  isValidEthWallet,
  SuccessMessage
} from 'utils/validators';

const { BEENEST_HOST } = SETTINGS;
const SNACKBAR_DURATION_MS = 5000;

export enum SubmitStatus {
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  PRISTINE = 'PRISTINE',
  SUCCESS = 'SUCCESS'
}

const HostPayments = (): JSX.Element => {
  return (
    <Query query={GET_USER}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AudioLoading height={48} width={96} />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }

        const user = data.user;
        return (
          <HostPaymentsContent {...user} />
        );
      }}
    </Query>
  );
}

interface HostPaymentsContentState {
  inputForm: {
    walletAddress: string;
  },
  inputValidation: {
    submitError: FieldValidation;
    walletAddress: FieldValidation;
  },
  snackbar: {
    autoHideDuration: number;
    message: string;
    open: boolean;
  };
  stripeLoginLink: string | null;
  submitStatus: string;
}

interface Props extends User {
  updateHostWallet: (walletAddress: string) => Promise<User>,
  createStripeLoginLink: () => Promise<StripeLoginLink>,
}

interface StripeLoginLink {
  stripeLoginLink: string;
}

class EnhancedComponent extends React.Component<Props, HostPaymentsContentState> {
  readonly state = {
    inputForm: {
      walletAddress: this.props.walletAddress || '',
    },
    inputValidation: {
      submitError: FieldValidation.PRISTINE,
      walletAddress: FieldValidation.PRISTINE,
    },
    snackbar: {
      autoHideDuration: SNACKBAR_DURATION_MS,
      message: '',
      open: false,
    },
    stripeLoginLink: null,
    submitStatus: getDisplayErrorMessage(ErrorMessage.GENERIC),
  }

  componentDidMount() {
    this.props.createStripeLoginLink()
      .then((stripeLoginLink: any) => {
        this.setState({ stripeLoginLink: stripeLoginLink.data.createStripeLoginLink.url })
      })
      .catch(error => console.error(error));
  }

  render() {
    const { inputForm, inputValidation, snackbar, stripeLoginLink, submitStatus } = this.state;
    const { stripeAccountDashboardLink, walletAddress } = this.props;

    return (
      <>
        <HostPaymentsContainer>
          <div className="host-payments-wallet-container">
            <div className="host-payments-wallet-container--input">
              <InputLabel htmlFor="walletAddress">Wallet Address</InputLabel>
              <p>Add Wallet Address to receive crypto currency payments.</p>
              <InputWrapper>
                <input
                  className={getInputValidationClass(inputValidation.walletAddress)}
                  id="walletAddress"
                  onChange={this.handleChange}
                  placeholder="0xYYYYY"
                  type="text"
                  name="walletAddress"
                  value={inputForm.walletAddress} />
              </InputWrapper>
              <span
                className={`bee-error-message ${getInputErrorClass(inputValidation.walletAddress)}`.trim()}>
                {getDisplayErrorMessage(ErrorMessage.INVALID_WALLET_ADDRESS)}
              </span>
            </div>
            <Button
              background="secondary"
              color="white"
              disabled={
                (inputValidation.walletAddress !== FieldValidation.SUCCESS)
                || (submitStatus === SubmitStatus.ERROR)
                || (submitStatus === SubmitStatus.LOADING)
              }
              onClick={this.handleSubmit}
              size="small">
              {walletAddress
                ? 'Set Wallet Address'
                : 'Add Wallet Address'
              }
            </Button>
          </div>
          <div className="host-payments-stripe-container">
            <div className="host-payments-stripe-container--meta">
              <InputLabel>Bank Information</InputLabel>
              <p>
                {stripeAccountDashboardLink
                  ? 'Congrats! Your bank information has been set up and you are able to get paid.'
                  : 'Add your bank information to our payment processing partner, Stripe, so you can get paid.'
                }
              </p>
            </div>
            <BeeLink
              href={(stripeAccountDashboardLink && stripeLoginLink) ? stripeLoginLink : `${BEENEST_HOST}/account/stripe_express/new`}
              target="_blank">
              <Button background="secondary" color="white" size="small">
                {stripeAccountDashboardLink
                  ? 'Go To Stripe Dashboard'
                  : 'Setup Stripe Account'
                }
              </Button>
            </BeeLink>
          </div>
        </HostPaymentsContainer>
        {snackbar.open &&
          <Snackbar
            autoHideDuration={snackbar.autoHideDuration}
            open={snackbar.open}
            onClose={this.closeSnackbar}>
            {snackbar.message}
          </Snackbar>
        }
      </>
    );
  }

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false,
      }
    });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputForm: { walletAddress: event.target.value },
      inputValidation: {
        walletAddress: isValidEthWallet(event.target.value),
        submitError: FieldValidation.PRISTINE
      }
    });
  }

  handleSubmit = () => {
    this.setState({ submitStatus: SubmitStatus.LOADING });
    this.props.updateHostWallet(this.state.inputForm.walletAddress)
      .then(_ => {
        this.setState({
          snackbar: {
            autoHideDuration: SNACKBAR_DURATION_MS,
            message: getDisplaySuccessMessage(SuccessMessage.WALLET_ADDED),
            open: true,
          },
          submitStatus: SubmitStatus.SUCCESS,
        });
      })
      .catch((error: Error) => {
        this.setState({
          snackbar: {
            autoHideDuration: SNACKBAR_DURATION_MS,
            message: getFriendlyErrorMessage(error) || getDisplayErrorMessage(ErrorMessage.GENERIC),
            open: true,
          },
          submitStatus: SubmitStatus.ERROR,
        });
      })
  }
}

const HostPaymentsContent = compose(
  graphql(UPDATE_HOST_WALLET, {
    props: ({ mutate }: any) => ({
      updateHostWallet: (walletAddress: string): Promise<User> => {
        return mutate({ variables: { walletAddress } });
      },
    }),
  }),
  graphql(CREATE_STRIPE_LOGIN_LINK, {
    props: ({ mutate }: any) => ({
      createStripeLoginLink: (): Promise<StripeLoginLink> => {
        return mutate({ });
      },
    }),
  }),
)(EnhancedComponent);

export default HostPayments;

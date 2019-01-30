import * as React from 'react';
import { compose, graphql, Query } from 'react-apollo';
import { Formik, Field, ErrorMessage, Form, FormikValues, FormikActions } from 'formik';

import HostPaymentsContainer from './HostPayments.container';

import { SETTINGS } from 'configs/settings';
import { GET_HOST_PAGE, UPDATE_WALLET_ADDRESS, User, CREATE_STRIPE_LOGIN_LINK } from 'networking/users';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import AudioLoading from 'shared/loading/AudioLoading';
import ErrorMessageWrapper from 'shared/ErrorMessageWrapper';
import Snackbar from 'shared/Snackbar';
import {
  getDisplaySuccessMessage,
  getFriendlyErrorMessage,
  SuccessMessage
} from 'utils/validators';

const { BEENEST_HOST } = SETTINGS;
const SNACKBAR_DURATION_MS = 5000;

const HostPayments = (): JSX.Element => {
  return (
    <Query query={GET_HOST_PAGE}>
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
  snackbar: {
    autoHideDuration: number;
    message: string;
    open: boolean;
  };
  stripeLoginLink: string | null;
}

interface Props extends User {
  updateWalletAddress: (input: UpdateWalletAddressInput) => Promise<User>,
  createStripeLoginLink: () => Promise<StripeLoginLink>,
}

interface UpdateWalletAddressInput {
  btcWalletAddress: string;
  ethWalletAddress: string;
}

interface StripeLoginLink {
  stripeLoginLink: string;
}

class EnhancedComponent extends React.Component<Props, HostPaymentsContentState> {
  readonly state = {
    snackbar: {
      autoHideDuration: SNACKBAR_DURATION_MS,
      message: '',
      open: false,
    },
    stripeLoginLink: null,
  }

  componentDidMount() {
    if (this.props.stripeAccountDashboardLink) {
      this.props.createStripeLoginLink()
        .then((stripeLoginLink: any) => {
          this.setState({ stripeLoginLink: stripeLoginLink.data.createStripeLoginLink.url })
        })
        .catch(error => console.error(error));
    }
  }

  handleUpdateWalletAddressSubmit(values: FormikValues, actions: FormikActions<FormikValues>) {
    const input = {btcWalletAddress: values.btcWalletAddress, ethWalletAddress: values.ethWalletAddress};
    actions.setSubmitting(true);

    return this.props.updateWalletAddress(input)
      .then(_ => {
        this.setState({
          snackbar: {
            autoHideDuration: SNACKBAR_DURATION_MS,
            message: getDisplaySuccessMessage(SuccessMessage.WALLET_ADDED),
            open: true,
          },
        });
      })
      .catch((error: Error) => {
        this.setState({
          snackbar: {
            autoHideDuration: SNACKBAR_DURATION_MS,
            message: getFriendlyErrorMessage(error) || 'There was an error.',
            open: true,
          },
        });
      }).finally(() => {
        return actions.setSubmitting(false);
      });
  }

  render() {
    const { snackbar, stripeLoginLink } = this.state;
    const { stripeAccountDashboardLink, btcWalletAddress, walletAddress } = this.props;

    return (
      <>
        <HostPaymentsContainer>
          <div className="host-payments-section-container">
            <div className="host-payments-section-container--input">
              <InputLabel>Bank Information</InputLabel>
              <p>
                {stripeAccountDashboardLink
                  ? 'Congrats! Your bank information has been set up and you are able to get paid.'
                  : 'Add your bank information to our payment processing partner, Stripe, so you can get paid.'
                }
              </p>
            </div>
          </div>
          <div className="host-payments-section-container host-payments-section-container--links">
            <BeeLink
              href={stripeLoginLink || stripeAccountDashboardLink || `${BEENEST_HOST}/account/stripe_express/new`}
              target="_blank">
              <Button background="secondary" color="white" size="small">
                {stripeAccountDashboardLink
                  ? 'Go To Stripe Dashboard'
                  : 'Create Stripe Express Account'
                }
              </Button>
            </BeeLink>
            {!stripeAccountDashboardLink && <p>
              Stripe Express is only available to hosts in the United States and Canada.<br/>This account will be limited to receiving payouts from Beenest.
            </p>}
            {!stripeAccountDashboardLink && <BeeLink to="/account/stripe/connect" target="_blank">
              <Button background="secondary" color="white" size="small">
                Connect Existing Stripe Account
              </Button>
            </BeeLink>}
            {!stripeAccountDashboardLink && <p>
              Available in the United States and other countries.<br/>Select this if you have an existing Stripe account.
            </p>}
          </div>
          <Formik
            initialValues={{ btcWalletAddress: btcWalletAddress || '', ethWalletAddress: walletAddress || '' }}
            onSubmit={this.handleUpdateWalletAddressSubmit.bind(this)}
            render={({ isSubmitting }) => (
            <Form>
              <div className="host-payments-section-container">
                <div className="host-payments-section-container--input">
                  <InputLabel htmlFor="btcWalletAddress">Bitcoin (BTC) Wallet Address</InputLabel>
                  <p>Add your bitcoin wallet address to receive bitcoin payments.</p>
                  <InputWrapper>
                    <Field
                      id="btcWalletAddress"
                      name="btcWalletAddress"
                      placeholder="YYYYY"
                      type="text" />
                  </InputWrapper>
                  <ErrorMessageWrapper>
                    <ErrorMessage name="btcWalletAddress" />
                  </ErrorMessageWrapper>
                </div>
              </div>
              <div className="host-payments-section-container">
                <div className="host-payments-section-container--input">
                  <InputLabel htmlFor="ethWalletAddress">Etherum (ETH) Wallet Address</InputLabel>
                  <p>Add your wallet address to receive ETH and ERC20 payments.</p>
                  <InputWrapper>
                    <Field
                      id="ethWalletAddress"
                      name="ethWalletAddress"
                      placeholder="0xYYY"
                      type="text" />
                  </InputWrapper>
                  <ErrorMessageWrapper>
                    <ErrorMessage name="ethWalletAddress" />
                  </ErrorMessageWrapper>
                </div>
              </div>
              <div className="host-payments-section-container host-payments-section-container--submit">
                <Button
                  type="submit"
                  background="secondary"
                  color="white"
                  disabled={isSubmitting}
                  size="small">Save</Button>
              </div>
            </Form>
            )}
          />
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
}

const HostPaymentsContent = compose(
  graphql(UPDATE_WALLET_ADDRESS, {
    props: ({ mutate }: any) => ({
      updateWalletAddress: (input:UpdateWalletAddressInput): Promise<User> => {
        return mutate({ variables: { input } });
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

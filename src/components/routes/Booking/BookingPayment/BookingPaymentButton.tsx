import * as React from 'react';
import { compose, graphql } from 'react-apollo';

import BookingPaymentLoadingContainer from './BookingPaymentLoading.container';

import { Web3Provider, Web3Consumer } from 'HOCs/Web3Provider';
import { Booking, CryptoParams, GET_BOOKING, GUEST_CONFIRM_BOOKING, Currency } from 'networking/bookings';
import Button from 'shared/Button';
import Portal from 'shared/Portal';
import GridLoading from 'shared/loading/GridLoading';
import CryptoPortal from 'shared/CryptoPortal';
import { Web3Data, isNetworkValid, payWithBee, payWithEth, payWithToken, getValidNetworkName, loadWeb3 } from 'utils/web3';

interface Props {
  booking: Booking;
  currency?: Currency | string;
  fromBee?: (value: number) => number;
  onSuccess: () => void;
  guestConfirmBooking: (cryptoParams?: CryptoParams | undefined) => void;
}

interface State {
  isSubmitting: boolean;
}

const FROM_BEE_MESSAGE = 'You will be prompted to Confirm two Ethereum transactions to complete this payment.';

class BookingPaymentButton extends React.Component<Props, State> {
  readonly state = {
    isSubmitting: false,
  };

  render() {
    const { isSubmitting } = this.state;
    const { booking, fromBee } = this.props;
    if (booking.currency === Currency.USD) {
      // We do this onclick pattern because if bound, the guestWalletAddress will be an event handler
      return (
        <>
          {isSubmitting &&          
            <Portal color="white" opacity={.95}>
              <BookingPaymentLoadingContainer>
                <GridLoading height={105} width={105} />
                <div className="processing-card">
                  <h2>Processing payment...</h2>
                  <p>Crypto payments may take up to 30 seconds to complete transaction.</p>
                </div>
              </BookingPaymentLoadingContainer>
            </Portal>
          }
          <Button
            textStyle="title-9"
            disabled={isSubmitting}
            onClick={() => this.handleSubmit()}>
            Submit Payment
          </Button>
        </>
      );
    }

    if (booking.currency === Currency.BEE || booking.currency === Currency.ETH) {
      return (
        <Web3Provider>
          <Web3Consumer>
            {({ accounts, networkType, connecting }: Web3Data) => {
              if (connecting) {
                return (
                  <Button disabled={true}>
                    Connecting...
                  </Button>
                );
              }
              if (!accounts) {
                return <p>Please use a DAPP enabled browser.</p>;
              }
              if (!accounts.length) {
                return <p>Please log in to your wallet (e.g. MetaMask)</p>;
              }
              if (!isNetworkValid(networkType)) {
                return <p>Please switch over to {getValidNetworkName()} Ethereum Network to continue your transaction.</p>;
              }
              const isButtonDisabled = isSubmitting || !accounts || !accounts.length;
              const { walletAddress } = accounts[0];
              const message = fromBee && FROM_BEE_MESSAGE;
              return (
                <>
                  {isSubmitting && <CryptoPortal message={message}/>}
                  <Button
                    disabled={isButtonDisabled}
                    onClick={() => this.handleSubmit(walletAddress)}
                    textStyle="title-9">
                    Submit Payment
                  </Button>
                </>
              );
            }}
          </Web3Consumer>
        </Web3Provider>
      );
    }

    return <div>Invalid Currency. Please go back and select a payment type.</div>;
  }

  handleSubmit = async (guestWalletAddress: string | undefined = undefined) => {
    const { booking, currency, fromBee, guestConfirmBooking } = this.props;
    this.setState({ isSubmitting: true });
    try {
      const cryptoParams = await getCryptoParams(booking, guestWalletAddress, currency, fromBee);
      return await guestConfirmBooking(cryptoParams);
    } catch (error) {
      console.error(error);
      alert('There was an error in submitting your payment. Please contact us at support@beetoken.com');
      return this.setState({ isSubmitting: false });
    }
  };
}

async function getCryptoParams(
  booking: Booking,
  guestWalletAddress: string | undefined,
  currency?: Currency | string,
  fromBee?: (value: number) => number
): Promise<CryptoParams | undefined> {
  if (booking.currency === Currency.USD || !guestWalletAddress) {
    return undefined;
  }
  const web3 = loadWeb3();
  const bookingCurrency = fromBee ? Currency.BEE : booking.currency;
  const priceQuote = booking.priceQuotes.find(({ currency }) => currency === bookingCurrency);
  if (!priceQuote) {
    alert('There was an error in submitting your payment. Please contact us at support@beetoken.com');
    throw new Error('INVALID_CRYPTO_CURRENCY_AT_BOOKING_PAYMENT');
  }
  const paymentOptions = {
    guestWalletAddress,
    amount: booking.guestTotalAmount,
    hostWalletAddress: booking.host.walletAddress,
    priceTotalNights: priceQuote.priceTotalNights,
    securityDeposit: priceQuote.securityDeposit,
    transactionFee: priceQuote.transactionFee,
  };
  if (fromBee) {
    return payWithToken(web3.eth, paymentOptions, currency, fromBee);
  }
  switch (booking.currency) {
    case Currency.BEE:
      return payWithBee(web3.eth, paymentOptions);
    case Currency.ETH:
      return payWithEth(web3.eth, paymentOptions, booking);
    default:
      alert('There was an error in submitting your payment. Please contact us at support@beetoken.com');
      throw new Error('INVALID_CRYPTO_CURRENCY_AT_BOOKING_PAYMENT');
  }
}

export default compose(
  graphql(GUEST_CONFIRM_BOOKING, {
    props: ({ mutate, ownProps: { booking, onSuccess } }: any) => ({
      guestConfirmBooking: (cryptoParams: CryptoParams | undefined = undefined) => {
        return mutate({
          query: GET_BOOKING,
          variables: {
            input: {
              id: booking.id,
              ...(cryptoParams && { cryptoParams }),
            },
          },
          update: (store: any, { data }: any) => {
            const { guestConfirmBooking } = data; 
            store.writeQuery({
              query: GET_BOOKING,
              variables: { id: booking.id },
              data: {
                booking: {
                  ...booking,
                  ...guestConfirmBooking,
                },
              },
            });
            return onSuccess();
          },
        });
      },
    }),
  })
)(BookingPaymentButton);

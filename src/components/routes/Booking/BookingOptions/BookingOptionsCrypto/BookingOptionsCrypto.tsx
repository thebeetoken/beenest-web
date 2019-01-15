import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { Web3Provider, Web3Consumer } from 'HOCs/Web3Provider';
import { Booking, Currency } from 'networking/bookings';

import BookingOptionsCryptoContainer from './BookingOptionsCrypto.container';
import BookingOptionsBar from '../BookingOptionsBar';
import SelectPaymentButton from '../SelectPaymentButton';

import Button from 'shared/Button';
import BeeLink from 'shared/BeeLink';

import { Web3Data, isNetworkValid, getValidNetworkName } from 'utils/web3';
import { numberToLocaleString } from 'utils/numberToLocaleString';
import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';

interface Props extends RouterProps {
  booking: Booking;
  currency: Currency;
  fromBee?: (value: number) => number;
}

const BookingOptionsCrypto = ({ booking, currency, fromBee, history }: Props) => (
  <Web3Provider>
    <Web3Consumer>
      {({ connecting, accounts, networkType }: Web3Data) => {
        if (connecting) {
          return (
            <p>Connecting to wallet...</p>
          );
        }
        if (!accounts) {
          return (
            <p>
              Please use a DAPP enabled browser like
              <BeeLink target="_blank" href="https://metamask.io">
                &nbsp;Metamask&nbsp;
              </BeeLink>
              or
              <BeeLink target="_blank" href="https://wallet.coinbase.com/">
                &nbsp;Coinbase Wallet&nbsp;
              </BeeLink>
              on mobile.
            </p>
          );
        }
        if (!isNetworkValid(networkType)) {
          return <p>Please switch over to {getValidNetworkName()} Ethereum Network to continue your transaction.</p>;
        }
        if (!accounts.length) {
          return <p>Please log in to your wallet (e.g. MetaMask)</p>;
        }
        const { priceQuotes } = booking;
        const quote = fromBee ?
          priceQuotes.find(p => p.currency === Currency.BEE) :
          priceQuotes.find(p => p.currency === currency);
        if (!quote) {
          return null;
        }
        const availableFunds = getAvailableAmount(accounts, currency);
        const hasInsufficientFunds = availableFunds < quote.guestTotalAmount;
        return (
          <BookingOptionsCryptoContainer>
            <AppConsumer>
              {({ screenType }: AppConsumerProps) =>
                screenType < ScreenType.DESKTOP && (
                  <div className="mobile-wallet-note">
                    <p>Note: This is the current wallet selected on your app</p>
                  </div>
                )
              }
            </AppConsumer>
            {accounts &&
              accounts.map(account => (
                <div className="crypto-container" key={account.walletAddress}>
                  <div className="crypto-currency">
                    <h3>Available {currency}:</h3>
                    <span>{numberToLocaleString(availableFunds, currency)}</span>

                    {hasInsufficientFunds && (
                      <div className="booking-options-error">
                        <p>
                          You do not have enough tokens for this booking.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="crypto-address">
                    <h3>Address:</h3>
                    <span>{account.walletAddress}</span>
                  </div>
                </div>
              ))}
            <AppConsumer>
              {({ screenType }: AppConsumerProps) => {
                if (screenType < ScreenType.TABLET) {
                  return (
                    <div className="booking-options-crypto-bar">
                      <BookingOptionsBar booking={booking} currency={currency} disabled={hasInsufficientFunds} />
                    </div>
                  );
                }
                return (
                  <div>
                    {accounts && (
                      <div className="booking-options-disclaimer">
                        <p>
                          <span>Note:&nbsp;</span>
                          Wallet Address is automatically updated to the current wallet selected in your Metamask
                          browser application. Make sure the correct wallet is selected and matches the wallet address
                          below.
                        </p>
                      </div>
                    )}
                    <div className="crypto-button-container">
                      <Button
                        className="back-button"
                        background="light"
                        onClick={() => history.push(`/listings/${booking.listingId}`)}
                      >
                        Back
                      </Button>
                      <SelectPaymentButton
                        booking={booking}
                        currency={currency}
                        disabled={hasInsufficientFunds}
                        onSuccess={() => history.push(`/bookings/${booking.id}/payment`)}
                      />
                    </div>
                  </div>
                );
              }}
            </AppConsumer>
          </BookingOptionsCryptoContainer>
        );
      }}
    </Web3Consumer>
  </Web3Provider>
);

export default withRouter(BookingOptionsCrypto);

function getAvailableAmount(accounts: Web3Data['accounts'], currency: Currency): number {
  if (!accounts) {
    return 0;
  }
  const account = accounts[0];
  switch (currency) {
    case Currency.BEE:
      return account.availableBee;
    case Currency.ETH:
      return account.availableEth;
    default:
      return 0;
  }
}

import * as React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import { Web3Provider, Web3Consumer } from 'HOCs/Web3Provider';
import { Booking, Currency } from 'networking/bookings';

import BookingOptionsCryptoContainer from './BookingOptionsCrypto.container';
import BookingOptionsBar from '../BookingOptionsBar';
import SelectPaymentButton from '../SelectPaymentButton';

import Async from 'legacy/shared/Async';
import Button from 'legacy/shared/Button';
import BeeLink from 'legacy/shared/BeeLink';

import { balanceOf, Web3Data, isNetworkValid, getValidNetworkName, loadWeb3 } from 'utils/web3';
import { numberToLocaleString } from 'utils/numberToLocaleString';
import { AppConsumer, AppConsumerProps, ScreenType } from 'legacy/Legacy.context';

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

interface Props extends RouterProps {
  booking: Booking;
  currency: Currency;
  fromBee?: (value: number) => number | string;
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
        const isTwoDaysFromNow =
          moment.utc(booking.checkInDate).valueOf() > (Date.now() + TWO_DAYS_MS);
        const { priceQuotes } = booking;
        const outputCurrency = fromBee ? Currency.BEE : currency;
        const quote = priceQuotes.find(p => p.currency === outputCurrency);
        if (!quote) {
          return null;
        }
        return (
          <Async promise={getAvailableAmount(accounts, currency)} then={availableFunds => {
            const total = fromBee ? fromBee(quote.guestTotalAmount) : quote.guestTotalAmount;
            const hasInsufficientFunds = !availableFunds || (availableFunds < total);
            // TODO: Communicate error state more clearly
            const currencyUnavailable = total === '--.--';
            const isDisabled = hasInsufficientFunds || currencyUnavailable || !isTwoDaysFromNow;
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
                        <span>{numberToLocaleString(availableFunds || 0, currency)}</span>

                        {hasInsufficientFunds && (
                          <div className="booking-options-error">
                            <p>
                              You do not have enough tokens for this booking.
                            </p>
                          </div>
                        )}
                        {currencyUnavailable && (
                          <div className="booking-options-error">
                            <p>
                              Exchange currently unavailable for this token.
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
                {!isTwoDaysFromNow && <div className="booking-options-error">
                  <p>Bookings paid using Ethereum or ERC-20 tokens must be made more than two days in advance.</p>
                </div>}
                <AppConsumer>
                  {({ screenType }: AppConsumerProps) => {
                    if (screenType < ScreenType.TABLET) {
                      return (
                        <div className="booking-options-crypto-bar">
                          <BookingOptionsBar booking={booking} currency={currency} disabled={isDisabled} />
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
                            currency={outputCurrency}
                            disabled={isDisabled}
                            onSuccess={() => history.push(`/bookings/${booking.id}/payment?currency=${currency}`)}
                          />
                        </div>
                      </div>
                    );
                  }}
                </AppConsumer>
              </BookingOptionsCryptoContainer>
            );
          }} />
        );
      }}
    </Web3Consumer>
  </Web3Provider>
);

export default withRouter(BookingOptionsCrypto);

async function getAvailableAmount(accounts: Web3Data['accounts'], currency: Currency): Promise<number> {
  if (!accounts) {
    return 0;
  }
  const account = accounts[0];
  switch (currency) {
    case Currency.BEE:
      return account.availableBee;
    case Currency.ETH:
      return account.availableEth;
    case Currency.DAI:
      const web3 = loadWeb3();
      return balanceOf(web3.eth, currency, accounts[0].walletAddress);
    default:
      return 0;
  }
}

import * as React from 'react';
import { Query } from 'react-apollo';
import { Link, Redirect } from 'react-router-dom';

import { GET_BOOKING_RECEIPT, Booking, Currency } from 'networking/bookings';
import { APP_ENV, AppEnv } from 'configs/settings';

import BookingReceiptContainer from './BookingReceipt.container';
import BookingNavBar from '../BookingNavBar';
import BookingReceiptBar from './BookingReceiptBar';
import Button from 'shared/Button';
import { numberToLocaleString } from 'utils/numberToLocaleString';
import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';

const BookingReceipt = ({ match }: RouterProps) => (
  <Query query={GET_BOOKING_RECEIPT} variables={{ id: match.params.id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }
      if (error || !data) {
        return <h1>ERROR</h1>;
      }
      const booking: Booking = data.booking;
      if (booking.status === 'started') {
        alert('Please complete your booking.');
        return <Redirect to={`/bookings/${match.params.id}/options`} />;
      }
      const { currency, guestTotalAmount, guestWalletAddress, guestTxHash } = booking;
      const totalPaid = `${numberToLocaleString(guestTotalAmount, currency)} ${currency}`;
      const isCrypto = currency !== Currency.USD;
      return (
        <BookingReceiptContainer>
          <BookingNavBar />
          <div className="booking-receipt-wrapper">
            <div className="booking-receipt-body">
              <div className="confirmation-container">
                <h2>Payment confirmed. Your request has been sent to host for approval.</h2>
                <Confirmation {...booking} />
              </div>
              <div className="total-paid-container">
                <h2>Total Paid:</h2>
                <span>{totalPaid}</span>
              </div>
              <div className="payment-option-container">
                {isCrypto && (
                  <>
                    <h2>Wallet Address: </h2>
                    <span>{guestWalletAddress}</span>
                  </>
                )}
              </div>
              <AppConsumer>
                {({ screenType }: AppConsumerProps) => {
                  if (screenType < ScreenType.DESKTOP) {
                    return (
                      <>
                        {isCrypto && (
                          <div className="transaction-container">
                            <h3>Transaction Confirmation</h3>
                            <h4>{guestTxHash}</h4>
                            <a href={generateEtherScanLink(guestTxHash)}>View Transaction on Etherscan</a>
                          </div>
                        )}
                        <div className="booking-receipt-bar-container">
                          <BookingReceiptBar booking={booking} />
                        </div>
                      </>
                    );
                  }
                  return (
                    <div className="booking-receipt-button-container">
                      <Link to={`/trips/${booking.id}/receipt`}>
                        <Button noRadius>Finish</Button>
                      </Link>
                    </div>
                  );
                }}
              </AppConsumer>
            </div>
          </div>
        </BookingReceiptContainer>
      );
    }}
  </Query>
);

export default BookingReceipt;

const Confirmation = ({ currency, id, guestTxHash }: Booking) => (
  <AppConsumer>
    {({ screenType }: AppConsumerProps) => {
      if (screenType < ScreenType.DESKTOP) {
        return (
          <div className="disclaimer">
            *You will be notified via email within 24 hours once your host confirms your booking.
          </div>
        );
      }
      if (currency === Currency.USD) {
        return (
          <>
            <div className="usd-confirmation-container">
              <h3>Transaction Confirmation</h3>
              <span>{id}</span>
            </div>
            <div className="disclaimer">
              You will be notified via email within 24 hours once your host confirms your booking. In the instance where
              the host fails to confirm, we will refund your payment in full. A full transaction receipt will be sent to
              your email.
            </div>
          </>
        );
      }
      return (
        <>
          <div className="crypto-confirmation-container">
            <div className="transaction-container">
              <h3>Transaction Confirmation</h3>
              <h4>{guestTxHash}</h4>
              <a href={generateEtherScanLink(guestTxHash)}>View Transaction on Etherscan</a>
            </div>
          </div>
          <div className="disclaimer">
            You will be notified via email within 24 hours once your host confirms your booking. A full transaction
            receipt will be sent to your email.
          </div>
        </>
      );
    }}
  </AppConsumer>
);

function generateEtherScanLink(guestTxHash: string | null): string {
  if (!guestTxHash) {
    return 'Invalid Transaction Hash!';
  }
  if (APP_ENV === AppEnv.DEVELOPMENT || APP_ENV === AppEnv.TESTNET) {
    return `https://ropsten.etherscan.io/tx/${guestTxHash}`;
  }
  return `https://etherscan.io/tx/${guestTxHash}`;
}

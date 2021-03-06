import * as React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { Booking, GET_BOOKING, Currency } from 'networking/bookings';
import BookingPaymentContainer from './BookingPayment.container';

import Async from 'components/Async';
import Button from 'components/Button';
import BookingQuote from '../BookingQuote';
import BookingPaymentBar from './BookingPaymentBar';
import BookingPaymentButton from './BookingPaymentButton';
import BookingNavBar from '../BookingNavBar';
import { parseQueryString } from 'utils/queryParams';
import { loadWeb3, priceWithEther, priceWithToken } from 'utils/web3';

interface QueryParams {
  currency?: string;
}

function getSwapPrice(currency: Currency, amount: number) {
  const web3 = loadWeb3();
  return currency === Currency.ETH ?
    priceWithEther(web3.eth, amount) :
    priceWithToken(web3.eth, currency, amount);
}

const BookingPayment = ({ history, match }: RouterProps) => (
  <Query query={GET_BOOKING} variables={{ id: match.params.id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }
      if (error || !data) {
        return <h1>ERROR</h1>;
      }
      // We also check the currency
      const booking: Booking = data.booking;
      if (booking.status !== 'started') {
        // If status is invalid, we want to alert and re-route to home
        alert('Booking may not be adjusted at this time.');
        return <Redirect to={`/listings/${booking.listingId}`} />;
      }
      if (!booking.currency) {
        alert('Please select a payment option.');
        return <Redirect to={`/bookings/${match.params.id}/options`} />;
      }
      const queryParams: QueryParams = parseQueryString(location.search);
      const currency = Object.values(Currency).find(c => c === queryParams.currency);
      const pricePromise = !!currency && currency !== booking.currency ?
        getSwapPrice(currency, booking.guestTotalAmount) :
        Promise.resolve(booking.guestTotalAmount);
      return (
        <Async promise={pricePromise} then={price => {
          // The 1.01 multiplier below accounts for fluctuating exchange rates etc.
          const fromBee = (!!price && !!currency && currency !== booking.currency) ?
            ((value: number) => value * price * 1.01 / booking.guestTotalAmount) :
            undefined;
          return (
            <BookingPaymentContainer>
              <BookingNavBar />

              <div className="d-lg-none booking-payment-mobile-body pb-6">
                <TermsAndConditions houseRules={booking.listing.houseRules} />
                <div className="booking-payment-footer-container">
                  <BookingPaymentBar booking={booking} />
                </div>
              </div>

              <div className="d-none d-lg-flex booking-payment-desktop-body">
                <div className="booking-payment-terms">
                  <TermsAndConditions houseRules={booking.listing.houseRules} />
                  <div className="booking-payment-button-container">
                    <Button
                      className="back-button"
                      background="light"
                      onClick={() => history.push(`/bookings/${booking.id}/options`)}>
                      Go Back
                    </Button>
                    <BookingPaymentButton
                      booking={booking}
                      currency={currency}
                      fromBee={fromBee}
                      onSuccess={() => history.push(`/bookings/${booking.id}/receipt`)}
                    />
                  </div>
                </div>
                <div className="d-none d-lg-block booking-payment-quote-container">
                  <BookingQuote
                    booking={booking}
                    currency={currency || booking.currency || Currency.BEE}
                    fromBee={fromBee}
                  />
                </div>
              </div>

            </BookingPaymentContainer>
          );
        }} />
      );
    }}
  </Query>
);

export default BookingPayment;

import sanitize from 'sanitize-html';

interface Prop {
  houseRules: string;
}

const TermsAndConditions = ({ houseRules }: Prop) => (
  <div className="terms-conditions-body pt-6 pb-8 pt-md-0 pb-md-0">
    <h1 className="policies">House Rules, Terms, and Policies.</h1>
    <span className="house-rules" dangerouslySetInnerHTML={{ __html: sanitize(houseRules) }} />
    <div className="conditions">
      <h2>Booking Confirmation</h2>
      <p>
        The booking is NOT confirmed until host approves of the booking. You will get a notification of whether the
        booking is approved or denied within 24 hours of submitting payment.
      </p>
      <h2>Cancellation Policy</h2>
      <p>
        Once booking is confirmed, each booking is subject to a Cancellation Fee equal to 10% of the total cost of the
        booking. Guests may cancel 7 or more days in advance for 100% of refund (per night cost &times; number of nights)
        minus the Cancellation Fee. If cancellation is made in less than 7 days, you will not get any refund nor the
        Cancellation Fee.
      </p>
    </div>
    <div className="terms-and-links-container">
      <a
        href="https://s3-us-west-2.amazonaws.com/beenest-public/legal/Beenest+-+Platform+Terms+of+Service.pdf"
        target="_blank"
      >
        Terms of Service
      </a>
      <p>
        By selecting to complete this booking I acknowledge that I have read and accepted the Conditions and Guidelines,
        Terms of Service and Policies.
      </p>
    </div>
  </div>
);

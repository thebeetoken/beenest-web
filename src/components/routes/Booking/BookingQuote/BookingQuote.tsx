import * as React from 'react';
import differenceInDays from 'date-fns/difference_in_days';

import { Booking, Currency, PriceQuote } from 'networking/bookings';

import BookingQuoteContainer from './BookingQuote.container';
import { formatSingleDate } from 'utils/formatDate';
import { numberToLocaleString } from 'utils/numberToLocaleString';

interface Props {
  booking: Booking;
  currency: Currency;
  fromBee?: (value: number) => (number | string);
}

function getMatchingPriceQuote(priceQuotes: PriceQuote[], currency: Currency, fromBee?: (value: number) => (number | string)) {
  if (!fromBee) {
    return priceQuotes.find((quote: PriceQuote) => quote.currency === currency);
  }
  const priceQuote: PriceQuote | undefined =
    priceQuotes.find((quote: PriceQuote) => quote.currency === Currency.BEE);
  if (!priceQuote) {
    return undefined;
  }
  return {
    creditAmountApplied: fromBee(priceQuote.creditAmountApplied),
    currency,
    guestTotalAmount: fromBee(priceQuote.guestTotalAmount),
    guestTotalAmountUsd: priceQuote.guestTotalAmountUsd,
    pricePerNight: fromBee(priceQuote.pricePerNight),
    priceTotalNights: fromBee(priceQuote.priceTotalNights),
    securityDeposit: fromBee(priceQuote.securityDeposit),
    transactionFee: fromBee(priceQuote.transactionFee)
  };
}

const BookingQuote = ({ booking, currency, fromBee }: Props) => {
  const { checkInDate, checkOutDate, listing, numberOfGuests, priceQuotes } = booking;
  const { city, homeType, title } = listing;
  const currentQuote = getMatchingPriceQuote(priceQuotes, currency, fromBee);
  if (!currentQuote) {
    return <div>Quote does not exist</div>;
  }
  const duration = differenceInDays(checkOutDate, checkInDate);
  return (
    <BookingQuoteContainer>
      <div className="booking-quote-title-container">
        <h3 className="title">{title}</h3>
        <h4 className="home-type">
          <span>{homeType} in {city}</span>
        </h4>
      </div>
      <div className="booking-quote-dates-container">
        <div className="dates-row">
          <span className="dates-text">Guests:</span>
          <span className="dates-value">
            {numberOfGuests} {numberOfGuests > 1 ? 'adults' : 'adult'}
          </span>
        </div>
        <div className="dates-row">
          <span className="dates-text">Check-in:</span>
          <span className="dates-value">{formatSingleDate(checkInDate)}</span>
        </div>
        <div className="dates-row">
          <span className="dates-text">Check-out:</span>
          <span className="dates-value">{formatSingleDate(checkOutDate)}</span>
        </div>
      </div>
      <div className="booking-quote-fee-container">
        <div className="fee-row">
          <span className="fee-text">
            {numberToLocaleString(currentQuote.pricePerNight, currency)} {currency} &times; {duration} nights
          </span>
          <div className="fee-currency">
            <span className="fee-currency-price">{numberToLocaleString(currentQuote.priceTotalNights, currency)}</span>
            <span className="fee-currency-type">{currency}</span>
          </div>
        </div>
        <div className="fee-row">
          <div className="fee-text">Security Deposit</div>
          <div className="fee-currency">
            <span className="fee-currency-price">{numberToLocaleString(currentQuote.securityDeposit, currency)}</span>
            <span className="fee-currency-type">{currency}{currentQuote.currency === Currency.USD && '*'}</span>
          </div>
        </div>
        <div className="fee-row">
          <div className="fee-text">Transaction Fee</div>
          <div className="fee-currency">
            <span className="fee-currency-price">{numberToLocaleString(currentQuote.transactionFee, currency) || '0'}</span>
            <span className="fee-currency-type">{currency}</span>
          </div>
        </div>
        <div className="booking-quote-total-container">
          <h1 className="total-price-text">Total</h1>
          <div className="total-price-value">
            <span className="total-price-amount">{numberToLocaleString(currentQuote.guestTotalAmount, currency)}</span>
            <span className="total-price-currency">{currency}</span>
          </div>
        </div>
        {currentQuote.currency !== Currency.USD && (
          <div className="booking-quote-total-usd">
            <span className="total-usd-amount">{numberToLocaleString(currentQuote.guestTotalAmountUsd)}</span>
            <span className="total-usd-text">USD</span>
          </div>
        )}

        {currentQuote.currency === Currency.USD &&
         <p className="disclaimer">
           * Security Deposit is not charged but we reserve the right to charge if any damages occur.
         </p>
        }
      </div>
    </BookingQuoteContainer>
  );
};

export default BookingQuote;

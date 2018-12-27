import * as React from 'react';
import differenceInDays from 'date-fns/difference_in_days';

import { Booking, Currency, PriceQuote } from 'networking/bookings';

import BookingQuoteContainer from './BookingQuote.container';
import { formatSingleDate } from 'utils/formatDate';
import { numberToLocaleString } from 'utils/numberToLocaleString';

interface Props {
  booking: Booking;
  currency: Currency;
}

const BookingQuote = ({ booking, currency }: Props) => {
  const { checkInDate, checkOutDate, host, priceQuotes, numberOfGuests } = booking;
  const currentQuote: PriceQuote | undefined = priceQuotes.find((quote: PriceQuote) => quote.currency === currency);
  if (!currentQuote) {
    return <div>Quote does not exist</div>;
  }
  const duration = differenceInDays(checkOutDate, checkInDate);
  return (
    <BookingQuoteContainer>
      <div className="booking-quote-title-container">
        <h3 className="title">Trip Details</h3>
        <h4 className="duration">
          {duration} Nights at&nbsp;
          <span>
            {host.firstName}
            's
          </span>
          &nbsp;Home
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
            <span className="fee-currency-type">{currency}</span>
          </div>
        </div>
        <div className="fee-row">
          <div className="fee-text">Transaction Fee</div>
          <div className="fee-currency">
            <span className="fee-currency-price">{numberToLocaleString(currentQuote.transactionFee, currency)}</span>
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
      </div>
    </BookingQuoteContainer>
  );
};

export default BookingQuote;

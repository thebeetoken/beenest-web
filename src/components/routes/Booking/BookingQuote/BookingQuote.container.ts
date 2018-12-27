import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const BookingQuoteContainer = styled.div`
  box-sizing: border-box;
  box-shadow: 0 4px 15px ${color('black', 0.1)};
  padding: 24px 24px 32px 24px;
  height: 100%;
  width: 100%;
  .booking-quote-title-container {
    .title {
      ${typography('title', 3)}
      color: ${color('body')};
      padding-bottom: 6px;
    }
    .duration {
      ${typography('title', 8)}
      color: ${color('core')};
      span {
        text-transform: capitalize;
      }
    }
  }

  .booking-quote-dates-container {
    margin: 22px 0;
    padding: 8px 0;
    border-top: 2px solid ${color('core', .20)};
    border-bottom: 2px solid ${color('core', .20)};

    .dates-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      .dates-text {
        ${typography('title', 8)}
        color: ${color('core')};
      }
      .dates-value {
        ${typography('emp', 5)}
        color: ${color('secondary')};
      }
    }

  }

  .booking-quote-fee-container {
    .fee-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 4px;
      .fee-text {
        ${typography('title', 8)}
        color: ${color('core')};
      }
      .fee-currency {
        .fee-currency-price {
          ${typography('emp', 5)}
          color: ${color('body')};
          padding-right: 4px;
        }
        .fee-currency-type {
          ${typography('caption', 2)}
          color: ${color('body')};
        }
      }
    }
  }

  .booking-quote-total-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    .total-price-text {
      ${typography('emp', 3)}
    }
    .total-price-value {
      .total-price-amount {
        ${typography('emp', 3)}
        padding-right: 4px;
      }
      .total-price-currency {
        ${typography('caption', 1)}
      }
    }
  }

  .booking-quote-total-usd {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: ${color('secondary')};
    .total-usd-amount {
      ${typography('emp', 5)}
      padding-right: 10px;
    }
    .total-usd-text {
      ${typography('caption', 3)}
    }
  }
`;

export default BookingQuoteContainer;

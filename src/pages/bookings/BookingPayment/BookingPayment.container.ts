import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const BookingPaymentContainer = styled.div`
  .booking-payment-mobile-body {
    box-sizing: border-box;
    padding: 0 24px 24px;
  }

  .booking-payment-footer-container {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80px;
    width: 100vw;
  }
  .booking-payment-desktop-body {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 978px;
    .booking-payment-terms {
      max-width: 520px;
    }
    .booking-payment-quote-container {
      height: 440px;
      width: 352px;
      min-width: 352px;
    }
  }
  .booking-payment-button-container {
    align-items: center;
    display: flex;
    padding-top: 50px;
    padding-bottom: 52px;
    .back-button {
      margin-right: 40px;
    }
  }

  .terms-conditions-body {
    .policies {
      ${typography('title', 7)}
      color: ${color('body')};
      padding-bottom: 16px;
      @media (min-width: 768px) {
        ${typography('emp', 5)}
        color: ${color('core')};
        padding-bottom: 8px;
      }
    }
    .house-rules {
      li {
        ${typography('emp', 7)}
        @media (min-width: 768px) {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
        }
      }
      p {
        ${typography('read', 3)}
        font-weight: 400;
        padding-bottom: 32px;
        @media (min-width: 768px) {
          ${typography('read', 1)}          
        }
      }
    }
    .conditions {
      h2 {
        ${typography('emp', 7)}
        color: ${color('body')};
        text-transform: uppercase;
        @media (min-width: 768px) {
          ${typography('emp', 5)}
          color: ${color('core')};
          padding-bottom: 8px;
        }
      }
      p {
        ${typography('read', 3)}
        padding-bottom: 32px;
        font-weight: 400;
        @media (min-width: 768px) {
          ${typography('read', 1)}
        }
      }
    }
  }
  
  .terms-and-links-container {
    a {
      ${typography('emp', 7)}
      color: ${color('body')};
      text-transform: uppercase;
      @media (min-width: 768px) {
        ${typography('emp', 5)}
        color: ${color('core')};
        padding-bottom: 8px;
      }
    }
    p {
      ${typography('read', 3)}
      padding-bottom: 8px;
      font-weight: 400;
      @media (min-width: 768px) {
        ${typography('read', 1)}
        padding-bottom: 16px;
      }
    }
  }
`;

export default BookingPaymentContainer;

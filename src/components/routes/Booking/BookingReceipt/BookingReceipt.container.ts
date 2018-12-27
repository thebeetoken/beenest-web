import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const BookingReceiptContainer = styled.div`

  .booking-receipt-wrapper {
    max-width: 978px;
    margin: 0 auto;
  }

  .booking-receipt-body {
    box-sizing: border-box;
    padding: 0 24px 24px;
    @media (min-width: 768px) {
      max-width: 520px;
      height: 100vh;
      padding: 0 0;
    }

    .confirmation-container {  
      padding-bottom: 24px;
      h2 {
        ${typography('title', 7)}
        color: ${color('body')};
        padding-bottom: 16px;
        @media (min-width: 768px) {
          ${typography('title', 4)}
          color: ${color('secondary')};
        }
      }
      .disclaimer {
        ${typography('caption', 2)}
        color: ${color('core')};
        font-weight: 300;
        @media (min-width: 768px) {
          ${typography('caption', 1)}
          color: ${color('body')};
        }
      }

      .usd-confirmation-container {
        padding-bottom: 24px;
        h3 {
          ${typography('emp', 5)}
        }
        span {
          ${typography('title', 7)}
        }
      }

      .crypto-confirmation-container {
        
        @media (min-width: 768px) {
          padding-bottom: 32px;
        }
      }

    }

    .total-paid-container {
      height: 48px;
      margin-bottom: 8px; 
      @media (min-width: 768px) {
        display: flex;
        align-items: center;
        height: 24px;
      }
      
      h2 {
        ${typography('emp', 7)}
        @media (min-width: 768px) {
          padding-right: 8px;
        }
      }
      span {
        ${typography('emp', 6)}
        color: ${color('secondary')};
        overflow-wrap: break-word;
        @media (min-width: 768px) {
          color: #37474F;
        }
      }
    }

    .payment-option-container {
      height: 56px;
      margin-bottom: 24px; 
      @media (min-width: 768px) {
        display: flex;
        align-items: center;
        padding-bottom: 40px;
      }
      
      h2 {
        ${typography('emp', 7)}
        @media (min-width: 768px) {
          padding-right: 8px;
        }
      }
      span {
        ${typography('emp', 6)}
        color: ${color('secondary')};
        overflow-wrap: break-word;
        @media (min-width: 768px) {
          color: #37474F;
        }
      }
    }

    .transaction-container {
      height: 110px;
      width: 100%;
      background-color: ${color('middle')};
      box-sizing: border-box;
      padding: 16px 20px;
      h3 {
        ${typography('emp', 7)}
        color: ${color('core')};
      }
      h4 {
        ${typography('read', 2)}
        overflow-wrap: break-word;
      }
      a {
        ${typography('read', 3)}
        color: ${color('body')};
        font-weight: 300;
        text-decoration: underline;
      }
      @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 102px;
        background-color: ${color('white')};
        padding: 0 0;
      }
    }

    .booking-receipt-bar-container {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 80px;
      width: 100vw;
      box-shadow: 0 0 20px ${color('black', 0.1)};
    }
    
  }
`;

export default BookingReceiptContainer;

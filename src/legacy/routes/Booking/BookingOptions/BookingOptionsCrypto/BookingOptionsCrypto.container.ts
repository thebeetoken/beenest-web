import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const BookingOptionsCryptoContainer = styled.div`
  max-width: 600px;

  .mobile-wallet-note {
    padding-bottom: 24px;
    p {
      ${typography('read', 3)};
    }
  }

  .crypto-container {
    .crypto-currency {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      /* height: 64px; */
      padding-bottom: 16px;
      @media (min-width: 768px) {
        /* height: 60px; */
        padding-bottom: 24px;
      }
      h3 {
        ${typography('emp', 7)};
        color: ${color('core')};
      }
      span {
        color: ${color('secondary')};
        @media (min-width: 768px) {
          color: ${color('core')};
        }
      }
    }

    .crypto-address {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 56px;
      padding-bottom: 16px;
      word-break: break-word;
      @media (min-width: 768px) {
        padding-bottom: 24px;
      }

      h3 {
        ${typography('emp', 7)};
        color: ${color('core')};
      }
      span {
        color: ${color('secondary')};
        @media (min-width: 768px) {
          color: ${color('core')};
        }
      }
    }
  }

  .booking-options-crypto-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80px;
    width: 100vw;
  }

  .booking-options-disclaimer {
    word-break: break-word;
    p {
      ${typography('caption', 1)};
      color: ${color('core')};
      span {
        font-weight: 500;
      }
    }
  }

  .booking-options-error {
    margin-bottom: 8px;
    word-break: break-word;
    p {
      ${typography('caption', 1)};
      color: ${color('error')};
      font-weight: 500;
    }
  }

  .crypto-button-container {
    display: flex;
    align-items: center;
    padding-top: 100px;
    .back-button {
      margin-right: 40px;
    }
  }
`;

export default BookingOptionsCryptoContainer;

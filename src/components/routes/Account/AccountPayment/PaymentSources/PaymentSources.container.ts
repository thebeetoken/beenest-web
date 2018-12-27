import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const PaymentSourcesContainerMobile = styled.div`

  section {
    margin-top: 16px;
    h1 {
      ${typography('emp', 7)};
      color: ${color('core')};
      margin-bottom: 8px;
    }
    .payment-sources-list {
      width: 100%;
    }
    .payment-sources--row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      width: 100%;
      .info {
        align-items: center;
        display: flex;
        h2 {
          ${typography('caption', 1)};
          color: ${color('upper')};
          text-transform: uppercase;
        }
        h2 + h2 {
          text-transform: none;
        }
      }
    }
    .payment-actions {
      align-items: center;
      display: flex;
      justify-content: center;
      .payment-actions--divider {
        background-color: ${color('middle')};
        height: 32px;
        margin: 0 8.5px;
        width: 1px;
      }
      .payment-action {
        align-items: center;
        color: ${color('secondary')};
        cursor: pointer;
        display: flex;
        height: 32px;
        justify-content: center;
        transition: all .15s ease-in-out;
        width: 32px;
        &:hover {
          opacity: 0.5;
        }
        .bee-svg {
          height: 24px;
          width: 24px;
        }
      }
    }
  }
  .hide {
    opacity: 0;
    pointer-events: none;
  }
`;

const PaymentSourcesContainerTablet = styled(PaymentSourcesContainerMobile)`
  @media (min-width: 768px) {
    section {
      .payment-sources-list {
        width: 504px;
      }
    }
  }
`;

const PaymentSourcesContainer = styled(PaymentSourcesContainerTablet)`
  @media (min-width: 1025px) { }
`;

export default PaymentSourcesContainer;

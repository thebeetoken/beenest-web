import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const BuyNowReceiptContainerMobile = styled.div`
  color: ${color('body')};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px;
  width: 100vw;


  header {
    width: 100%:
    height: 48px;
    h2 {
      ${typography('title', 6)};
    }
  }
  h3 {
    ${typography('title', 7)};
    margin: 20px 0 16px;
  }
  p {
    ${typography('caption', 2)};
  }
  dl {
    height: 48px;
    dt {
      ${typography('emp', 7)};
      height: 16px;
    }
    dd {
      ${typography('read', 1)};
      color: ${color('secondary')};
      height: 32px;
      margin: 0;
    }
  }
  .transaction-container {
    background-color: ${color('light')};
    height: 78px;
    padding: 12px 20px 12px;
    width: 100%;
    dd {
      color: ${color('body')}
      width: 100%;
      word-break: break-all;
    }
  }
  footer {
    align-items: center;
    display: flex;
    justify-content: space-between;
    height: 72px;
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

const BuyNowReceiptContainerTablet = styled(BuyNowReceiptContainerMobile)`
  @media (min-width: 768px) {
    header {
      h2 {
        ${typography('title', 3)};
      }
    }
    h3 {
      ${typography('title', 6)};
      color: ${color('secondary')};
    }
    .transaction-container {
      width: 394px;
    }
    .buy-now-receipt--wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 44px;
      height: 763px;
      footer {
        position: static;
      }
    }
  }
`;

const BuyNowReceiptContainer = styled(BuyNowReceiptContainerTablet)`
  @media (min-width: 1025px) {
    width: 1008px;
    margin: 0 auto;
  }
`;

export default BuyNowReceiptContainer;

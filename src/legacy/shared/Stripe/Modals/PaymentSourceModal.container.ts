import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const PaymentSourceModalContainerMobile = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;


  .payment-source-modal-content {
    background-color: #fff;
    box-sizing: border-box;
    max-height: 100vh;
    min-height: 100vh;
    padding: 24px;
    position: relative;
    width: 100vw;
    h1 {
      ${typography('welter', 2)};
      color: ${color('core')};
      margin-bottom: 24px;
    }
    p {
      ${typography('welter', 5)};
      color: ${color('body')};
      min-height: 24px;
      margin-bottom: 8px;
    }
    h5 {
      ${typography('emp', 6)};
      color: ${color('body')};
      min-height: 24px;
      margin-bottom: 40px;
    }
    .bottom {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 0 24px;
      height: 120px;
    }
  }
  .bee-close-button {
    align-items: center;
    color: ${color('upper')};
    cursor: pointer;
    display: flex;
    height: 72px;
    justify-content: center;
    opacity: 1;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s ease-in-out;
    width: 72px;
    z-index: 1;
    @media (min-width: 1025px) {
      &:hover {
        opacity: 0.5;
      }
    }
    .bee-svg {
      color: ${color('upper')};
      height: 24px;
      width: 24px;
    }
  }
  .delete-actions {
    margin-top: 32px;
  }
  .submit {
    width: 55%;
    min-width: 164px;
  }
  .cancel {
    width: 33.3%;
    min-width: 92px;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PaymentSourceModalContainerTablet = styled(PaymentSourceModalContainerMobile)`
  @media (min-width: 768px) {
    .payment-source-modal-content {
      max-height: 546px;
      min-height: 330px;
      padding: 40px;
      width: 552px;
      .bottom {
        height: 98px;
        padding: 0;
        position: static;
        margin-top: 48px;
      }
    }
    .submit {
      width: 300px;
    }
    .cancel {
      width: 152px;
    }
  };
`;

const PaymentSourceModalContainer = styled(PaymentSourceModalContainerTablet)`
  @media (min-width: 1025px) { };
`;

export default PaymentSourceModalContainer;

import styled from 'styled-components';
import { color } from 'styled/utils';

const PaymentSourceFormContainerMobile = styled.div`
  h4 {
    margin: 24px 0;
  }
  .payment-source-form-container {
    background-color: ${color('white')};
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: space-between;
  }
  .payment-source-form {
    display: flex;
    min-height: 40px;
    width: 100%;
    &.create-input {
      height: 48px;
      margin-bottom: 24px;
    }
    &.column {
      align-items: space-between;
      flex-direction: column;
      justify-content: center;
    }
    &.row {
      align-items: center;
      justify-content: space-between;

      .city-field {
        width: 192px;
      }
      .state-field {
        width: 115px;
        input {
          text-transform: uppercase;
        }
        .bee-input-wrapper {
          width: 95px;
        }
      }
      .zip-field {
        width: 120px;
      }
    }
    &.card-elements {
      flex-direction: column;
    }
    .split-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .exp-container {
      height: 56px;
      width: 80px;
    }
    .exp-input-container {
      display: flex;
      height: 56px;
      width: 100%;
      .select-container {
        height: 48px;
        margin-right: 16px;
        position: relative;
        select {
          background-color:transparent;
          background-image:none;
          border: none;
          border-bottom: 1px solid ${color('black')};
          border-radius: 0;
          box-shadow: none;
          cursor: pointer;
          height: 100%;
          outline: none;
          width: 56px;
          -moz-box-shadow: none;
          -webkit-appearance: none;
          -webkit-border-radius: 0px;
          -webkit-box-shadow: none;
        }
        .bee-svg {
          bottom: 0;
          height: 24px;
          pointer-events: none;
          position: absolute;
          right: 0;
          top: 12px;
          width: 24px;
        }
      }
    }
    .column {
      height: auto;
      min-height: 40px;
    }
    .bee-input-wrapper {
      min-height: 40px;
    }
    input {
      height: 40px;
      width: 100%;
    }
    .stripe-input-container {
      height: 66px;
    }
    .address-field {
      width: 472px;
    }
    .number-field {
      width: 100%;
    }
    .expiry-field {
      width: 78px;
    }
    .cvc-field {
      width: 52px;
    }
    .stripe-input {
      align-items: center;
      border-bottom: 1px solid ${color('body')};
      caret-color: ${color('body')};
      color: currentColor;
      cursor: inherit;
      display: flex;
      font: inherit;
      height: 40px;
      letter-spacing: inherit;
      line-height: inherit;
      outline: none;
      text-align: left;
      transition: all 0.2s ease-in-out;
      width: 100%;
      .__PrivateStripeElement {
        width: 100%;
      }
      &.full {
        height: 40px;
        min-height: 40px;
        width: 100%;
      }
    }
    span {
      margin-top: 5px;
    }
  }
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
  }
`;

const PaymentSourceFormContainerTablet = styled(PaymentSourceFormContainerMobile)`
  @media(min-width: 768px) {
    .payment-source-form {
      margin-bottom: 0;
      max-height: 74px;
      min-height: 48px;
      &.card-elements {
        flex-direction: row;
        justify-content: space-between;
      }
      .split-container {
        height: 74px;
        max-height: 74px;
        width: 171px;
      }
      .column,
      .bee-input-wrapper {
        min-height: 48px;
      }
      input {
        height: 48px;
        width: 100%;
      }
      .stripe-input-container {
        height: 48px;
        margin-bottom: 24px;
      }
      .number-field {
        width: 260px;
      }
      .stripe-input {
        height: 48px;
        &.full {
          height: 48px;
          min-height: 48px;
          width: 472px;
        }
      }
    }
  }
`;

const PaymentSourceFormContainer = styled(PaymentSourceFormContainerTablet)`
  @media(min-width: 1025px) { }
`;

export default PaymentSourceFormContainer;

import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const HostPaymentsContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 624px;


  .host-payments-wallet-container,
  .host-payments-stripe-container {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    width: inherit;
    .host-payments-wallet-container--input,
    .host-payments-stripe-container--meta {
      width: 416px;
    }
    button {
      width: 164px;
    }
  }


  .host-payments-wallet-container {
    margin-bottom: 8px;
    .bee-error-message {
      height: 32px;
    }
    button {
      margin-bottom: 32px;
      width: 182px;
    }
  }
  .host-payments-stripe-container {
    .host-payments-stripe-container--meta {
      display: flex;
      flex-direction: column;
      p {
        ${typography('read', 1)}
        align-items: center;
        color: ${color('upper')};
        display: flex;
        height: 40px;
      }
    }
    a {
      width: 182px;
      button {
        width: 100%;
      }
    }
  }
`

export default HostPaymentsContainer;

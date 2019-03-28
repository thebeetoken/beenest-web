import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const HostPaymentsContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 624px;

  .host-payments-section-container {
    justify-content: space-between;
    width: inherit;
    margin-bottom: 8px;

    .host-payments-section-container--input {
      max-width: 416px;
    }
    p {
      margin-top: 8px;
      ${typography('read', 1)}
      align-items: center;
      color: ${color('upper')};
      display: flex;
    }
    .bee-error-message {
      height: 32px;
    }
  }

  .host-payments-section-container--submit {
    button {
      margin-bottom: 32px;
      width: 182px;
    }
  }

  .host-payments-section-container--links {
    margin-bottom: 32px;
    button {
      width: auto;
    }
    p {
      ${typography('read', 3)};
      color: ${color('top')};
      display: block;
      margin-bottom: 18px;
      a {
        color: ${color('secondary')};
      }
    }
  }
`

export default HostPaymentsContainer;

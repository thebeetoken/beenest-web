import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const HostPaymentsContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 624px;

  .host-payments-section-container {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    width: inherit;
    margin-bottom: 8px;

    .host-payments-section-container--input {
      width: 416px;
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
    button {
      margin-bottom: 32px;
      width: 182px;
    }
  }
`

export default HostPaymentsContainer;

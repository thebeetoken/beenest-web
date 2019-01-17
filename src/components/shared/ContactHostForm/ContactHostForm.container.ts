import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ContactHostFormCardContainer = styled.div`
  padding: 40px;
  height: 100%;
  width: 100%;


  form {
    display: flex;
    flex-direction: column;
    .bee--input-label {
      ${typography('emp', 7)}
      color: ${color('core')};
      margin-bottom: 8px;
    }
    h2 {
      ${typography('title', 3)}
      color: ${color('core')};
      margin-bottom: 32px;
      text-transform: capitalize;
    }
    .form-item {
      margin-bottom: 12px;
    }
    .bee-button {
      align-self: flex-end;
      width: 200px;
    }
  }


  .bee-close-button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
`;

export default ContactHostFormCardContainer;

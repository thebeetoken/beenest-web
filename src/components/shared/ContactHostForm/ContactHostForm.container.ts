import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ContactHostFormContainerMobile = styled.div`
  height: 100%;
  width: 100%;
  .bee-card {
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      .bee--input-label {
        ${typography('emp', 7)}
        color: ${color('core')};
        margin-bottom: 8px;
      }
      h2 {
        ${typography('title', 7)}
        color: ${color('body')};
        margin-bottom: 20px;
        text-transform: capitalize;
      }
      .form-item {
        margin-bottom: 12px;
      }
      .bee-button {
        width: 100%;
      }
    }


    .bee-close-button {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
    }
  }
`;

const ContactHostFormContainerTablet = styled(ContactHostFormContainerMobile)`
  @media (min-width: 1025px) {
    .bee-card {
      height: 570px;
      width: 800px;
      form {
        h2 {
          ${typography('title', 3)}
          color: ${color('core')};
          margin-bottom: 32px;
        }
        .bee-button {
          align-self: flex-end;
          width: 200px;
        }
      }
    }
  }
`;

export default ContactHostFormContainerTablet;

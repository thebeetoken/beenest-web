import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ContactHostFormCardContainer = styled.div`
  background-color: ${color('white')};
  box-shadow: 0 0 25px ${color('black', 0.1)};
  height: 570px;
  padding: 40px;
  position: relative;
  width: 584px;


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
      margin-bottom: 24px;
      text-transform: capitalize;
    }
    .form-item {
      margin-bottom: 8px;
    }
    .bee-button {
      align-self: flex-end;
      width: 200px;
    }
  }


  .close {
    cursor: pointer;
    height: 24px;
    opacity: 1;
    position: absolute;
    right: 24px;
    top: 24px;
    transition: opacity 0.2s ease-in-out;
    width: 24px;
    z-index: 1;
    &:hover {
      opacity: 0.5;
    }
    .bee-svg {
      color: ${color('middle')};
    }
  }
`;

export default ContactHostFormCardContainer;

import styled from 'styled-components';
import { color } from 'styled/utils';

const ContactHostFormCardContainer = styled.div`
  background-color: ${color('white')};
  box-shadow: 0 0 25px ${color('black', 0.1)};
  display: flex;
  flex-direction: column;
  height: 256px;
  padding: 24px 24px 32px;
  position: relative;
  width: 584px;

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

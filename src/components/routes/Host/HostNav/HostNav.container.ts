import styled from 'styled-components';
import { color, cover } from 'styled/utils';

const HostNavContainer = styled.nav`
  display: flex;
  height: 64px;
  margin: 16px 0 40px;

  .host-navigation--items {
    height: inherit;
    width: 160px;
    a {
      background-color: ${color('light')};
      display: flex;
      height: inherit;
      justify-content: center;
      position: relative;
      width: inherit;
      align-items: center;
      transition: all 0.2s ease-in-out;
      &:hover:not(.active) {
        opacity: 0.5;
      }
      &.active {
        background-color: transparent;
        color: ${color('white')};
        position: relative;
        z-index: 1;
        &::before {
          ${cover(true)}
          background-color: ${color('secondary')};
          box-shadow: 0 0 10px ${color('black', 0.2)};
          z-index: -1;
        }
      }
    }
  }
`;

export default HostNavContainer;
import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AccountNavContainerMobile = styled.nav`
  height: 64px;
  width: 100%;
  display: flex;


  a {
    align-items: center;
    background-color: ${color('light')};
    color: ${color('secondary')};
    display: flex;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
    height: 64px;
    justify-content: center;
    transition: all .2s ease-in-out;
    &.active {
      background-color: ${color('secondary')};
      box-shadow: 0 2px 10px ${color('black', 0.25)};
      color: ${color('white')};
      position: relative;
      z-index: 1;
    }
    > span {
      ${typography('read', 3)}
      text-align: center;
      word-break: break-word;
    }
    .bee-svg {
      height: 24px;
      width: 24px;
    }
  }



  .verification-needed-container {
    flex-grow: 1;
    height: 100%;
    position: relative;
    .verification-badge {
      ${typography('title', 3)}
      color: ${color('error')};
      position: absolute;
      right: 16px;
      top: -16px;
      z-index: 2;
    }
  }
`;

const AccountNavTablet = styled(AccountNavContainerMobile)`
  @media (min-width: 768px) {
    height: 48px;
    width: 100%;


    /* need to re-add styled here for last tab because it goes through a query
    first so cannot put within the tab nav component */
    a {
      background-color: ${color('light')};
      color: ${color('upper')};
      height: 48px;
      text-align: center;
      transition: all 0.2s ease-in-out;
      width: 132px;
      &:hover:not(.active) {
        opacity: 0.5;
      }
      &.active {
        background-color: ${color('white')};
        box-shadow: 0 2px 10px ${color('black', 0.1)};
        border-radius: 2px;
        color: ${color('secondary')};
        position: relative;
        z-index: 1;
      }
      > span {
        ${typography('title', 7)}
        text-align: center;
        word-break: break-word;
      }
    }
  }
`;

// const AccountNavDesktop = styled(AccountNavTablet)`
//   @media (min-width: 1025px) {
//     width: 528px;
//   }
// `;

export default AccountNavTablet;

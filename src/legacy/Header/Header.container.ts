import styled from 'styled-components';

import { color, typography, HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from 'styled/utils';

const HeaderContainerMobile = styled.header`
  background-color: ${color('white')};
  box-shadow: 0 2px 20px ${color('black', 0.05)};
  left: 0;
  position: fixed;
  top: 0;
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 100;
  &.transparent {
    background-color: transparent;
    box-shadow: none;
    .header-wrapper {
      .header-menu-container {
        &.image {
          .bee-svg {
            color: ${color('white')};
            &.show {
              color: ${color('core')};
            }
          }
        }
        .bee-svg {
          color: ${color('core')};
          &.show {
            color: ${color('white')};
          }
        }
        .bee-svg:not(:first-of-type) {
          color: ${color('white')};
          &.show {
            color: ${color('core')};
          }
        }
      }
    }
  }


  .header-wrapper {
    align-items: center;
    display: flex;
    height: ${MOBILE_HEADER_HEIGHT}px;
    justify-content: space-between;
    position: relative;
    width: 100%;
    &.white {
      background-color: ${color('white')};
    }
    .header-logo {
      color: ${color('style')};
      height: 16px;
      margin-left: 24px;
      width: 90px;
    }
    .header-loading-mobile {
      margin-right: 24px;
    }
    .header-menu-container {
      border-radius: 50%;
      height: 24px;
      margin-right: 16px;
      overflow: hidden;
      position: relative;
      width: 24px;
      .bee-svg,
      .bee-lazy-image {
        bottom: 0;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: all 0.15s ease-in-out;
        &.show {
          opacity: 1;
        }
      }
      .bee-svg {
        color: ${color('core')};
        height: 24px;
        width: 24px;
      }
    }
    .header-menu-mobile {
      background: ${color('white')};
      margin: 0 auto;
      min-height: 100vh;
      padding: 0 24px;
      position: absolute;
      top: 54px;
      width: 100%;
      .bee-list-item {
        height: 56px;
      }
      .bee-list-item:not(:last-of-type) {
        margin-top: 8px;
      }
    }
  }
`;

const HeaderContainerTablet = styled(HeaderContainerMobile)`
  @media (min-width: 768px) {
    &.transparent {
      .header-wrapper {
        .header-navigation--items {
          a {
            color: ${color('white')};
          }
        }
        .bee-button {
          border: 2px solid ${color('white')};
          color: ${color('white')};
        }
      }
    }

    .bee-button {
      border: 2px solid ${color('core')};
      color: ${color('core')};
    }


    .header-wrapper {
      height: ${HEADER_HEIGHT}px;
      padding: 0 16px;
      .header-logo {
        height: 28px;
        margin-left: 0;
        width: 152px;
      }
      .header-navigation--items {
        display: flex;
        height: 100%;
        a {
          ${typography('title', 8)}
          align-items: center;
          color: ${color('core')};
          display: flex;
          justify-content: center;
          padding: 0 24px;
          transition: opacity 0.2s ease-in-out;
        }
        .header-loading {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
        }
        .header-unauthenticated {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }
        .header-authenticated {
          align-items: center;
          display: flex;
          justify-content: space-between;
          width: 238px;
          .header-authenticated--profile {
            align-items: center;
            display: flex;
            position: relative;
            width: 100%;
            &::before {
              background-color: ${color('upper', 0.2)};
              bottom: 0;
              content: '';
              height: 100%;
              left: 0;
              position: absolute;
              top: 0;
              width: 2px;
            }
            a {
              flex-shrink: 0;
              padding: 0;
              .bee-lazy-image {
                border-radius: 50%;
                height: 48px;
                width: 48px;
              }
            }
            a:first-of-type{
              height: 48px;
              margin: 0 16px 0 24px;
              width: 48px;
            }
            a + a {
              ${typography('read', 4)}
            }
          }
        }
      }
    }
  }
`;

const HeaderContainer = styled(HeaderContainerTablet)`
  @media (min-width: 1025px) {
    &.transparent {
      .header-wrapper {
        .bee-button {
          &:hover {
            background-color: ${color('white')};
            color: ${color('core')};
          }
        }
      }
    }


    .bee-button {
      &:hover {
        background-color: ${color('core')};
        color: ${color('white')};
      }
    }


    .header-wrapper {
      margin: 0 auto;
      padding: 0 64px;
      .header-navigation--items {
        a {
          &:hover:not(:last-of-type) {
            opacity: 0.5;
          }
        }
      }
    }
  }
`;

export default HeaderContainer;

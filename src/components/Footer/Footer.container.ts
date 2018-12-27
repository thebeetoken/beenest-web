import styled from 'styled-components';
import { color, typography } from 'styled/utils';


const FooterContainerMobile = styled.footer`
  background-color: ${color('light')};
  height: 128px;
  min-height: 128px;
  padding: 24px;
  

  .footer-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    min-width: 100%;
    width: 100%;
    .footer--top-mobile {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      a {
        ${typography('caption', 2)};
        color: ${color('body')};
      }
    }
    .footer--bottom-mobile {
      h1 {
        ${typography('caption', 3)};
        text-align: center;
        color: ${color('body')};
      }
    }
  }
`;

const FooterContainerTablet = styled(FooterContainerMobile)`
  @media (min-width: 768px) {
    height: 180px;
    min-height: 180px;
    padding: 46px 0 0;

    .footer-wrapper {
      justify-content: center;
      height: 94px;
      min-width: 640px;
      width: 640px;
      .footer--top-links {
        display: flex;
        height: 16px;
        a {
          ${typography('read', 3)};
          color: ${color('body')};
          transition: opacity 0.2s ease-in-out;
        }
        a:nth-of-type(1) {
          margin-right: 40px;
        }
        a:last-of-type {
          ${typography('emp', 7)};
          color: ${color('secondary')};
        }
      }
      .footer--bottom-meta {
        align-items: center;
        display: flex;
        height: 20px;
        margin-top: 8px;
        a {
          ${typography('caption', 2)};
          text-decoration: underline;
          transition: opacity 0.2s ease-in-out;
        }
        a:nth-of-type(1) {
          margin-right: 48px;
        }
      }
      h1 {
        ${typography('caption', 1)};
        color: ${color('core')};
      }
    }


    &.short {
      height: 84px;
      min-height: 84px;
      padding-top: 0;
      .footer-wrapper {
        height: 100%;
      }
    }
  }
`;

const FooterContainerDesktop = styled(FooterContainerTablet)`
  @media (min-width: 1025px) {
    padding: 46px 192px 0;
    .footer-wrapper {
      width: 100%;
      .footer--top-links {
        a {
          &:hover {
            opacity: 0.5;
          }
        }
      }
      .footer--bottom-meta {
        a {
          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
  }
`;

const FooterContainer = styled(FooterContainerDesktop)``;

export default FooterContainer;

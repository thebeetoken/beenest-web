import styled from 'styled-components';

import AuthenticationContainer from '../Authentication.container';

import { color, typography } from 'styled/utils';

const SignUpContainerMobile = styled(AuthenticationContainer)`
  .signup-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    min-height: 100vh;
    position: relative;
    width: 100%;
    .signup-container-header {
      background-color: ${color('white')};
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: inherit;
      padding: 64px 24px 32px;
      width: 100%;
      h1 {
        text-align: center;
      }
      .authentication-divider {
        margin: 16px 0 8px;
      }
      .signup-input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        width: 100%;
        .signup-form-name-wrapper,
        .signup-form-email-container {
          flex-shrink: 0;
          height: 58px;
          span {
            height: 16px;
          }
        }
        .signup-form-name-wrapper {
          display: flex;
          justify-content: space-between;
          .signup-form-name-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 46%;
          }
        }
        .signup-form-email-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .signup-form-password-container {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          justify-content: space-between;
          height: 74px;
          position: relative;
          span {
            height: 32px;
          }
          span + span {
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
          }
        }
      }
      .signup-form {
        margin: 8px 0 16px;
      }
      p {
        ${typography('caption', 3)}
        color: ${color('core')};
        text-align: center;
      }
      a:first-of-type {
        margin-right: 4px;
      }
      a {
        margin-left: 4px;
        text-decoration: underline;
      }
      .signup-container-footer-mobile {
        align-items: center;
        display: flex;
        justify-content: center;
        p {
          ${typography('caption', 1)}
          color: ${color('body')};
        }
        a {
          ${typography('caption', 1)}
          color: ${color('secondary')};
        }
      }
      .signup-loading {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        margin-bottom: 24px;
        width: 100%;
      }
    }
  }
`;

const SignUpContainerTablet = styled(SignUpContainerMobile)`
  @media (min-width: 768px) {
    .signup-container {
      height: 604px;
      min-height: 578px;
      width: 384px;
      .signup-container-header {
        box-shadow: 0 0 20px ${color('black', 0.25)};
        height: 514px;
        min-height: auto;
        padding: 55px 32px 32px;
        p {
          ${typography('caption', 3)}
          color: ${color('body')};
        }
      }
    }
  }
`;

const SignUpContainer = styled(SignUpContainerTablet)`
  @media (min-width: 1025px) {
    .signup-container {
      .signup-container-header {
        p {
          a {
            transition: opacity 0.2s ease-in-out;
            &:hover {
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
`;

export default SignUpContainer;

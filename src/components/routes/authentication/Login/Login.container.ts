import styled from 'styled-components';

import AuthenticationContainer from '../Authentication.container';

import { color, typography } from 'styled/utils';



const LoginContainerMobile = styled(AuthenticationContainer)`
  width: 100%;


  .login-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    min-height: 100%;
    position: relative;
    width: 100%;
    .login-container-header {
      background-color: ${color('white')};
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 96px 24px 80px;
      width: 100%;
      .login-signup-container {
        ${typography('caption', 2)}
        margin-top: 6px;
        p {
          color: ${color('body')};
          a {
            color: ${color('secondary')};
            margin-left: 4px;
            text-decoration: underline;
          }
        }
      }
      .login-input-container {
        display: flex;
        flex-direction: column;
        height: 130px;
        margin-top: 16px;
        width: 100%;
        .bee-input-wrapper + .bee-input-wrapper {
          margin-top: 16px;
        }
        span {
          height: 32px;
        }
      }
      .login-cta-container {
        display: flex;
        flex-direction: column;
        height: 130px;
        margin-top: 14px;
      }
      .authentication-divider {
        margin: 16px 0;
      }
      a {
        margin-top: 24px;
        text-align: center;
        span {
          ${typography('caption', 2)}
          text-decoration: underline;
        }
      }
    }
  }
`;

const LoginContainerTablet = styled(LoginContainerMobile)`
  @media (min-width: 768px) {
    .login-container {
        height: 500px;
        min-height: 500px;
        width: 384px;
      .login-container-header {
        box-shadow: 0 0 20px ${color('black', 0.25)};
        height: 420px;
        padding: 32px;
      }
    }
  }
`;

const LoginContainerDesktop = styled(LoginContainerTablet)`
  @media (min-width: 1025px) {
    .login-container {
      .login-container-header {
        a {
          span {
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

const LoginContainer = styled(LoginContainerDesktop)``;

export default LoginContainer;

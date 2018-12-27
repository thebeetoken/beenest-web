import styled from 'styled-components';

import AuthenticationContainer from '../Authentication.container';

import { color, typography } from 'styled/utils';

const ForgotPasswordContainerMobile = styled(AuthenticationContainer)`
  .forgot-password-container {
    background-color: ${color('white')};
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    padding: 0 24px;
    position: relative;
    width: 100%;
    h2 {
      ${typography('read', 3)}
      margin-top: 8px;
    }
    .forgot-password-form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 16px;
      width: 100%;
      .forgot-password-input-container {
        span {
          height: 32px;
        }
      }
    }
  }
`;

const ForgotPasswordContainerTablet = styled(ForgotPasswordContainerMobile)`
  @media (min-width: 768px) {
    .forgot-password-container {
      box-shadow: 0 0 20px ${color('black', 0.25)};
      height: 266px;
      min-height: 266px;
      padding: 32px;
      width: 384px;
      .forgot-password-form {
        height: 100%;
      }
    }
  }
`;

const ForgotPasswordContainerDesktop = styled(ForgotPasswordContainerTablet)``

const ForgotPasswordContainer = styled(ForgotPasswordContainerDesktop)``;

export default ForgotPasswordContainer;

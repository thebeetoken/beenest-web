import styled from 'styled-components';

import AuthenticationContainer from '../Authentication.container';

import { color, typography } from 'styled/utils';

const ForgotPasswordConfirmationContainerMobile = styled(AuthenticationContainer)`
  .forgot-password-confirmation-container {
    background-color: ${color('white')};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 24px;
    position: relative;
    width: 100%;
    h1 {
      margin-bottom: 8px;
    }
    p {
      ${typography('caption', 1)}
      margin-bottom: 58px;
    }
  }
`;

const ForgotPasswordConfirmationContainerTablet = styled(ForgotPasswordConfirmationContainerMobile)`
  @media (min-width: 768px) {
    .forgot-password-confirmation-container {
      box-shadow: 0 0 20px ${color('black', 0.25)};
      height: 264px;
      padding: 32px;
      width: 384px;
      p {
        ${typography('caption', 1)}
        margin-bottom: 32px;
      }
    }
  }
`;

const ForgotPasswordConfirmationContainerDesktop = styled(ForgotPasswordConfirmationContainerTablet)``;

const ForgotPasswordConfirmationContainer = styled(ForgotPasswordConfirmationContainerDesktop)``;

export default ForgotPasswordConfirmationContainer;

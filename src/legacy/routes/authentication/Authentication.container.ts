import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AuthenticationContainerMobile = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  .authentication-background-overlay {
    z-index: 0;
  }
  .authentication-container-footer {
    align-items: center;
    background-color: ${color('white')};
    box-shadow: 0 0 20px ${color('black', 0.25)};
    display: flex;
    flex-shrink: 0;
    height: 64px;
    justify-content: center;
    width: 100%;
    p,
    a {
      ${typography('read', 3)}
    }
    p {
      color: ${color('body')};
      a {
        color: ${color('secondary')};
        margin-left: 4px;
        text-decoration: underline;
      }
    }
  }
  .authentication-divider {
    align-items: center;
    display: flex;
    width: 100%;
    span {
      ${typography('emp', 8)}
      padding: 0 4px;
    }
  }
  button {
    width: 100%;
  }
  h1 {
    ${typography('title', 5)}
    color: ${color('body')};
  }
  .close {
      align-items: center;
      display: flex;
      height: 56px;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 0;
      width: 56px;
      svg {
        color: ${color('dark')};
        height: 24px;
        width: 24px;
      }
    }
`;

const AuthenticationContainerTablet = styled(AuthenticationContainerMobile)`
  @media (min-width: 768px) {
    min-height: 100vh;
    .auth-background {
      background: url('https://static.beenest.com/images/app/misc/painted-ladies.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      width: 100%;
    }
    h1 {
      ${typography('title', 6)}
    }
  }
`;

const AuthenticationContainerDesktop = styled(AuthenticationContainerTablet)`
  @media (min-width: 1025px) {
    .authentication-container-footer {
      a {
        transition: opacity 0.2s ease-in-out;
        &:hover {
          opacity: 0.5;
        }
      }
    }
    .close {
      transition: opacity 0.2s ease-in-out;
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;

const AuthenticationContainer = styled(AuthenticationContainerDesktop)``;

export default AuthenticationContainer;

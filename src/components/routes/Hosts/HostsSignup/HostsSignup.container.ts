import styled from 'styled-components';

import SignUpContainer from '../../authentication/SignUp/SignUp.container';

import { color, typography } from 'styled/utils';

const HostsSignupContainerMobile = styled(SignUpContainer)`
  .signup-container {
    .signup-container-header {
      height: 100%;
      h1 {
        ${typography('title', 7)}
      }
      .signup-input-container {
        margin-bottom: 24px;
        .signup-form-number-of-properties-container,
        .signup-form-properties-listed-container {
          h2 {
            ${typography('read', 2)}
            margin-bottom: 8px;
          }
        }
        .signup-form-properties-listed-container {
          margin-top: 8px;
        }
      }

      .signup-container-footer-mobile {
        margin-top: 24px;
      }
    }
  }

  .hosts-signup-radio-group {
    display: flex;
    flex-direction: column;
    .hosts-signup-radio-container {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      span {
        ${typography('read', 2)}
        margin-left: 4px;
      }
    }
  }

  .authentication-container-footer {
    p {
      a {
        color: ${color('upper')};
      }
    }
  }
`;

const HostsSignupContainerTablet = styled(HostsSignupContainerMobile)`
  @media (min-width: 768px) {
    .signup-container {
      height: auto;
      .signup-container-header {
        margin-bottom: 24px;
        h1 {
          ${typography('title', 6)}
        }
        .signup-input-container {
          .signup-form-number-of-properties-container,
          .signup-form-properties-listed-container {
            h2 {
              ${typography('title', 8)}
            }
          }
        }
      }
    }
  }
`;

const HostsSignupContainer = styled(HostsSignupContainerTablet)`
  @media (min-width: 1025px) { }
`;

export default HostsSignupContainer;

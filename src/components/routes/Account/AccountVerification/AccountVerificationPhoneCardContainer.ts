import styled from 'styled-components';

import { color, typography } from 'styled/utils';

const AccountVerificationPhoneCardContainerMobile = styled.section`
  background-color: ${color('white')};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  padding: 56px 24px 40px;
  position: relative;
  width: 100%;
  h1 {
    ${typography('title', 4)}
    color: ${color('core')};
    margin-bottom: 24px;
  }


  .close {
    position: absolute;
    right: 0;
    top: 0;
  }


  .phone-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    .phone-area-code-container {
      display: flex;
      flex-direction: column;
      select {
        width: 48px;
      }
    }
    .bee-select-box-wrapper,
    .bee-input-wrapper {
      height: 32px;
    }
    .bee-input-wrapper {
      margin-top: 8px;
    }
  }


  .bee-error-message {
    ${typography('caption', 2)}
    min-height: 32px;
    margin: 8px 0;
    width: calc(100% - 12px);
  }

  
  .verification-code-container {
    cursor: not-allowed;
    height: 96px;
    opacity: 0.5;
    pointer-events: none;
    &.show {
      cursor: default;
      opacity: 1;
      pointer-events: auto;
    }
    .verification-code-container-top {
      align-items: flex-end;
      display: flex;
      justify-content: space-between;
      .verification-code-input-container {
        display: flex;
        flex-direction: column;
        width: 112px;
      }
      button {
        width: 124px;
      }
    }
    .verification-code-messaging {
      display: flex;
      flex-direction: column;
      margin-top: 8px;
      opacity: 0;
      transition: all 0.2s ease-in-out;
      span {
        ${typography('caption', 3)}
        align-items: center;
        color: ${color('secondary')};
        display: flex;
        height: 16px;
      }
      &.show {
        opacity: 1;
      }
    }
  }


  .cta {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 16px;
    button {
      order: -1;
      width: 100%;
    }
    button:first-of-type {
      margin-bottom: 24px;
    }
    button + button {
      width: 100%;
    }
  }
`;

const AccountVerificationPhoneCardContainer = styled(AccountVerificationPhoneCardContainerMobile)`
  @media (min-width: 768px) {
    box-shadow: 0 4px 15px ${color('black', 0.1)};
    height: auto;
    min-height: 466px;
    padding: 40px;
    position: relative;
    width: 552px;
    h1 {
      margin-bottom: 32px;
    }


  .phone-container {
    .bee-select-box-wrapper,
    .bee-input-wrapper {
      height: 40px;
    }
  }

    .verification-code-container {
      .verification-code-container-top {
        .verification-code-input-container {
          width: 138px;
        }
        button {
          width: 142px;
        }
      }
    }


    .cta {
      flex-direction: row;
      margin-top: 0;
      button {
        order: 0;
        margin-bottom: 0;
        width: 166px;
      }
      button:first-of-type {
        margin-bottom: 0;
      }
      button + button {
        width: 278px;
      }
    }
  }
`;

export default AccountVerificationPhoneCardContainer;

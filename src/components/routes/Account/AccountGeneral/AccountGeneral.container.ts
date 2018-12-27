import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AccountGeneralContainerMobile = styled.section`
  width: 100%;


  .account-general-content {
    height: 100%;
    padding: 40px 24px 0;
    width: 100%;
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .row {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .input-container {
        height: 56px;
        width: 100%;
        margin-bottom: 32px;
        &.half {
          width: 100%;
        }
      }
      .textarea-container {
        min-height: 80px;
        width: 100%;
        textarea {
          ${typography('read', 1)};
          border: 1px solid ${color('core')};
          border-radius: 3px;
          margin-top: 8px;
          min-height: 80px;
          outline: none;
          padding: 8px 16px;
          resize: vertical;
          width: 100%;
          &::placeholder {
            ${typography('caption', 1)};
            color: ${color('upper', 0.5)};
          }
        }
      }
      .bee-divider {
        margin-top: 40px;
      }
      .actions {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        width: 100%;
        button + button {
          margin-bottom: 24px;
        }
        .cancel {
          width: 35%;
        }
        .submit {
          width: 58%:
        }
      }
      .bee-error-message {
        margin-top: 8px;
      }
    }
  }
`;

const AccountGeneralContainerTablet = styled(AccountGeneralContainerMobile)`
  @media (min-width: 768px) {
    .account-general-content {
      width: 520px;
      form {
        width: 520px;
        .row {
          flex-direction: row;
        }
        .input-container {
          height: 48px;
          margin-bottom: 32px;
          &.half {
            width: 48%;
          }
        }
        .textarea-container {
          textarea {
            width: 520px;
          }
        }
        .bee-divider {
          margin-top: 0;
        }
        .actions {
          display: flex;
          flex-direction: row;
          margin-top: 0;
          width: auto;
          button {
            margin: 24px 0 0 24px;
            width: 200px;
          }
          button + button {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;

const AccountGeneralContainer = styled(AccountGeneralContainerTablet)`
  @media (min-width: 1025px) { }
`;

export default AccountGeneralContainer;

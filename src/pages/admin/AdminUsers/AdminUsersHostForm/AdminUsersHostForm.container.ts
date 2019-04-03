import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AdminUsersHostFormWContainer = styled.section`
  .admin-host-form-container {
    box-sizing: border-box;
    height: 100%;
    padding: 0 40px 88px;
    width: 100%;
  }
  header {
    height: 96px;
    margin-bottom: 40px;
    width: 100%;
    h1 {
      ${typography('welter', 1)};
      align-items: center;
      border-bottom: 1px solid ${color('middle')};
      color: ${color('body')};
      display: flex;
      font-family: Roboto, Arial, sans-serif;
      height: 100%;
      line-height: 44px;
      width: 920px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 400px;
    .admin-form--body {
      margin: 40px 0 47px;
    }
    .admin-form--item {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      margin-bottom: 40px;
      position: relative;
      .single-input-validator-container {
        position: relative;
        .bee-svg {
          height: 24px;
          width: 24px;
        }
        > span {
          align-items: center;
          display: flex;
          height: 40px;
        }
      }
      .admin-input__error,
      .admin-input__success {
        left: 416px;
        opacity: 0;
        position: absolute;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        &.show {
          opacity: 1;
        }
      }
      .admin-input__error {
        ${typography('light', 7)}
        color: ${color('incorrect')};
        width: 100%;
        transition: all 0.1s ease-in-out;
      }
      .admin-input__success {
        color: ${color('correct')};
        height: 24px;
        width: 24px;
        transition: all 0.3s ease-in-out;
      }
      &.row {
        flex-direction: row;
        justify-content: space-between;
        .admin-form--sub-item {
          display: flex;
          flex-direction: column;
          width: 45%;
        }
        .admin-input__error,
        .admin-input__success {
          left: 416px;
          opacity: 0;
          position: absolute;
          top: 50px;
          transform: translate3d(0, -50%, 0);
          &.show {
            opacity: 1;
          }
        }
        .admin-input__error {
          ${typography('light', 7)}
          color: ${color('incorrect')};
          width: 100%;
          transition: all 0.1s ease-in-out;
        }
        .admin-input__success {
          color: ${color('correct')};
          height: 24px;
          width: 24px;
          transition: all 0.3s ease-in-out;
        }
      }
    }
    .admin-form--item-notice {
      h4 {
        ${typography('welter', 5)}
        align-items: center;
        color: ${color('body')};
        display: flex;
        flex-shrink: 0;
        margin-bottom: 8px;
      }
      a {
        span {
          ${typography('read', 2)};
          color: ${color('secondary')};
        }
      }
      p {
        ${typography('read', 2)};
        color: ${color('error')};
      }
    }
    .admin-form--item-link {
      margin-top: 24px;
      span {
        ${typography('welter', 4)}
        color: ${color('secondary')};
      }
    }
    footer {
      background: ${color('middle')};
      background-color: ${color('middle')};
      bottom: 0;
      box-shadow: 0 -2px 15px 0 rgba(0,0,0,0.10);
      display: flex;
      height: 88px;
      margin-left: -40px;
      padding: 20px 40px;
      position: fixed;
      width: 1000px;
      z-index: 2;
      .error-state {
        ${typography('read', 2)};
        align-items: center;
        color: ${color('error')};
        display: flex;
        line-height: 20px;
        opacity: 0;
        width: 460px;
      }
      .opacity--1 {
        opacity: 1;
      }
      .form-actions {
        display: flex;
        justify-content: space-around;
        width: 400px;
        button {
          border-radius: 4px;
          font-weight: 300;
          width: 180px;
        }
        .invisible {
          visibility: hidden;
        }
      }
    }
  }
`;

export default AdminUsersHostFormWContainer;

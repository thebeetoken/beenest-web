import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AdminListingsContainer = styled.section`
  header {
    height: 96px;
    width: 100%;
    h1 {
      ${typography('welter', 1)}
      align-items: center;
      border-bottom: 1px solid ${color('middle')};
      color: ${color('body')};
      display: flex;
      height: 100%;
      width: 920px;
    }
  }


  form {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    padding-bottom: 88px;
    width: 400px;
    .admin-form--item {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      margin-bottom: 40px;
      position: relative;

      .multi-line-group-spacing {
        margin-bottom: 24px;
      }
      .single-input-validator-container {
        position: relative;
        .bee-checkbox {
          .bee-checkbox--text-container {
            span {
              ${typography('welter', 5)}
              align-items: center;
              color: ${color('body')};
              display: flex;
              height: 24px;
            }
          }
        }
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
        &.show-error {
          opacity: 1;
        }
        &.show-success {
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
      .multiple-input-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        .admin-form--sub-item {
          width: 45%;
          div {
            margin-bottom: 0;
          }
        }
      }
      .row-address {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .admin-form--sub-item:nth-of-type(1) {
          width: 45%;
        }
        .admin-form--sub-item:nth-of-type(2) {
          width: 12.5%;
        }
        .admin-form--sub-item:nth-of-type(3) {
          width: 22.5%;
        }
      }
      .row-bed-and-bathroom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .admin-form--sub-item:nth-of-type(1) {
          width: 45%;
        }
        .admin-form--sub-item:nth-of-type(2) {
          width: 21%;
        }
        .admin-form--sub-item:nth-of-type(3) {
          width: 18%;
        }
      }
      .photo-placeholder-cover {
        border: 1px solid black;
        height: 112px;
        margin-bottom: 40px;
        width: 400px;
      }
      .photo-placeholder-additional {
        border: 1px solid black;
        height: 112px;
        width: 400px;
      }
    }


    .bee-divider {
      margin-bottom: 40px;
    }
  }


  .admin-form-submit-wrapper {
    bottom: 0;
    display: flex;
    position: fixed;
    height: 88px;
    margin-left: -40px;
    min-width: 1264px;
    width: 1264px;
    z-index: 10;
    .admin-form-submit--container {
      align-items: center;
      background-color: ${color('middle')};
      box-shadow: 0 -2px 15px 0 rgba(0,0,0,0.10);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 40px;
      width: 1000px;
      height: 100%;
      .admin-form-submit--status {
        h4 {
          ${typography('welter', 6)}
        }
        .admin-form-submit__error {
          color: ${color('incorrect')};
          transition: all 0.1s ease-in-out;
        }
        .admin-form-submit__success {
          color: ${color('correct')};
          transition: all 0.3s ease-in-out;
        }
      }
      .button-group-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 400px;
        button {
          border-radius: 3px;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
          width: 180px;
        }
      }
    }
  }
`;

export default AdminListingsContainer;

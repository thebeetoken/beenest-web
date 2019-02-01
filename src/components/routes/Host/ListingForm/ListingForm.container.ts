import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ListingFormContainer = styled.section`
  width: 100%;


  & > .bee-general-wrapper {
    min-height: calc(100% - 64px);
    margin: 0 auto;
    form {
      min-height: calc(100% - 128px);
      min-width: 586px;
      padding: 40px 0 96px;
      padding-right: 56px;
      width: 586px;
      label {
        margin-bottom: 8px;
      }
      .form-item {
        margin-bottom: 40px;
        width: 100%;
        .bee-textarea {
          width: 100%;
        }
        .input-number-container {
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          > label {
            margin-bottom: 0;
          }
        }
        &.address {
          > * {
            margin-bottom: 16px;
          }
          .row-address {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .bee-input-wrapper {
              &:nth-of-type(1) {
                width: 45%;
              }
              &:nth-of-type(2) {
              width: 15%;
              }
              &:nth-of-type(3) {
                width: 20%;
              }
            }
          }
        }
        &.photo {
          width: 488px;
        }
        &.row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .input-container {
            width: 40%;
            display: flex;
            flex-direction: column;
            label {
              margin-bottom: 8px;
            }
          }
        }
        &.short {
          width: 180px;
        }
        &.map-preview {
          width: 100%;
          .bee-google-maps {
            height: 168px;
            width: 100%;
          }
        }
      }
    }

    aside {
      background-color: ${color('light')};
      left: calc(586px + (100% - 976px) / 2);
      min-height: calc(100% - 128px);
      width: calc((100% - 586px) - ((100% - 976px) / 2));
      padding: 56px 56px 72px;
      position: absolute;
      header {
        ${typography('title', 7)}
        color: ${color('dark')};
        margin-bottom: 32px;
      }
    }
  }
`;

export default ListingFormContainer;

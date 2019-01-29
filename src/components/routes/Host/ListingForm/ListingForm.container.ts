import styled from 'styled-components';
import { color } from 'styled/utils';

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
        margin-bottom: 24px;
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
          >.bee-input-wrapper {
            &:nth-of-type(3) {
              display: inline-block;
              margin-bottom: 0;
              width: 45%;
            }
            &:nth-of-type(4) {
              display: inline-block;
              margin-bottom: 0;
              margin-left: 53px;
              width: 15%;
            }
            &:nth-of-type(5) {
              display: inline-block;
              margin-bottom: 0;
              margin-left: 53px;
              width: 20%;
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
      background-color: ${color('white')};
      min-height: calc(100% - 128px);
      position: absolute;
      left: calc(586px + (100% - 976px) / 2);
      width: calc((100% - 586px) - ((100% - 976px) / 2));
    }
  }
`;

export default ListingFormContainer;
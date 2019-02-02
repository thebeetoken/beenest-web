import styled from 'styled-components';
import { color } from 'styled/utils';

const ListingFormMobileContainer = styled.section`
  width: 100%;

  & > .bee-general-wrapper {
    margin: 0 auto;
    margin-bottom: 56px;
    min-height: calc(100% - 64px);
    min-width: auto;
    form {
      min-height: calc(100% - 128px);
      padding: 16px;
      width: 100%;
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
          .city,
          .state,
          .postal-code {
            display: inline-block;
            margin-bottom: 0;
          }
          .state,
          .postal-code {
            margin-left: 10%
          }
          .city {
            width: 45%;
          }
          .state {
            width: 15%;
          }
          .postal-code {
            width: 20%;
          }
        }
        &.photo {
          width: 100%;
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
          width: 240px;
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

const ListingFormTabletContainer = styled(ListingFormMobileContainer)`
  @media (min-width: 768px) {
    & > .bee-general-wrapper {
      form {
        padding: 40px 56px 96px 24px;
      }
    }
  }
`;

const ListingFormDesktopContainer = styled(ListingFormTabletContainer)`
  @media (min-width: 1025px) {
    & > .bee-general-wrapper {
      width: 976px;
      form {
        padding-left: 0;
        width: 586px;
      }
    }
  }
`;

export default ListingFormDesktopContainer;

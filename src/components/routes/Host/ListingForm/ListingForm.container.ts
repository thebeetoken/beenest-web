import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ListingFormMobileContainer = styled.section`
  width: 100%;

  & > .bee-general-wrapper {
    margin: 0 auto;
    min-height: calc(100% - 64px);
    width: 100%;
    min-width: 100%;
    form {
      min-height: calc(100% - 128px);
      padding: 48px 24px 56px;
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
        .bee-checkbox {
          label {
            margin-bottom: 0;
          }
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
      background-color: ${color('light')};
      height: 100%;
      left: calc(586px + (100% - 976px) / 2);
      position: fixed;
      width: calc((100% - 586px) - ((100% - 976px) / 2));
      z-index: -1;
      .background-extender {
        background-color: ${color('light')};
        position: absolute;
        top: -64px;
        width: 100%;
        height: 64px;
      }
      .aside-container {
        height: 608px;
        max-width: 632px;
        padding: 40px 56px 72px;
        header {
          ${typography('title', 7)}
          color: ${color('dark')};
          margin-bottom: 32px;
        }
        > div {
          h3 {
            ${typography('read', 1)}
            margin-bottom: 24px;
          }
          h4 {
            ${typography('emp', 5)}
            margin-bottom: 4px;
          }
          p {
            ${typography('read', 2)}
            margin-bottom: 24px;
          }
          ol {
            li {
              list-style-type: decimal;
            }
          }
          ul {
            li {
              list-style-type: disc;
            }
          }
          .images-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            .image-container--horizontal {
              height: 180px;
              width: 240px;
            }
          }
        }
      }
    }
  }
`;

const ListingFormTabletContainer = styled(ListingFormMobileContainer)`
  @media (min-width: 768px) {
    & > .bee-general-wrapper {
      form {
        padding: 40px 56px 96px 24px;
        width: 586px;
      }
    }
  }
`;

const ListingFormDesktopContainer = styled(ListingFormTabletContainer)`
  @media (min-width: 1025px) {
    & > .bee-general-wrapper {
      width: 976px;
      min-width: 976px;
      form {
        padding: 40px 56px 96px 0;
      }
    }
  }
`;

export default ListingFormDesktopContainer;

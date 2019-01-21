import styled from 'styled-components';
import { typography } from 'styled/utils';
import { color } from 'styled/utils';

const ListingContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 88px;
  width: 100%;

  .listing-gallery-container {
    display: flex;
    flex-direction: column;
    height: 62vh;
    min-height: 333px;
    position: relative;
    width: 100%;
    img {
      object-position: center;
      cursor: pointer;
    }
    .listing-gallery-container--btn-wrapper {
      bottom: 24px;
      display: flex;
      justify-content: flex-end;
      left: 50%;
      max-width: 1008px;
      position: absolute;
      padding: 0 24px;
      transform: translate3d(-50%, 0, 0);
      width: 100%;
      .bee-button {
        width: 164px;
      }
    }
  }

  .listing-body {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto;
    max-width: 1008px;
    position: relative;
    .listing-information-container {
      background-color: white;
      padding: 24px;
      width: 100%;
      h2 {
        ${typography('title', 6)};
        color: ${color('body')};
        margin-bottom: 16px;
        text-transform: capitalize;
      }
      .heading-container {
        margin-bottom: 16px;
        h1 {
          ${typography('title', 5)}
          color: ${color('body')};
          margin-bottom: 8px;
        }
        h3 {
          ${typography('emp', 7)};
          color: ${color('secondary')};
          text-transform: uppercase;
        }
      }
      .host-welcome-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-bottom: 24px;
        .host-welcome-container--img {
          align-items: center;
          border-radius: 50%;
          display: flex;
          height: 90px;
          justify-content: center;
          overflow: hidden;
          width: 90px;
          .bee-lazy-image {
            height: auto;
            max-height: 100%;
            max-width: 100%;
            width: auto;
          }
        }
        h3 {
          ${typography('read', 2)};
          color: ${color('body')};
          margin-bottom: 12px;
          text-transform: capitalize;
        }
      }
      .description-container {
        margin-bottom: 32px;
        .description-container--content {
          p {
            ${typography('read', 2)};
          }
        }
      }
      .accommodations-container {
        margin-bottom: 40px;
        ul {
          padding-left: 0;
          li {
            ${typography('read', 1)};
            color: ${color('body')};
            margin: 3px 0;
          }
        }
      }
      .amenities-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
        .amenities-list-container {
          padding-left: 0;
          ul {
            columns: 1;
            margin: 0;
            padding: 0;
            width: 100%;
            .bee-list-item {
              align-items: flex-start;
              break-inside: avoid;
              margin-bottom: 8px;
              span {
                padding-top: 2px;
              }
            }
          }
        }
      }
      .location-container {
        margin-bottom: 32px;
        h2 {
          margin-bottom: 8px;
        }
        h3 {
          ${typography('caption', 1)};
          margin-bottom: 24px;
        }
        .bee-google-maps {
          width: 100%;
          height: 160px;
        }
      }
      .about-host-container {
        display: flex;
        flex-direction: column;
        .about-host-heading-container {
          margin-bottom: 24px;
          position: relative;
          .about-host-heading-container--title {
            margin-bottom: 4px;
            h2 {
              align-self: flex-start;
              ${typography('title', 3)};
              color: ${color('body')};
              margin-bottom: 8px;
              text-transform: capitalize;
            }
            h3 {
              align-self: flex-start;
              ${typography('light', 8)};
              color: ${color('secondary')};
              margin-bottom: 8px;
            }
          }
          .about-host-container--img {
            align-items: center;
            border-radius: 50%;
            display: flex;
            height: 80px;
            justify-content: center;
            overflow: hidden;
            width: 80px;
            .bee-lazy-image {
              height: auto;
              max-height: 100%;
              max-width: 100%;
              width: auto;
            }
          }
          .about-host-container--contact-btn {
            bottom: 24;
            display: inline-block;
            position: absolute;
            top: 56px;
            right: 0;
            width: 176px;
            &:hover {
              .bee-svg {
                transition: all 0.15s ease-in-out;
                color: ${color('white')};
              }
            }
          }
        }
        .about-host-container--description {
          p {
            ${typography('read', 2)};
          }
        }
      }
    }

    .divider-style {
      margin-bottom: 24px;
    }
  }
`;


const ListingContainerTablet = styled(ListingContainerMobile)`
  @media (min-width: 768px) {
    .listing-body {
      .listing-information-container {
        padding-top: 40px 0 24px;;
        width: 600px;
        h2 {
          ${typography('title', 4)};
        }
        .heading-container {
          h1 {
            ${typography('title', 3)};
            margin-bottom: 16px;
          }
          h3 {
            ${typography('title', 7)};
          }
        }
        .host-welcome-container {
          margin-bottom: 32px;
          h3 {
            ${typography('read', 1)};
          }
        }
        .description-container {
          margin-bottom: 40px;
          .description-container--content {
            p {
              ${typography('read', 1)};
            }
          }
        }
        .amenities-container {
          .amenities-list-container {
            ul {
              columns: 2;
              .bee-list-item {
                max-width: 248px;
              }
            }
          }
        }
        .location-container {
          .bee-google-maps {
            height: 302px;
          }
        }
        .about-host-container {
          .about-host-heading-container {
            .about-host-heading-container--title {
              margin-bottom: 8px;
              h2 {
                ${typography('title', 4)};
              }
              h3 {
                ${typography('caption', 1)};
              }
            }
          }
          .about-host-container--description {
            p {
              ${typography('read', 1)};
            }
          }
        }
      }
    }

    .divider-style {
      margin-bottom: 40px;
    }
  }
`;

const ListingContainerDesktop = styled(ListingContainerTablet)`
  @media (min-width: 1025px) {
    padding-bottom: 0;
    .listing-gallery-container {
      height: 37.22vw;
      min-height: 536px;
      .listing-gallery-container--btn-wrapper {
        bottom: 88px;
        padding: 0;
      }
    }
    .listing-body {
      width: 1008px;
      justify-content: space-between;
      top: -64px;
      .listing-information-container {
        padding: 32px 22px 0;
        max-width: 616px;
        margin-bottom: 24px;
        h2 {
          ${typography('title', 3)};
          margin-bottom: 10px;
        }
        .heading-container {
          h3 {
            ${typography('title', 6)};
          }
        }
        .location-container {
          .bee-google-maps {
            height: 302px;
            width: 100%;
          }
        }
        .about-host-container {
          .about-host-heading-container {
            .about-host-heading-container--title {
              margin-bottom: 16px;
              h2 {
                ${typography('title', 3)};
              }
            }
          }
          .about-host-container--description {
            p {
              ${typography('read', 1)};
            }
          }
        }
      }
    }

    .divider-style {
      margin-bottom: 32px;
    }
  }
`;

const ListingContainer = styled(ListingContainerDesktop)``;

export default ListingContainer;

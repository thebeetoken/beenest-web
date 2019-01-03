import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ConferenceContainerMobile = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  .conference-hero {
    height: 200px;
    min-height: 200px;
    position: relative;
    width: 100%;
    .bee-overlay {
      .text-container {
        color: ${color('white')};
        display: flex;
        flex-direction: column;
        left: 50%;
        position: absolute;
        text-align: center;
        text-transform: capitalize;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 100%;
        z-index: 1;
        h1 {
          ${typography('title', 6)};
        }
        h2 {
          ${typography('title', 8)};
          margin-top: 8px;
        }
        h4 {
          flex: 1;
          margin-top: 24px;
          ${typography('read', 3)};
          text-align: center;
          a {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .conference-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    padding: 56px 24px;
    width: 100%;
    h2 {
      ${typography('emp', 6)};
      margin-bottom: 24px;
      text-align: left;
    }
    .host-cta {
      display: flex;
      flex-direction: column;
      padding: 16px;
      .host-cta-content {
        margin: 0 0 0 24px;
        h2 {
          ${typography('emp', 2)};
          margin: 0;
        }
        p {
          ${typography('read', 1)};
          margin: 12px 0 12px 0;
        }
        a {
          margin: 18px 0 0;
          .bee-button {
            width: 182px;
          }
        }
      }
    }
    .conference-hotels-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      a {
        margin-bottom: 40px;
      }
    }
    .conference-listings-container {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
      width: 100%;
      a {
        margin-bottom: 40px;
      }
    }
  }
`;

const ConferenceContainerTablet = styled(ConferenceContainerMobile)`
  @media (min-width: 768px) {
    .conference-hero {
      height: 33.33vw;
      min-height: 536px;
      .bee-overlay {
        .text-container {
          max-width: 872px;
          h1 {
            ${typography('title', 2)};
          }
          h2 {
            ${typography('title', 4)};
            margin-top: 16px;
          }
          h3 {
            ${typography('read', 2)};
            margin-top: 16px;
          }
          h4 {
            ${typography('read', 1)};
          }
        }
      }
    }
    .conference-body {
      padding-bottom: 64px;
      max-width: 768px;
      .conference-hotels-container {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        a {
          margin-right: 0px;
          margin-bottom: 64px;
        }
      }
      .conference-listings-container {
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 16px;
        width: 100%;
        a {
          &:nth-of-type(2n - 1) {
            margin-right: 131px;
          }
          &:nth-last-child(-n + 2) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;

const ConferenceContainerDesktop = styled(ConferenceContainerTablet)`
  @media (min-width: 1025px) {
    .conference-body {
      max-width: 1024px;
      .conference-hotels-container {
        flex-direction: row;
      }
      .conference-listings-container {
        a {
          &:nth-of-type(3n + 4),
          &:nth-of-type(3n + 5),
          &:nth-of-type(3n + 6) {
            margin-left: 0;
            margin-top: 24px;
          }

          &:nth-of-type(3n + 2),
          &:nth-of-type(3n + 3) {
            margin-left: 65px;
          }
          margin-bottom: 60px;
        }
      }
    }
  }
`;

export default ConferenceContainerDesktop;

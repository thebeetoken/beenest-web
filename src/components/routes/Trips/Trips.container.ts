import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const TripsContainerMobile = styled.div`
  align-items: center;
  display: flex;
  min-height: 100vh;
  width: 100%;

  
  .trips-body {
    align-items: flex-start;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    padding: 32px 24px 0;
    height: 100%;
    justify-content: space-between;
    margin: 0 auto;
    min-width: 320px;
    min-height: 100%;
    padding: 24px 0 40px;
    .trips-header {
      margin-bottom: 16px;
      padding: 0 24px;
      width: 100%;
      h1 {
        ${typography('title', 4)};
        color: ${color('core')};
        margin-bottom: 10px;
        text-align: left;
      }
      .trips-header--border {
        background-color: ${color('up')};
        opacity: 0.4;
        height: 2px;
        width: 100%;
      }
    }
    nav {
      margin-bottom: 40px;
    }
    .trips-book-now {
      margin-bottom: 32px;
      width: 100%;
      .trips-book-now--text {
        display: flex;
        flex-direction: column;
        margin-bottom: 32px;
        h2 {
          ${typography('title', 4)}
        }
        a {
          ${typography('title', 4)}
          color: ${color('tag')};
        }
      }
      .bee-button {
        width: 100%;
      }
    }
    .trip-cards-container {
      padding: 0 24px;
      width: 100%;
      > h2 {
        ${typography('title', 7)};
        margin-bottom: 24px;
      }
      .started-trip-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 24px;
        width: 100%;
        > h3 {
          ${typography('title', 7)};
          color: ${color('body')};
          margin-bottom: 24px;
        }
      }
      .active-cards-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
        width: 100%;
        .bee-active-trip-card {
          margin-bottom: 24px;
        }
      }
      .expired-trip-cards {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin: 0 auto;
        width: 100%;
      }
      > .bee-divider {
        margin-bottom: 24px;
      }
    }
  }

  > .bee-divider {
    margin-bottom: 24px;
  }
`;

const TripsContainerTablet = styled(TripsContainerMobile)`
  @media (min-width: 768px) {
    .trips-body {
      padding: 0;
      padding-top: 64px;
      width: 644px;
      .trips-header {
        margin-bottom: 12px;
        padding: 0;
        width: 100%;
        h1 {
          ${typography('title', 4)};
          color: ${color('core')};
          margin-bottom: 10px;
          text-align: left;
        }
        .trips-header--border {
          background-color: ${color('up')};
          opacity: 0.4;
          height: 2px;
          width: 100%;
        }
      }
      nav {
        margin-bottom: 40px;
      }
      .trips-book-now {
        .trips-book-now--text {
          flex-direction: column;
          h2 {
            ${typography('title', 3)}
          }
          a {
            ${typography('title', 3)}
            margin-left: 4px;
          }
        }
      }
      .trip-cards-container {
        padding: 0;
        > h2 {
          ${typography('title', 7)};
          margin-bottom: 24px;
        }
        .started-trip-container {
          > h3 {
            ${typography('title', 7)};
          }
        }
        .active-cards-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-bottom: 24px;
          width: 100%;
          .bee-active-trip-card {
            margin-bottom: 48px;
            &:nth-of-type(2n) {
              margin-left: 100px;
            }
          }
        }
        .expired-trip-cards {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin: 0 auto;
          width: 100%;
          .expired-trip-card {
            margin-bottom: 48px;
            &:nth-of-type(2n) {
              margin-left: 100px;
            }
          }
        }
      }
    }
  }
`;

const TripsContainerDesktop = styled(TripsContainerTablet)`
  @media (min-width: 1025px) {
    .trips-body {
      width: 976px;
      .trips-header {
        margin-bottom: 12px;
        width: 100%;
        h1 {
          ${typography('title', 2)};
          color: ${color('core')};
          margin-bottom: 10px;
          text-align: left;
        }
        .trips-header--border {
          background-color: ${color('up')};
          opacity: 0.4;
          height: 2px;
          width: 100%;
        }
      }
      nav {
        align-self: flex-start;
        margin-bottom: 60px;
      }
      .trips-book-now {
        .trips-book-now--text {
          flex-direction: row;
          a {
            margin-left: 8px;
          }
        }
        .bee-button {
          width: 200px;
        }
      }
      .trip-cards-container {
        .started-trip-container {
          > h3 {
            ${typography('emp', 5)};
            align-self: flex-start;
          }
        }
        .active-cards-container {
          display: flex;
          margin-bottom: 24px;
          width: 100%;
          .bee-active-trip-card {
            margin-bottom: 48px;
            &:nth-of-type(2n) {
              margin-left: 0;
            }
          }
        }
        .expired-trip-cards {
          .expired-trip-card {
            &:nth-of-type(3n + 4),
            &:nth-of-type(3n + 5),
            &:nth-of-type(3n + 6) {
              margin-left: 0;
            }

            &:nth-of-type(3n + 2),
            &:nth-of-type(3n + 3) {
              margin-left: 80px;
            }
          }
        }
      }
    }
  }
`;

const TripsContainer = styled(TripsContainerDesktop)``;

export default TripsContainer;

import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const TripsContainerMobile = styled.div`
  align-items: center;
  display: flex;
  min-height: 100vh;
  width: 100%;

  
  .trips-body {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    margin: 0 auto;
    min-width: 320px;
    min-height: 100%;
    padding: 32px 0 56px;
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
      display: flex;
      justify-content: center;
      padding: 0 24px;
      height: 100%;
      width: 100%;
      > h2 {
        ${typography('title', 7)};
        margin-bottom: 24px;
      }
      .active-cards-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        width: 100%;
        .active-trip-card {
          width: 272px;
          margin-bottom: 40px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .expired-trip-cards {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin: 0 auto;
        width: 100%;
        .expired-trip-card {
          width: 272px;
          margin-bottom: 40px;
          &:last-child {
            margin-bottom: 0;
          }
        }
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
      padding: 64px 0;
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
        align-self: flex-start;
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
        .active-cards-container {
          .active-trip-card {
            width: 100%;
          }
        }
        .expired-trip-cards {
          align-items: flex-start;
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
            &:nth-last-child(-n+2) {
              margin-bottom: 0;
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
          margin-bottom: 40px;
          > h3 {
            ${typography('emp', 5)};
            align-self: flex-start;
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
            &:nth-last-child(-n+3) {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
`;

const TripsContainer = styled(TripsContainerDesktop)``;

export default TripsContainer;

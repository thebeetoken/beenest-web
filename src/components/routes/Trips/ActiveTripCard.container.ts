import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ActiveTripCardMobile = styled.div`
  display: flex;
  height: 402px;
  flex-direction: column;
  min-width: 272px;
  width: 272px;
  .trip-large-section {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 8px;
    width: 100%;
    h3 {
      ${typography('title', 7)};
      color: ${color('body')};
      margin-bottom: 8px;
    }
    .address {
      margin-bottom: 16px;
      .bee-list-item {
        span {
          ${typography('emp', 7)}
        }
      }
    }
    .dates {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      width: 100%;
      h5 {
        ${typography('read', 3)};
        color: ${color('body')};
        span {
          ${typography('emp', 7)};
        }
      }
    }
    h4 {
      ${typography('emp', 7)};
      color: ${color('secondary')};
      margin-bottom: 8px;
      text-transform: capitalize;
    }
    > h5 {
      ${typography('read', 3)};
      color: ${color('body')};
      margin-bottom: 8px;
      span {
        ${typography('emp', 7)};
      }
    }
    .divider {
      width: 100%;
    }
    .actions {
      align-items: center;
      display: flex;
      height: 72px;
      justify-content: space-around;
      padding: 0;
      margin: 0;
      .bee-fab {
        height: 72px;
        width: 72px;
      }
    }
  }
  .active-trip-photo {
    height: 142px;
    width: 272px;
  }
`;

const ActiveTripCardTablet = styled(ActiveTripCardMobile)`
  @media (min-width: 768px) {
  }
`;

const ActiveTripCardDesktop = styled(ActiveTripCardTablet)`
  @media (min-width: 1025px) {
    flex-direction: row-reverse;
    height: 312px;
    justify-content: space-between;
    margin-bottom: 44px;
    width: 976px;
    .trip-large-section {
      height: 100%;
      padding: 8px 0;
      width: 448px;
      h3 {
        ${typography('title', 3)};
        color: ${color('body')};
        line-height: 34px;
      }
      .address {
        .bee-list-item {
          width: 358px;
        }
      }
      .dates {
        height: 18px;
        width: 324px;
        h5 {
          ${typography('read', 2)};
          span {
            ${typography('emp', 6)};
          }
        }
      }
      h4 {
        ${typography('title', 7)};
        height: 24px;
        text-transform: capitalize;
      }
      > h5 {
        ${typography('read', 2)};
        span {
          ${typography('emp', 6)};
        }
      }
      .divider {
        width: 448px;
      }
      .actions {
        justify-content: flex-start;
        .bee-fab {
          height: 80px;
          width: 100px;
        }
      }
    }
    .active-trip-photo {
      height: 292px;
      width: 472px;
    }
  }
`;

export default ActiveTripCardDesktop;

import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const HostBookingCardContainer = styled.article`
  border-radius: 2px;
  box-shadow: 0 2px 8px ${color('black', 0.1)};
  display: flex;
  height: 232px;
  padding: 24px;
  width: 976px;


  a {
    font-weight: bold;
    color: ${color('link')};
  }

  .host-booking-card--booking-meta {
    display: flex;
    flex-direction: column;
    width: 400px;
    h2 {
      ${typography('title', 4)}
      align-items: center;
      display: flex;
      span {
        ${typography('title', 7)}
        margin: 1px 0 0 8px;
      }
    }
    h3 {
      ${typography('emp', 5)}
      margin-top: 8px;
      text-transform: capitalize;
    }
    h3:first-of-type {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 380px;
      white-space: nowrap;
    }
    h4 {
      ${typography('title', 7)}
      color: ${color('error')};
    }
    .button-container {
      display: flex;
      button {
        width: 131px;
      }
      button + button {
        margin-left: 8px;
      }
    }
  }


  .column-divider {
    height: 100%;
    margin: 0 38px 0 78px;
    position: relative;
    width: 16px;
    &::before {
      background: ${color('upper')};
      bottom: 0;
      content: '';
      left: 50%;
      position: absolute;
      top: 0;
      transform: translate3d(-50%, 0, 0);
      width: 1px;
    }
  }


  .host-booking-card-guest-meta-container {
    display: flex;
    flex-direction: column;
    h2 {
      ${typography('title', 4)}
    }
    .host-booking-card--guest-meta {
      display: flex;
      flex-direction: column;
      margin-top: 8px;
      h3 {
        ${typography('read', 1)}
      }
      h3:not(:first-of-type) {
        margin-top: 8px;
      }
    }
  }
`;

export default HostBookingCardContainer;
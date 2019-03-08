import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const BookingNavBarContainer = styled.div`
  background-color: ${color('light')};
  .booking-nav-mobile {
    align-items: center;
    display: flex;
    height: 64px;
    width: 100%;
    margin-bottom: 32px;
    .booking-nav-arrow {
      height: 24px;
      width: 24px;
      color: ${color('upper')};
    }
    .booking-nav-mobile-crumb {
      box-sizing: border-box;
      padding: 14px 24px 14px 14px;
      width: 100%;
      .booking-nav-mobile-step {
        ${typography('emp', 8)}
      }
      .booking-nav-mobile-title {
        ${typography('title', 7)}
        color: ${color('core')};
      }
    }
  }
  .booking-nav-desktop {
    ${typography('title', 6)}
    align-items: center;
    color: ${color('upper')};
    display: flex;
    justify-content: space-between;
    height: 88px;
    margin: 0 auto;
    max-width: 978px;
    margin-bottom: 64px;
    .booking-nav-crumb {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .booking-nav-carat {
      height: 24px;
      width: 24px;
      color: ${color('upper')};
    }
    .match {
      color: ${color('body')};
    }
  }
`;

export default BookingNavBarContainer;

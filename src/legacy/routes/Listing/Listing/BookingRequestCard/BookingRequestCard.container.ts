import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const BookingRequestCardContainerMobile = styled.div`
  align-items: center;
  background-color: ${color('white')};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 16px 24px 40px;
  width: 100%;


  .booking-card-content-wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 486px;
    width: 100%;
    .booking-card-calendar-style {
      margin-bottom: 32px;
      text-align: center;
      width: 100%;
      .calendar-labels-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .bee--input-label {
          width: calc((100% - 24px) / 2);
        }
      }
    }
    .pricing-container {
      align-items: flex-start;
      display: flex;
      flex-direction: row;
      height: 64px;
      justify-content: space-between;
      margin-bottom: 32px;
      min-height: 64px;
      width: 100%;
      .pricing-container--primary {
        align-items: center;
        align-self: center;
        display: flex;
        flex-direction: row;
        h4 {
          ${typography('title', 3)}
        }
        span {
          ${typography('caption', 2)}
          margin-left: 4px;
        }
      }
      .pricing-container--other-rates {
        align-self: flex-start;
        display: flex;
        flex-direction: column;
        padding-top: 21px;
        text-align: right;
        h5 {
          ${typography('emp', 6)}
          color: ${color('secondary')};
          span {
            ${typography('caption', 2)}
            color: ${color('secondary')};
            margin-left: 2px;
          }
        }
      }
    }
    .number-of-guests-input-style {
      margin-bottom: 48px;
      width: 100%;
    }
    form {
      display: flex;
      justify-content: center;
      margin-bottom: 24px;
      width: 100%;
      button {
        width: 100%;
      }
    }
    .bottom-card-caption {
      h3 {
        ${typography('caption', 1)}
        color: ${color('upper')};
        text-align: center;
      }
    }
  }
`;

const BookingRequestCardContainerTablet = styled(BookingRequestCardContainerMobile)`
  @media (min-width: 768px) {
  }
`;

const BookingRequestCardContainerDesktop = styled(BookingRequestCardContainerTablet)`
  @media (min-width: 1025px) {
    background-color: ${color('white')};
    box-shadow: 0 4px 15px ${color('black', 0.1)};
    height: 408px;
    position: relative;
    width: 352px;
    .booking-card-content-wrapper {
    }
    .bottom-card-caption {
      position: absolute;
      top: 432px;
    }
  }
`;

const BookingRequestCardContainer = styled(BookingRequestCardContainerDesktop)``;

export default BookingRequestCardContainer;

import styled from 'styled-components';

const BookingOptionsUSDContainer = styled.div`
  .bee-select-box-wrapper {
    margin-bottom: 24px;
  }


  .bee-list-item {
    height: 40px;
  }


  .selected {
    background-color: blue;
  }


  .booking-options-usd-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80px;
    width: 100vw;
    z-index: 1;
  }


  .booking-options-button-container {
    display: flex;
    align-items: center;
    padding-top: 100px;
    .back-button {
      margin-right: 40px;
    }
  }
`;

export default BookingOptionsUSDContainer;

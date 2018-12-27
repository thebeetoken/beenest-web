import styled from 'styled-components';
import { typography } from 'styled/utils';

const BookingPaymentBar = styled.div`
  align-items: center;
  background-color: #fafafa;
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: 100%;

  .booking-payment-footer-quote {
    
  }
  .booking-payment-bar-button-container {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    padding: 16px;
    height: 100%;
    width: 100%;
    button {
      height: 100%;
      width: 100%;
    }
    p {
      ${typography('read', 3)}
    }
  }
`;

export default BookingPaymentBar;

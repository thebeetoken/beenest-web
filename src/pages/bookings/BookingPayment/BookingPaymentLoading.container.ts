import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const BookingPaymentLoading = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;


  .processing-card {
    align-items: center;
    background-color: ${color('white')};
    box-shadow: 0 4px 10px ${color('black', 0.1)};
    display: flex;
    flex-direction: column;
    height: 90px;
    justify-content: center;
    margin-top: 36px;
    padding: 12px 18px;
    width: calc(100% - 48px);
    h2 {
      ${typography('emp', 7)}
      text-align: center;
    }
    p {
      ${typography('read', 3)}
      text-align: center;
    }
    @media (min-width: 768px) {
      width: 320px;
    }
  }
`;

export default BookingPaymentLoading;

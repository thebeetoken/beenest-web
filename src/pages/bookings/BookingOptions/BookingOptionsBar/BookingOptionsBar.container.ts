import styled from 'styled-components';
import { color } from 'styled/utils';

const BookingOptionsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 20px ${color('black', 0.1)};
  height: 100%;
  width: 100%;

  .bar-button {
    background-color: white;
    box-sizing: border-box;
    padding: 16px 16px;
    height: 100%;
    width: 100%;
    button {
      height: 100%;
      width: 100%;
    }
  }
`;

export default BookingOptionsBarContainer;

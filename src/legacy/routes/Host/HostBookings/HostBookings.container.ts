import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const HostBookingsContainer = styled.section`
  width: 100%;
  h1,
  p {
    color: ${color('body')};
  }
  h1 {
    ${typography('title', 4)}
  }
  p {
    ${typography('read', 1)}
    margin-top: 16px;
  }



  .host-booking-card:not(:last-of-type) {
    margin-bottom: 32px;
  }
`

export default HostBookingsContainer;

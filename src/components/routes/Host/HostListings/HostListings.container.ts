import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const HostListingsContainer = styled.div`
  > h1 {
    ${typography('title', 4)}
    color: ${color('body')};
    width: 500px;
  }
  width: 100%;

  .host-listing-card + .host-listing-card {
    margin-top: 40px;
  }
`

export default HostListingsContainer;

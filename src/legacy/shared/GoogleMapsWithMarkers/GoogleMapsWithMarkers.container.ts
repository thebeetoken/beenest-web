import styled from 'styled-components';
import { typography } from 'styled/utils';

interface Props {
  height?: string;
  width?: string;
}

const GoogleMapsWithMarkersContainer = styled.div`
  height: 100%;
  width: 100%;

  .bee-listing-card {
    height: 248px;
    margin-top: 8px;
    width: 242px;
    .listing-card--image {
      height: 140px;
    }
    .listing-card--meta {
      height: 100px;
    }
    .listing-card-price-container {
      height: 18px;
      h2 {
        ${typography('title', 6)}
        span {
          ${typography('caption', 4)}
        }
      }
    }
    h1 {
      ${typography('title', 8)}
      height: 32px;
    }
    h4 {
      ${typography('emp', 8)}
    }
  }

  @media (min-width: 768px) {
    height: ${({ height }: Props) => height || '400px'};
    width: ${({ width }: Props) => width || '568px'};
  }
`;

export default GoogleMapsWithMarkersContainer;

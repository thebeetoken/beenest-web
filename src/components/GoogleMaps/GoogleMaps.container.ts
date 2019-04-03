import styled from 'styled-components';
import { typography, color } from 'styled/utils';

interface Props {
  height?: string;
  width?: string;
}

const GoogleMapsContainer = styled.div`
  height: 100%;
  position: relative;
  width: 100%;

  div {
    > h4 {
      text-align: center;
    }
  }

  > div:first-child {
    > div:first-child {
      background-color: ${color('light')} !important;
    }
  }

  > div:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 80%;
  }


  p {
    ${typography('title', 5)}
    text-align: center;
  }

  @media (min-width: 768px) {
    height: ${({ height }: Props) => height || '400px'};
    width: ${({ width }: Props) => width || '568px'};
  }
`;

export default GoogleMapsContainer;

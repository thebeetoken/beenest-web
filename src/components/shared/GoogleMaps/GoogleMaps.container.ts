import styled from 'styled-components';

interface Props {
  height?: string;
  width?: string;
}

const GoogleMapsContainer = styled.div`
  height: 100%;
  position: relative;
  width: 100%;


  > div:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }


  @media (min-width: 768px) {
    height: ${({ height }: Props) => height || '400px'};
    width: ${({ width }: Props) => width || '568px'};
  }
`;

export default GoogleMapsContainer;

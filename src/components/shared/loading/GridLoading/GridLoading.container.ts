import styled from 'styled-components';
import { color } from 'styled/utils';

type GridLoadingProps = Partial<{
  color: string;
  height: number;
  width: number;
}>;

const GridLoadingContainer = styled.div`
  .sk-cube-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    height: ${(props: GridLoadingProps) => props.height || 40}px;
    width: ${(props: GridLoadingProps) => props.width || 40}px;
  }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: ${(props: GridLoadingProps) => color(props.color || 'style')};
    -webkit-animation: sk-cubeGridScaleDelay 2s infinite ease-in-out;
            animation: sk-cubeGridScaleDelay 2s infinite ease-in-out; 
  }
  .sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }
  .sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s; }
  .sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
            animation-delay: 0.4s; }
  .sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
            animation-delay: 0.1s; }
  .sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }
  .sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s; }
  .sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
            animation-delay: 0s; }
  .sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
            animation-delay: 0.1s; }
  .sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }

  @-webkit-keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
              transform: scale3D(1, 1, 1);
    } 35% {
      -webkit-transform: scale3D(0, 0, 1);
              transform: scale3D(0, 0, 1); 
    }
  }

  @keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
              transform: scale3D(1, 1, 1);
    } 35% {
      -webkit-transform: scale3D(0, 0, 1);
              transform: scale3D(0, 0, 1);
    } 
  }
`;

/** @component */
export default GridLoadingContainer;

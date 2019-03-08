import styled from 'styled-components';
import { color } from 'styled/utils';

type AudioLoadingProps = Partial<{
  color: string;
  height: number;
  width: number;
}>;

const AudioLoadingContainer = styled.div`
  display: flex;
  height: ${(props: AudioLoadingProps) => props.height || 40}px;
  justify-content: space-between;
  margin: auto;
  width: ${(props: AudioLoadingProps) => props.width || 40}px;

  > div {
    background-color: ${(props: AudioLoadingProps) => color(props.color || 'secondary')};
    height: 100%;
    width: 16.67%;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }
  .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  @-webkit-keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }
  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
`;

/** @component */
export default AudioLoadingContainer;

import styled from 'styled-components';
import { color, cover } from 'styled/utils';

interface Props {
  background?: string;
  peekHeight?: number;
  showCard: boolean;
}

const PopUpCardContainer = styled.div`
  align-items: center;
  background-color: ${({ background }: Props) => (background ? color(background) : 'white')};
  box-shadow: 0 -1px 10px ${color('black', 0.1)};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  left: 0;
  position: fixed;
  top: ${({ peekHeight }: Props) => `calc(100% - ${peekHeight || 0}px)`};
  transform: translateY(${({ peekHeight, showCard }: Props) => (showCard ? `calc(${peekHeight}px - 100%)` : 0)});
  transition: transform 0.1s ease-in-out;
  width: 100%;
  z-index: 101;
  &::before {
    margin-top: 88px;
    ${cover(true)}
    background-color: ${({ showCard }: Props) => (showCard ? 'transparent' : color('white'))};
    z-index: 1;
  }
  .bee-close-button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
`;

export default PopUpCardContainer;

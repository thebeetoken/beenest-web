import styled from 'styled-components';

import { color } from 'styled/utils';

type Props = Partial<{
  background: string;
  height: string;
  iconColor: string;
  width: string;
}>

const CloseButtonContainer = styled.button`
  align-items: center;
  background-color: ${({ background }: Props) => (background ? color(background) : 'transparent')};
  border: 0;
  color: ${({ iconColor }: Props) => color(iconColor || 'upper')};
  cursor: pointer;
  display: flex;
  height: ${({ height }: Props) => height || '24px'};
  justify-content: center;
  outline: none;
  padding: 0;
  transition: opacity 0.2s ease-in-out;
  width: ${({ width }: Props) => width || '24px'};
  &:active {
    opacity: 0.8;
  }
  &:hover {
    @media (min-width: 1025px) {
      opacity: 0.52;
    }
  }


  .bee-svg {
    height: 24px;
    width: 24px;
  }
`;

export default CloseButtonContainer;
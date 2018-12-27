import styled from 'styled-components';

import { color, typography } from 'styled/utils';

type CardContainerProps = Partial<{
  srcColor: string;
}>;

const Card = styled.div`
  align-items: center;
  background-color: ${color('white')};
  box-shadow: 0 4px 15px ${color('black', 0.1)};
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;


  .card-container {
    height: 100%;
    padding: 32px 32px 30px 56px;
    position: relative;
    width: 100%;
  }


  .close {
    align-items: center;
    color: ${color('upper')};
    cursor: pointer;
    display: flex;
    height: 56px;
    justify-content: center;
    opacity: 1;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s ease-in-out;
    width: 56px;
    z-index: 1;
    @media (min-width: 1025px) {
      &:hover {
        opacity: 0.5;
      }
    }
    .bee-svg {
      color: ${color('upper')};
      height: 24px;
      width: 24px;
    }
  }


  .complete-card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .icon-container {
      position: relative;
      color: ${({ srcColor }: CardContainerProps) => color(srcColor || 'upper')};
      margin-bottom: 8px;
      .bee-svg {
        height: 24px;
        left: -32px;
        position: absolute;
        transform: translate3d(0, -50%, 0);
        top: 50%;
        width: 24px;
      }
      h1 {
        ${typography('title', 3)}
        color: ${color('core')};
      }
    }
    p {
      ${typography('read', 1)}
      color: ${color('body')};
    }
    button {
      align-self: flex-end;
      width: auto;
    }
  }
`;

export default Card;


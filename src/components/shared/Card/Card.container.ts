import styled from 'styled-components';

import { color } from 'styled/utils';

type CardContainerProps = Partial<{
  srcColor: string;
  height: string;
  padding: string;
  width: string;
}>;

const Card = styled.div`
  align-items: center;
  background-color: ${color('white')};
  box-shadow: 0 4px 15px ${color('black', 0.1)};
  display: flex;
  height: ${({ height }: CardContainerProps) => height || '100%'};
  justify-content: center;
  padding: ${({ padding }: CardContainerProps) => padding || '40px'};
  position: relative;
  width: ${({ width }: CardContainerProps) => width || '100%'};


  .bee-close-button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
`;

export default Card;

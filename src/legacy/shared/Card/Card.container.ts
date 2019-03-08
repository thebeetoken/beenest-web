import styled from 'styled-components';

import { color } from 'styled/utils';

type CardContainerProps = Partial<{
  srcColor: string;
  height: string;
  padding: string;
  width: string;
}>;

const CardContainerMobile = styled.div`
  align-items: center;
  background-color: ${color('white')};
  box-shadow: 0 4px 15px ${color('black', 0.1)};
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: 24px;
  position: relative;
  width: 100vw;


  .bee-close-button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
`;

const CardContainerTablet = styled(CardContainerMobile)`
  @media (min-width: 768px) {
  }
`;

const CardContainer = styled(CardContainerTablet)`
  @media (min-width: 1025px) {
    height: ${({ height }: CardContainerProps) => height || '100%'};
    padding: ${({ padding }: CardContainerProps) => padding || '40px'};
    width: ${({ width }: CardContainerProps) => width || '100%'};
  }
`;

export default CardContainer;

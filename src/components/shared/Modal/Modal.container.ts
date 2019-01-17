import styled from "styled-components";
import { color } from "styled/color";

type Props = Partial<{
  align: string;
  direction: string;
  height: string;
  justify: string;
  width: string;
}>

const ModalContainer = styled.div`
  background-color: ${color('white')};
  box-shadow: 0 0 25px ${color('black', 0.1)};
  height: ${({ height }: Props) => height || 'auto'};
  position: relative;
  width: ${({ width }: Props) => width || 'auto'};


  .bee-close-button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
`;

/** @component */
export default ModalContainer;
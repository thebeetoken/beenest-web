import styled from "styled-components";
import { color } from 'styled/utils';

type Props = Partial<{
  background: string;
}>;

const FixedBottomBarContainer = styled.div`
  background-color: ${({ background }: Props) => (background ? color(background) : 'white')};
  height: 88px;
  left: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 101;
`;

export default FixedBottomBarContainer;

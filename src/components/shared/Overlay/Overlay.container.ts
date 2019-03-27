import styled from 'styled-components';
import { color, cover } from 'styled/utils';

type OverlayProps = Partial<{
  color: string;
  opacity: number;
}>;

const OverlayContainer = styled.div`
  ${cover(false, false)}
  height: 100%;
  width: 100%;
  z-index: 1;
  &::before {
    ${cover(true, false)}
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: ${(props: OverlayProps) => (props.color ? color(props.color, props.opacity) : 'transparent')}};
  }
`;

/** @component */
export default OverlayContainer;

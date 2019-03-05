import styled from 'styled-components';

type Props = Partial<{
  height?: string;
  position?: string;
  transition?: boolean;
  width?: string;
}>

const LazyImageContainer = styled.img`
  width: ${({ width }: Props) => width || '100%' };
  height: ${({ height }: Props) => height || '100%' };
  object-fit: cover;
  object-position: ${({ position }: Props) => position || 'top'};
  opacity: ${({ transition }: Props) => transition ? '0' : '1'};
  transition: all 0.5s ease-in-out;

  &.bee-lazy-image-loaded {
    opacity: 1;
  }
`;

/** @component */
export default LazyImageContainer;
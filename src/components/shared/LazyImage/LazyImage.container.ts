import styled from 'styled-components';

type Props = Partial<{
  position?: string;
  transition?: boolean;
}>

const LazyImageContainer = styled.img`
  width: 100%;
  height: 100%;
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
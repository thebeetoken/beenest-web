import * as React from 'react';

import CloseButton from 'components/CloseButton';
import Portal from 'components/Portal';
import ListingCarousel from './ListingCarousel';
import ListingCarouselPortalContainer from './CarouselPortal.container';

interface Props {
  onClose: () => void;
  photos: string[];
}

const CarouselPortal = ({ onClose, photos }: Props) => (
  <Portal color="black" opacity={0.75}>
    <ListingCarouselPortalContainer>
      <CloseButton onClose={onClose} />
      <ListingCarousel photos={photos} />
    </ListingCarouselPortalContainer>
  </Portal>
);

export default CarouselPortal;
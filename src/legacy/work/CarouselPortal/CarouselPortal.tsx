import * as React from 'react';

import CloseButton from 'components/shared/CloseButton';
import Portal from 'components/shared/Portal';
import ListingCarousel from 'legacy/routes/Listing/Listing/ListingCarousel';
import ListingCarouselPortalContainer from 'legacy/routes/Listing/Listing/ListingCarouselPortal.container';

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
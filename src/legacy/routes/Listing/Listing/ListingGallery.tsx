import * as React from 'react';

import ImageGrid from 'legacy/shared/ImageGrid';
import Button from 'components/shared/Button';
import { ToggleProvider, ToggleProviderRef } from 'components/shared/ToggleProvider';
import CloseButton from 'components/shared/CloseButton';
import Portal from 'components/shared/Portal';
import ListingCarousel from 'components/routes/Listing/Listing/ListingCarousel';

import ListingCarouselPortalContainer from './ListingCarouselPortal.container';

interface Props {
  listingPicUrl: string;
  photos: string[];
}

const ListingGallery = ({ listingPicUrl, photos }: Props) => {
  const images = [listingPicUrl].concat(photos);
  return (
    <div className="listing-gallery-container">
      <ToggleProvider>
        {({ show, toggle }: ToggleProviderRef) => (
          <>
            <ImageGrid images={images} onClick={toggle} />
            <div className="listing-gallery-container--btn-wrapper">
              <Button
                background="secondary"
                color="white"
                radius="4px"
                onClick={toggle}
                suffix="decorative/camera"
                textStyle="light-6">
                View Photos
              </Button>
            </div>
            {show && (
              <Portal color="black" opacity={0.75}>
                <ListingCarouselPortalContainer>
                  <CloseButton onClose={toggle} />
                  <ListingCarousel photos={photos} />
                </ListingCarouselPortalContainer>
              </Portal>
            )}
          </>
        )}
      </ToggleProvider>
    </div>
  );
};

export default ListingGallery;

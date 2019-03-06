import * as React from 'react';
import { Button, Row } from 'reactstrap';

import ImageGrid from 'legacy/shared/ImageGrid';
import CarouselPortal from 'legacy/work/CarouselPortal';

import { Listing } from 'networking/listings';

const ListingGallery = ({ listingPicUrl, photos }: Listing) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return <Row className="w-100 height-60vh px-0 mx-0 position-relative">
    <ImageGrid images={[listingPicUrl, ...photos]} />
    <Button className="position-absolute bottom-0 right-0 m-4" onClick={() => setOpen(true)}>
      View Photos <span className="fas fa-camera"></span>
    </Button>
    {isOpen && <CarouselPortal photos={[listingPicUrl, ...photos]} onClose={() => setOpen(false)} />}
  </Row>;
};

export default ListingGallery;

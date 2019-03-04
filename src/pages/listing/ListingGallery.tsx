import * as React from 'react';
import { Button, Modal, ModalHeader, Row } from 'reactstrap';

import ImageGrid from 'shared/ImageGrid';
import ListingCarousel from './ListingCarousel';

import { Listing } from 'networking/listings';

const ListingGallery = ({ listingPicUrl, photos }: Listing) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return <Row className="w-100 height-60vh px-0 mx-0 position-relative">
    <ImageGrid images={[listingPicUrl, ...photos]} />
    <Button className="position-absolute bottom-0 right-0 m-4" onClick={() => setOpen(true)}>
      View Photos <span className="fas fa-camera"></span>
    </Button>
    <Modal centered size="lg" isOpen={isOpen}>
      <ModalHeader toggle={() => setOpen(false)} />
      <ListingCarousel photos={[listingPicUrl, ...photos]} />
    </Modal>
  </Row>
};

export default ListingGallery;

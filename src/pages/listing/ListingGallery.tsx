import * as React from 'react';
import { Button, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import ImageGrid from 'shared/ImageGrid';
import ListingCarousel from './ListingCarousel';

import { Listing } from 'networking/listings';

const MODAL_CLASSES = {
  className: 'w-100 h-100 w-lg-75 h-lg-75 mw-100 mh-100 mx-auto my-0 my-lg-7 p-0',
  contentClassName: 'h-100 mh-100 w-100'
};

const ListingGallery = ({ listingPicUrl, photos }: Listing) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return <Row className="w-100 height-60vh px-0 mx-0 position-relative">
    <ImageGrid images={[listingPicUrl, ...photos]} />
    <Button className="position-absolute bottom-0 right-0 m-4" onClick={() => setOpen(true)}>
      View Photos <span className="fas fa-camera"></span>
    </Button>
    <Modal {...MODAL_CLASSES} isOpen={isOpen} toggle={() => setOpen(false)}>
      <ModalHeader toggle={() => setOpen(false)} />
      <ModalBody className="px-5 pt-0 pb-5">
        <ListingCarousel photos={[listingPicUrl, ...photos]} />
      </ModalBody>
    </Modal>
  </Row>
};

export default ListingGallery;

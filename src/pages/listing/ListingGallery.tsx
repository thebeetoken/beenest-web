import * as React from 'react';
import { Button, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import ImageGrid from 'components/shared/ImageGrid';
import CarouselPortal from 'legacy/work/CarouselPortal';
import ShareModal from 'legacy/work/ShareModal';

import { Listing } from 'networking/listings';

interface Props extends RouterProps, Listing { };

const ListingGallery = (props: Props) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [isModalOpen, setModal] = React.useState<boolean>(false);

  const { listingPicUrl, location, photos, title } = props;
  const listingLink = `https://beenest.com${location.pathname}`;
  return <Row className="w-100 height-60vh px-0 mx-0 position-relative">
    <ImageGrid images={[listingPicUrl, ...photos]} />
    <Button className="position-absolute top-0 right-0 m-4" color="primary" onClick={() => toggleModal()} type="button">
      <span className="far fa-share-square" />
    </Button>
    <ShareModal url={listingLink} toggle={toggleModal} isOpen={isModalOpen} title={title} />
    <Button className="position-absolute bottom-0 right-0 m-4" onClick={() => setOpen(true)}>
      View Photos <span className="fas fa-camera" />
    </Button>
    {isOpen && <CarouselPortal photos={[listingPicUrl, ...photos]} onClose={() => setOpen(false)} />}
  </Row>;

  function toggleModal() {
    setModal(!isModalOpen);
  }
};

export default withRouter(ListingGallery);

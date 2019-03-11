import * as React from 'react';
import { Button, Col, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { withRouter } from 'react-router-dom';

import ImageGrid from 'legacy/shared/ImageGrid';
import CarouselPortal from 'legacy/work/CarouselPortal';

import { Listing } from 'networking/listings';

interface Props extends RouterProps, Listing  { };

const ListingGallery = (props: Props) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [isModalOpen, setModal] = React.useState<boolean>(false);

  const { listingPicUrl, location, photos, title } = props;
  const listingLink = `https://beenest.com${location.pathname}`;
  return <Row className="w-100 height-60vh px-0 mx-0 position-relative">
    <ImageGrid images={[listingPicUrl, ...photos]} />
    <Button className="position-absolute top-0 right-0 m-4" color="primary" onClick={() => toggleModal()} type="button">
      <span className="far fa-share-square"></span>
    </Button>
    <Modal isOpen={isModalOpen} toggle={() => toggleModal()}>
      <ModalHeader className="text-primary" toggle={() => toggleModal()}>Share Listing</ModalHeader>
      <ModalBody>
        <Row className="d-flex align-items-center" noGutters>
          <Col xs="2" md="1">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${listingLink}&quote=${title}`} target="_blank">
              <Button className="btn btn-icon transition-3d-hover btn-facebook" size="sm" type="button">
                <span className="fab btn-icon__inner fab fa-facebook-f" />
              </Button>
            </a>
          </Col>
          <Col className="ml-lg-2">
            <h5 className="small mb-0">Facebook</h5>
          </Col>
        </Row>
        <Row className="d-flex align-items-center mt-3" noGutters>
          <Col xs="2" md="1">
            <a href={`https://twitter.com/intent/tweet?url=${listingLink}&text=${title}`} target="_blank">
              <Button className="btn btn-icon transition-3d-hover btn-twitter" size="sm" type="button">
                <span className="fab btn-icon__inner fab fa-twitter" />
              </Button>
            </a>
          </Col>
          <Col className="ml-lg-2">
            <h5 className="small mb-0">Twitter</h5>
          </Col>
        </Row>
        <Row className="d-flex align-items-center mt-3" noGutters>
          <Col xs="2" md="1">
            <CopyToClipboard text={listingLink}>
              <Button className="btn btn-icon transition-3d-hover" size="sm" type="button">
                <span className="fab btn-icon__inner far fa-copy" />
              </Button>
            </CopyToClipboard>
          </Col>
          <Col className="ml-lg-2">
            <h5 className="small mb-0">Copy Link</h5>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
    <Button className="position-absolute bottom-0 right-0 m-4" onClick={() => setOpen(true)}>
      View Photos <span className="fas fa-camera"></span>
    </Button>
    {isOpen && <CarouselPortal photos={[listingPicUrl, ...photos]} onClose={() => setOpen(false)} />}
  </Row>;

  function toggleModal() {
    setModal(!isModalOpen);
  }
};

export default withRouter(ListingGallery);

import * as React from 'react';
import { Button, Col, Modal, ModalHeader, Row } from 'reactstrap';

import { Listing } from 'networking/listings';
import { formatPrice } from 'utils/formatter';

import BookingCard from './BookingCard';

const BookingBar = (listing: Listing) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);

  return <Row className="w-100 p-2 align-items-center justify-content-between">
    <Col>
      From {formatPrice(listing.pricePerNightUsd)} per night
    </Col>
    <Button onClick={() => setOpen(true)}>
      Request to Book
    </Button>
    <Modal isOpen={isOpen} toggle={() => setOpen(false)}>
      <ModalHeader toggle={() => setOpen(false)}>
        {listing.title}
      </ModalHeader>
      <BookingCard {...listing} />
    </Modal>
  </Row>;
};

export default BookingBar;
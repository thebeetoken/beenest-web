import * as React from 'react';
import { Button, Col, Row } from 'reactstrap';

import { Listing } from 'networking/listings';
import { formatPrice } from 'utils/formatter';

const BookingBar = ({
  pricePerNightUsd
}: Listing) => (
  <Row className="w-100 p-2 align-items-center justify-content-between">
    <Col>
      {formatPrice(pricePerNightUsd)} per night
    </Col>
    <Button>Request to Book</Button>
  </Row>
);

export default BookingBar;
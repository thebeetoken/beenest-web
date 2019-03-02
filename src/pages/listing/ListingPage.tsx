import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import ListingGallery from './ListingGallery';
import ListingInformation from './ListingInformation';
import BookingCard from './BookingCard';

import { Listing } from 'networking/listings';

const ListingPage = (listing: Listing) => (
  <Row>
    <ListingGallery {...listing} />
    <Container>
      <Row>
        <Col>
          <ListingInformation {...listing} />
        </Col>
        <Col>
          <div className="sticky-top bee-top d-none d-lg-block">
            <BookingCard {...listing} />
          </div>
        </Col>
      </Row>
    </Container>
  </Row>
);
export default ListingPage;

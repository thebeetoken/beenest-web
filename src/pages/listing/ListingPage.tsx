import * as React from 'react';
import { Col, Container, Fade, Row } from 'reactstrap';

import ListingGallery from './ListingGallery';
import ListingInformation from './ListingInformation';
import BookingCard from './BookingCard';
import BookingBar from './BookingBar';

import { Listing } from 'networking/listings';

const ListingPage = (listing: Listing) => (
  <Fade>
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
    <footer className="fixed-bottom bg-white d-lg-none">
      <BookingBar {...listing} />
    </footer>
  </Fade>
);
export default ListingPage;

import * as React from 'react';
import { Col, Container, Fade, Row } from 'reactstrap';
import { Listing } from 'networking/listings';

import ListingGallery from './ListingGallery';
import ListingInformation from './ListingInformation';
import BookingCard from './BookingCard';
import BookingBar from './BookingBar';


const ListingPage = (listing: Listing) => (
  <Fade>
    <ListingGallery {...listing} />
    <Container className="pb-10 pb-lg-0">
      <Row>
        <Col className="pb-6 pb-lg-0">
          <ListingInformation {...listing} />
        </Col>
        <Col className="d-none d-lg-block">
          <div className="sticky-top bee-top d-none d-lg-block z-index-0 p-5">
            <BookingCard {...listing} />
          </div>
        </Col>
      </Row>
    </Container>
    <footer className="fixed-bottom bg-white shadow d-lg-none py-3 px-3 px-md-4">
      <BookingBar {...listing} />
    </footer>
  </Fade>
);
export default ListingPage;

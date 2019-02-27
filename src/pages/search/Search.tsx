import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import GoogleMapsWithMarkers from 'shared/GoogleMapsWithMarkers';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const TEST_LISTINGS = [
  {
    city: 'San Francisco',
    country: 'USA',
    id: 'foo',
    idSlug: 'fooooo',
    homeType: 'Hotel',
    lat: 37,
    lng: -117,
    listingPicUrl: 'https://apod.nasa.gov/apod/image/1902/MagneticOrion_EsoSofia_1833.jpg',
    pricePerNightUsd: 42,
    prices: [],
    sleepingArrangement: '2 Beds',
    state: 'CA',
    title: 'Actual nest of bees'
  },
  {
    city: 'San Francisco',
    country: 'USA',
    id: 'foo',
    idSlug: 'fooooo',
    homeType: 'Hotel',
    lat: 37,
    lng: -117,
    listingPicUrl: 'https://apod.nasa.gov/apod/image/1902/MagneticOrion_EsoSofia_1833.jpg',
    pricePerNightUsd: 42,
    prices: [],
    sleepingArrangement: '2 Beds',
    state: 'CA',
    title: 'Actual nest of bees'
  }
];

const Search = () => {
  return (
    <>
      <Header />
      <Container className="min-vh-100 h-100 px-0" fluid>
        <Row>
          <Col className="p-5">
            Search bar goes here...
          </Col>
        </Row>
        <Row className="min-vh-100 h-100 px-0">
          <Col>
            <SearchForm />
            <SearchResults listings={TEST_LISTINGS} />
          </Col>
          <Col>
            <GoogleMapsWithMarkers className="w-100 h-100 pb-9" listings={[]} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Search;

import * as React from 'react';
import { Col, Row } from 'reactstrap';

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
    title: 'Actual nest of actual terrifying bees'
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
    title: 'Actual nest of beeeeeeeees'
  }
];

const Search = () => {
  return (
    <>
      <Header />
      <Row className="px-0 mx-0">
        <Col className="p-5">
          Search bar goes here...
        </Col>
      </Row>
      <Row className="min-vh-100 h-100 px-0 mx-0">
        <Col className="px-0">
          <SearchForm />
          <SearchResults listings={TEST_LISTINGS} />
        </Col>
        <Col className="px-0">
          <GoogleMapsWithMarkers className="w-100 h-100 pb-9" listings={[]} />
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Search;

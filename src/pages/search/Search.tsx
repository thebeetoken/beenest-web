import * as React from 'react';
import { Col, Row } from 'reactstrap';

import GoogleMapsWithMarkers from 'shared/GoogleMapsWithMarkers';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';

import SearchBar from 'components/work/SearchBar';
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
    lat: 36,
    lng: -116,
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
      <Row className="px-0 mx-0 bg-white" style={{ position: 'sticky', top: '4.125rem', zIndex: 2 }}>
        <Col className="p-5">
          <SearchBar />
        </Col>
      </Row>
      <Row className="min-vh-100 h-100 px-0 mx-0">
        <Col md="12" lg="5" xl="4" className="px-5">
          <div className="d-none"> {/* TODO: Show search filters */}
            <SearchForm />
            <div className="mb-5" />
          </div>
          <SearchResults listings={TEST_LISTINGS} />
        </Col>
        <Col md="0" lg="7" xl="8" className="px-0 d-md-none d-lg-block">
          <div className="w-100" style={{ height: 'calc(100vh - 11.25rem)', position: 'sticky', top: '11.25rem', zIndex: 1 }}>
            <GoogleMapsWithMarkers className="w-100 h-100" listings={TEST_LISTINGS} />
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Search;

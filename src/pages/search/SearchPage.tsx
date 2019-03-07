import * as React from 'react';
import { Col, Fade, Row } from 'reactstrap';

import { Listing } from 'networking/listings';

import GoogleMapsWithMarkers from 'shared/GoogleMapsWithMarkers';

import SearchBar from 'components/work/SearchBar';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

interface Props {
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: number;
  listings: Listing[];
}

const SearchPage = (props: Props) => <Fade>
  <Row className="px-0 mx-0 bg-white bee-top">
    <Col className="p-5" xs="12" lg="10" xl="9">
      <SearchBar />
    </Col>
  </Row>
  <Row className="min-vh-100 h-100 px-0 mx-0">
    <Col md="12" lg="5" xl="4" className="px-5">
      <Row className="mb-5">
        <SearchForm />
      </Row>
      <SearchResults {...props} />
    </Col>
    <Col md="0" lg="7" xl="8" className="px-0 d-md-none d-lg-block">
      <div className="w-100 sticky-top bee-top bee-search-map z-index-0">
        <GoogleMapsWithMarkers className="w-100 h-100" listings={props.listings} />
      </div>
    </Col>
  </Row>
</Fade>;

export default SearchPage;

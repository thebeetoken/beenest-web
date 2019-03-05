import * as React from 'react';
import { Col, Fade, Row } from 'reactstrap';

import { Listing } from 'networking/listings';

import GoogleMapsWithMarkers from 'shared/GoogleMapsWithMarkers';

import SearchBar from 'legacy/work/SearchBar';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

interface Props {
  listings: Listing[];
}

const SearchPage = ({ listings }: Props) => <Fade>
  <Row className="px-0 mx-0 bg-white bee-top">
    <Col className="p-5" xs="12" lg="10" xl="9">
      <SearchBar />
    </Col>
  </Row>
  <Row className="min-vh-100 h-100 px-0 mx-0">
    <Col md="12" lg="5" xl="4" className="px-5">
      <div className="d-none"> {/* TODO: Show search filters */}
        <SearchForm />
        <div className="mb-5" />
      </div>
      <SearchResults listings={listings} />
    </Col>
    <Col md="0" lg="7" xl="8" className="px-0 d-md-none d-lg-block">
      <div className="w-100 sticky-top bee-top bee-search-map">
        <GoogleMapsWithMarkers className="w-100 h-100" listings={listings} />
      </div>
    </Col>
  </Row>
</Fade>;

export default SearchPage;

import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import GoogleMapsWithMarkers from 'shared/GoogleMapsWithMarkers';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';

import SearchForm from './SearchForm';

const Search = () => {
  return (
    <>
      <Header />
      <Container className="min-vh-100 h-100 px-0" fluid>
        <Row>
          <Col className="p-5">
          <!-- TODO: Use SearchBar from https://github.com/thebeetoken/beenest-web/pull/206 -->
            Search bar goes here...
          </Col>
        </Row>
        <Row className="min-vh-100 h-100 px-0">
          <Col>
            <SearchForm />
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

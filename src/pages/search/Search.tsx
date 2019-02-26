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
        <Row className="min-vh-100 h-100 px-0">
          <Col>
            <SearchForm />
          </Col>
          <Col>
            <GoogleMapsWithMarkers className="w-100 h-100" listings={[]} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Search;

import * as React from 'react';
import { Col, Row } from 'reactstrap';
	
import Footer from 'components/work/Footer';
import Header from 'components/work/Header';

const Listing = () => (
  <>
    <Header />
    <Row className="w-100">
      <Col>Hello, Listing.</Col>
    </Row>
    <Footer />
  </>
);

export default Listing;

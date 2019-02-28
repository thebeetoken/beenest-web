import * as React from 'react';
import { Col, Fade, Row } from 'reactstrap';
	
import Footer from 'components/work/Footer';
import Header from 'components/work/Header';

const Listing = () => (
  <Fade>
    <Header />
    <Row className="w-100">
      <Col>Hello, Listing.</Col>
    </Row>
    <Footer />
  </Fade>
);

export default Listing;

import * as React from 'react';
import { Button, Card, CardBody, Col, Container, Fade } from 'reactstrap';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Container tag={Fade} className="bee-without-header-height-container p-0" fluid>
    <div
      className="bg-img-hero d-flex flex-column align-items-center justify-content-center bee-without-header-height-container gradient-overlay-half-primary-v1"
      style={{ backgroundImage: `url('https://static.beenest.com/images/app/misc/painted-ladies2.jpg')` }}>
      <Col md="7" lg="4" className="p-2 p-md-0">
      <Card tag={Fade} className="bg-white border-0">
        <CardBody className="d-flex flex-column align-items-center">
          <h1 className="display-4 font-size-md-down-5 text-primary px-4">404</h1>
          <p className="text-center">Sorry, the page you were looking for was not found.</p>
          <Link to="/work">
            <Button
              className="btn-primary transition-3d-hover w-100"
              type="button"
              color="primary">
              Back to home
            </Button>
          </Link>
        </CardBody>
      </Card>
      </Col>
    </div>
  </Container>
);

export default NotFound
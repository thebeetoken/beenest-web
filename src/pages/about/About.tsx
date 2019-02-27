import * as React from 'react';
import { Button, Col, Container, Fade, Row } from 'reactstrap';

import SimpleHeader from 'components/work/SimpleHeader';
import { SETTINGS } from 'configs/settings';

const { BEENEST_HOST } = SETTINGS;

const About = () => (
  <Fade>
    <SimpleHeader white />
    <Container className="min-vh-100 px-0" fluid>
      <div
        className="bg-img-hero d-flex align-items-center justify-content-center gradient-overlay-half-primary-v1 min-vh-100"
        style={{ backgroundImage: `url('https://static.beenest.com/images/app/misc/painted-ladies2.jpg')` }}>
        <Row className="d-flex flex-column align-items-center justify-content-center mx-0">
          <Col xs="12" md="8" lg="6" className="d-lg-flex align-items-center justify-content-center flex-column">
            <h1 className="display-4 font-size-md-down-5 text-white text-md-center px-lg-4">About Beenest</h1>
            <p className="text-white font-weight-light text-md-center px-lg-4">
              Our mission is to reinvent business travel, starting with accommodations. Beenest helps you find high quality, conveniently located hotels and homes in major cities around the world.
            </p>
            <Button
              type="button"
              onClick={() => window.location.href = `${BEENEST_HOST}/work`}
              className="w-100 w-lg-50 transition-3d-hover"
              color="primary">
              Back to Home
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  </Fade>
);

export default About;
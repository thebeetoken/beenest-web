import * as React from 'react';
import { Col, Container, Fade, Row } from 'reactstrap';

import TeamCard from 'legacy/work/TeamCard';

import { teamMembers } from './about.config';

const About = () => (
  <Fade>
    <Container className="min-vh-100 px-0" fluid>
      <div
        className="bg-img-hero d-flex align-items-center justify-content-center gradient-overlay-half-primary-v1"
        style={{ backgroundImage: `url('https://static.beenest.com/images/app/misc/painted-ladies2.jpg')`, height: '72vh' }}>
        <Row className="d-flex flex-column align-items-center justify-content-center mx-0">
          <Col xs="12" md="8" lg="6" className="d-lg-flex align-items-center justify-content-center flex-column">
            <h1 className="display-4 font-size-md-down-5 text-white text-md-center px-lg-4">About Beenest</h1>
            <p className="text-white font-weight-light text-md-center px-lg-4">
              Our mission is to reinvent business travel, starting with accommodations. Beenest helps you find high quality, conveniently located hotels and homes in major cities around the world.
            </p>
          </Col>
        </Row>
      </div>

      <Container className="py-8">
        <Row className="d-flex flex-column align-items-center justify-content-center w-100 m-0">
          <h1 className="display-4 font-size-md-down-5 text-md-center mb-8">The Team</h1>
          <Row className="w-100 justify-content-around">
            {teamMembers.map(member => (
              <Col md="5" lg="4" key={member.name}>
                <TeamCard {...member} />
              </Col>
            ))}
          </Row>
        </Row>
      </Container>
    </Container>
  </Fade>
);

export default About;
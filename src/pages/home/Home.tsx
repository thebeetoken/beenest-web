import * as React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

import { guestValueProps, HomeUser, hostValueProps } from './home.config';
import { JUMBOTRON_STYLES, CONTENT_CLASSES } from './home.styled';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';
import Jumbotron from 'components/work/Jumbotron';
import ValuePropCard from 'components/work/ValuePropCard';

const Home = () => {
  const [isGuestActive, setGuestActive] = React.useState<Boolean>(true);

  return (
    <>
      <Header />
      <Container className="min-vh-100 h-100 px-0" fluid>
        <Jumbotron fluid>
          <div
            className="bg-img-hero d-flex align-items-center justify-content-center gradient-overlay-half-primary-v1"
            style={JUMBOTRON_STYLES}
          >
            <Row className="d-flex flex-column align-items-center justify-content-center mx-0">
              <h1 className="display-4 font-size-md-down-5 font-weight-medium text-white px-4">
                Planning a Business Trip?
              </h1>
              <p className="text-white font-weight-light px-4">
                Beenest is the easiest way for business travelers to book a home or rental.
              </p>
            </Row>
          </div>
        </Jumbotron>

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center mt-7 mt-md-9">
          <Col xs="8" md="3" lg="2">
            <Button
              className="rounded btn-block"
              onClick={() => setActiveClass(HomeUser.GUEST)}
              color={isGuestActive ? 'primary' : 'soft-primary'}
            >
              I'm a Traveler
            </Button>
          </Col>
          <Col xs="8" md="3" lg="2" className="mt-4 mt-md-0">
            <Button
              className="rounded btn-block"
              onClick={() => setActiveClass(HomeUser.HOST)}
              color={isGuestActive ? 'soft-primary' : 'primary'}
            >
              I'm a Host
            </Button>
          </Col>
        </div>

        {isGuestActive ? <HomeGuests /> : <HomeHosts />}
      </Container>
      <Footer />
    </>
  );

  function setActiveClass(user: HomeUser) {
    if (user === HomeUser.GUEST) return setGuestActive(true);

    return setGuestActive(false);
  }
};

const HomeGuests = () => (
  <>
    <Container className={CONTENT_CLASSES.CONTENT_1.LAYOUT}>
      <h2 className={CONTENT_CLASSES.CONTENT_1.TITLE}>Tired of finding a good place to stay?</h2>
      <p className={CONTENT_CLASSES.CONTENT_1.SUBTITLE}>Worry not, here you can find the best place for your next business trip.</p>
      <Row className={CONTENT_CLASSES.CONTENT_2.LAYOUT}>
        {guestValueProps.map(card => (
          <Col xs="12" md="6" lg="4" key={card.title}>
            <ValuePropCard src={card.src} center className={card.className} title={card.title} body={card.body} />
          </Col>
        ))}
      </Row>
    </Container>
    <Container fluid />
  </>
);

const HomeHosts = () => (
  <>
    <Container className={CONTENT_CLASSES.CONTENT_1.LAYOUT}>
      <h2 className={CONTENT_CLASSES.CONTENT_1.TITLE}>Want to rent out your homes to professionals?</h2>
      <p className={CONTENT_CLASSES.CONTENT_1.SUBTITLE}>Here, your guests will be business travelers so don’t worry about parties.</p>
      <Row className={CONTENT_CLASSES.CONTENT_2.LAYOUT}>
        {hostValueProps.map(card => (
          <Col xs="12" md="6" lg="4" key={card.title}>
            <ValuePropCard src={card.src} center className={card.className} title={card.title} body={card.body} />
          </Col>
        ))}
      </Row>
    </Container>
    <Container fluid />
  </>
);

export default Home;

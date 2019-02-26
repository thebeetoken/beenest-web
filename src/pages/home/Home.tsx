import * as React from 'react';
import { Button, Col, Container, Jumbotron, Row } from 'reactstrap';

import { affiliations, guestValueProps, HomeUser, hostValueProps, testimonials } from './home.config';
import { AFFILIATE_CLASSES, CONTENT_CLASSES, JUMBOTRON_STYLES, TESTIMONIAL_CLASSES } from './home.styled';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';
import TestimonialCard from 'components/work/TestimonialCard';
import ValuePropCard from 'components/work/ValuePropCard';

const Home = () => {
  const [isGuestActive, setGuestActive] = React.useState<Boolean>(true);

  return (
    <>
      <Header />
      <Container className="min-vh-100 h-100 px-0" fluid>
        <Jumbotron className="p-0" fluid>
          <div
            className="bg-img-hero d-flex align-items-center justify-content-center gradient-overlay-half-primary-v1"
            style={JUMBOTRON_STYLES}
          >
            <Row className="d-flex flex-column align-items-center justify-content-center mx-0">
              <h1 className="display-4 font-size-md-down-5 text-white px-4">Planning a Business Trip?</h1>
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

        <Container className="my-10 pb-lg-4">
          <h2 className={CONTENT_CLASSES.TITLE}>Partners</h2>
          <p className={`${CONTENT_CLASSES.SUBTITLE} mb-5 mb-md-0 mb-lg-3`}>
            Beenest has been featured in the following news and magazines.
          </p>
          <Row className="py-4 py-md-10 home-affiliations">
            {affiliations.map((affiliate) => (
              <Col className={AFFILIATE_CLASSES} key={affiliate.href}>
                <a href={affiliate.href} target="_blank">
                  {affiliate.svg}
                </a>
              </Col>
            ))}
          </Row>
        </Container>
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
    <Container className={CONTENT_CLASSES.FEATURES_CONTAINER.LAYOUT}>
      <h2 className={CONTENT_CLASSES.TITLE}>Tired of finding a good place to stay?</h2>
      <p className={CONTENT_CLASSES.SUBTITLE}>
        Worry not, here you can find the best place for your next business trip.
      </p>

      <Row className={CONTENT_CLASSES.FEATURES.LAYOUT}>
        {guestValueProps.map(card => (
          <Col xs="12" md="6" lg="4" key={card.title}>
            <ValuePropCard src={card.src} center className={CONTENT_CLASSES.FEATURES.COLUMN_LAYOUT} title={card.title} body={card.body} />
          </Col>
        ))}
      </Row>
    </Container>

    <Container className={`${CONTENT_CLASSES.FEATURES_CONTAINER.LAYOUT} position-relative`} fluid>
      <h2 className={CONTENT_CLASSES.TITLE}>"Booking for my buisness trip was never easier."</h2>
      <p className={CONTENT_CLASSES.SUBTITLE}>
        Real guests, Real stories.
      </p>
      <Container className="mt-8">
        <Row className="home-testimonials">
          {testimonials.map((testimonial) => (
            <Col md="6" lg="3" className={TESTIMONIAL_CLASSES} key={testimonial.title}>
              <TestimonialCard
                title={testimonial.title}
                subtitle={testimonial.subtitle}
                body={testimonial.body}
                src={testimonial.src} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  </>
);

const HomeHosts = () => (
  <>
    <Container className={CONTENT_CLASSES.FEATURES_CONTAINER.LAYOUT}>
      <h2 className={CONTENT_CLASSES.TITLE}>Want to rent out your homes to professionals?</h2>
      <p className={CONTENT_CLASSES.SUBTITLE}>
        Here, your guests will be business travelers so don’t worry about parties.
      </p>

      <Row className={CONTENT_CLASSES.FEATURES.LAYOUT}>
        {hostValueProps.map(card => (
          <Col xs="12" md="6" lg="4" key={card.title}>
            <ValuePropCard src={card.src} center className={CONTENT_CLASSES.FEATURES.COLUMN_LAYOUT} title={card.title} body={card.body} />
          </Col>
        ))}
      </Row>

      <Container className={`${CONTENT_CLASSES.FEATURES_CONTAINER.LAYOUT} position-relative`} fluid>
        <h2 className={CONTENT_CLASSES.TITLE}>"Booking for my buisness trip was never easier."</h2>
        <p className={CONTENT_CLASSES.SUBTITLE}>
          Real guests, Real stories.
      </p>
        <Container className="mt-8">
          <Row className="home-testimonials">
            {testimonials.map((testimonial) => (
              <Col md="6" lg="3" key={testimonial.title}>
                <TestimonialCard
                  className={TESTIMONIAL_CLASSES}
                  title={testimonial.title}
                  subtitle={testimonial.subtitle}
                  body={testimonial.body}
                  src={testimonial.src} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </Container>
  </>
);

export default Home;

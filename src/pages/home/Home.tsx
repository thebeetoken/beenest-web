import * as React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

import { affiliations, guestValueProps, HomeUser, hostValueProps, testimonials } from './home.config';
import { AFFILIATE_CLASSES, CONTENT_CLASSES, TESTIMONIAL_CLASSES } from './home.styled';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';
import SearchBar from 'components/work/SearchBar';
import Jumbotron from 'components/work/Jumbotron';
import TestimonialCard from 'components/work/TestimonialCard';
import ValuePropCard from 'components/work/ValuePropCard';
import { FLEX_CENTER } from 'styled/sharedClasses/layout';

const Home = () => {
  const [isGuestActive, setGuestActive] = React.useState<Boolean>(true);

  return (
    <>
      <Header />
      <Container className="min-vh-100 h-100 px-0" fluid>
        <Jumbotron fluid>
          <div
            className="bee-home-hero-img bg-img-hero d-flex flex-column align-items-center justify-content-center height-md-60vh gradient-overlay-half-primary-v1 pt-8 pb-6 pt-md-0 pb-md-0"
            style={{ backgroundImage: `url('https://static.beenest.com/images/app/misc/painted-ladies2.jpg')` }}>
            <Row className="d-flex flex-column align-items-center justify-content-center mx-0">
              <h1 className="display-4 font-size-md-down-5 text-white px-4">Planning a Business Trip?</h1>
              <p className="text-white font-weight-light px-4">
                Beenest is the easiest way for business travelers to book a home or rental.
              </p>
            </Row>

            <Row className={`${FLEX_CENTER} d-flex w-100 w-md-65 mt-4 px-4 px-md-0`}>
              <SearchBar />
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
          <Row className="py-4 py-md-10 bee-home-affiliations">
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
        <Row className="bee-home-testimonials">
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
          <Row className="bee-home-testimonials">
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

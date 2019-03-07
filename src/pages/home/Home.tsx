import * as React from 'react';
import { Button, Col, Container, Fade, Jumbotron, Row } from 'reactstrap';

import { affiliations, guestValueProps, HomeUser, hostValueProps, testimonials } from './home.config';

import SearchBar from 'components/work/SearchBar';
import TestimonialCard from 'components/work/TestimonialCard';
import ValuePropCard from 'components/work/ValuePropCard';
import { AFFILIATE_CLASSES, CONTENT_CLASSES, JUMBOTRON_CLASSES, TESTIMONIAL_CLASSES } from 'styled/custom.styled';
import { FLEX_CENTER } from 'styled/sharedClasses/layout';

const Home = () => {
  const [isGuestActive, setGuestActive] = React.useState<boolean>(true);

  return (
    <>
      <Container tag={Fade} className="min-vh-100 h-100 px-0" fluid>
        <Jumbotron className="p-0" fluid>
          <div
            className={JUMBOTRON_CLASSES}
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

        <Container className={`${CONTENT_CLASSES.FEATURES_CONTAINER.LAYOUT} position-relative`} fluid>
          <h3 className={CONTENT_CLASSES.TITLE}>"Booking for my buisness trip was never easier."</h3>
          <p className={CONTENT_CLASSES.SUBTITLE}>
            Real users, Real stories.
          </p>
          <Container className="mt-6 mt-lg-8">
            <Row className="bee-home-testimonials align-items-start justify-content-around">
              {testimonials.map((testimonial) => {
                if (testimonial.link) {
                  return (
                    <Col md="6" lg="3" className={TESTIMONIAL_CLASSES} key={testimonial.title}>
                      <a href={testimonial.link} target="_blank">
                        <TestimonialCard
                          title={testimonial.title}
                          subtitle={testimonial.subtitle}
                          body={testimonial.body}
                          src={testimonial.src} />
                      </a>
                    </Col>
                  );
                }
                return (
                  <Col md="6" lg="3" className={TESTIMONIAL_CLASSES} key={testimonial.title}>
                    <TestimonialCard
                      title={testimonial.title}
                      subtitle={testimonial.subtitle}
                      body={testimonial.body}
                      src={testimonial.src} />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </Container>


        <Container className="my-10 pb-lg-4">
          <h3 className={CONTENT_CLASSES.TITLE}>Partners</h3>
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
    </>
  );

  function setActiveClass(user: HomeUser) {
    if (user === HomeUser.GUEST) return setGuestActive(true);

    return setGuestActive(false);
  }
};

const HomeGuests = () => (
  <Fade>
    <Container className={CONTENT_CLASSES.FEATURES_CONTAINER.LAYOUT}>
      <h3 className={CONTENT_CLASSES.TITLE}>Tired of finding a good place to stay?</h3>
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
  </Fade>
);

const HomeHosts = () => (
  <Fade>
    <Container tag={Fade} className={CONTENT_CLASSES.FEATURES_CONTAINER.LAYOUT}>
      <h3 className={CONTENT_CLASSES.TITLE}>Want to rent out your homes to professionals?</h3>
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
    </Container>
  </Fade>
);

export default Home;

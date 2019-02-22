import * as React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

import { guestValueProps, HomeUser, hostValueProps } from './home.config';
import { JUMBOTRON_STYLES, CONTENT_CLASSES, AFFILIATE_CLASSES } from './home.styled';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';
import Jumbotron from 'components/work/Jumbotron';
import ValuePropCard from 'components/work/ValuePropCard';
import { ForbesSVG, HuffPostSVG, FastCompanySvg, IncSVG, SFChronicalSVG } from 'shared/svgComponents/SvgComponents';
import { FLEX_CENTER } from 'styled/sharedClasses/layout';

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

        <Container className="my-10 pb-lg-10">
          <h2 className={CONTENT_CLASSES.TITLE}>Partners</h2>
          <p className={`${CONTENT_CLASSES.SUBTITLE} mb-5 mb-md-0 mb-lg-3`}>
            Beenest has been featured in the following news and magazines.
          </p>
          <Row className="py-4 py-md-10">
            <Col className={AFFILIATE_CLASSES}>
              <a
                href="https://www.forbes.com/sites/lorihil/2018/02/15/a-more-secure-way-to-home-share-blockchain-technology/#3891384c5e8b"
                target="_blank"
              >
                <ForbesSVG />
              </a>
            </Col>
            <Col className={AFFILIATE_CLASSES}>
              <a
                href="https://www.huffingtonpost.com/entry/brain-drain-uber-google-facebook-engineers-create_us_5a4d4965e4b0df0de8b06f18"
                target="_blank"
              >
                <HuffPostSVG />
              </a>
            </Col>
            <Col className={AFFILIATE_CLASSES}>
              <a
                href="https://www.fastcompany.com/40524021/on-this-blockchain-based-version-of-airbnb-theres-no-middleman"
                target="_blank"
              >
                <FastCompanySvg />
              </a>
            </Col>
            <Col className={AFFILIATE_CLASSES}>
              <a
                href="https://www.inc.com/darren-heitner/how-this-entrepreneur-is-fixing-250-billion-sharing-economy-with-blockchain-technology.html"
                target="_blank"
              >
                <IncSVG />
              </a>
            </Col>
            <Col className={FLEX_CENTER}>
              <a
                href="https://www.sfchronicle.com/business/article/Bitcoin-ethereum-can-pay-for-home-rentals-12526206.php"
                target="_blank"
              >
                <SFChronicalSVG />
              </a>
            </Col>
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
            <ValuePropCard src={card.src} center className={card.className} title={card.title} body={card.body} />
          </Col>
        ))}
      </Row>
    </Container>

    {/* <Container className="p-0 mt-10" fluid>
      <div className="bg-img-hero d-flex" style={CONTENT_3_STYLES} />
    </Container> */}
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
            <ValuePropCard src={card.src} center className={card.className} title={card.title} body={card.body} />
          </Col>
        ))}
      </Row>
    </Container>

    {/* <Container className="p-0 mt-10" fluid>
      <div className="bg-img-hero d-flex" style={CONTENT_3_STYLES} />
    </Container> */}
  </>
);

export default Home;

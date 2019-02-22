import * as React from 'react';
import { Container, Row } from 'reactstrap';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';
import Jumbotron from 'components/work/Jumbotron';

const style = {
  backgroundImage: `url('https://static.beenest.com/images/app/misc/painted-ladies2.jpg')`,
  height: '80vh',
};

const Home = () => {
  return (
    <>
      <Header />
      <Container className="height-100vh px-0" fluid>
        <Jumbotron fluid>
          <div className="bg-img-hero d-flex align-items-center justify-content-center gradient-overlay-half-primary-v1" style={style}>
            <Row className="d-flex flex-column align-items-center justify-content-center mx-0">
              <h1 className="custom-font-size-4 custom-font-size-md-6 text-white px-4">Planning a Business Trip?</h1>
              <p className="text-white font-weight-light px-4">Beenest is the easiest way for business travelers to book a home or rental.</p>
            </Row>
          </div>
        </Jumbotron>
      </Container>
      <Footer />
    </>
  );
};

export default Home;

import * as React from 'react';
import { Container } from 'reactstrap';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';

const Home = () => {
  return (
    <>
      <Header />
      <Container className="min-vh-100 h-100 px-0" fluid>
      </Container>
      <Footer />
    </>
  );
};

export default Home;

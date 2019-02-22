import * as React from 'react';
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';

interface State {
  isOpen: boolean;
}

class Home extends React.Component<State> {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    return (
      <>
        <Header />
        <div className="height-100vh">
          <Jumbotron>
            <Container>
              <Row>
                <Col>
                  <h1>Welcome to React</h1>
                  <p>
                    <Button tag="a" color="success" size="large" href="http://reactstrap.github.io" target="_blank">
                      View Reactstrap Docs
                    </Button>
                  </p>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;

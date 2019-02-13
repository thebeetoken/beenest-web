import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import AuthenticationHeader from 'components-work/AuthenticationHeader';
import LoginForm from './LoginForm';
import LoginTestimonals from './LoginTestimonials';

class Login extends React.Component {
  render() {
    return (
      <Container className="d-flex align-items-center position-relative height-lg-100vh px-0" fluid>
        <AuthenticationHeader />
        <LoginTestimonals />
        <LoginContent />
      </Container>
    );
  }
}

const LoginContent = () => (
  <Container>
    <Row noGutters>
      <Col
        className="space-3 space-lg-0"
        md={{ size: 8, offset: 2 }}
        lg={{ size: 7, offset: 2 }}
        xl={{ size: 6, offset: 3 }}
      >
        <LoginForm />
      </Col>
    </Row>
  </Container>
);

export default Login;

import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Redirect, RouteProps } from 'react-router-dom';

import AuthenticationHeader from 'components-work/AuthenticationHeader';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import AudioLoading from 'shared/loading/AudioLoading';

import LoginForm from './LoginForm';
import LoginTestimonals from './LoginTestimonials';

const Login = (props: RouteProps) => (
  <FirebaseConsumer>
    {({ loading, user }: FirebaseUserProps) => {
      if (loading) {
        return (
          <Container className="d-flex align-items-center justify-content-center position-relative height-lg-100vh">
            <AudioLoading height={64} width={128} />
          </Container>
        );
      }

      if (user) {
        const state = (props.location && props.location.state) || {};
        const destination = state.referrer || '/work';
        return <Redirect to={destination} />;
      }
      return (
        <Container className="d-flex align-items-center position-relative height-lg-100vh px-0" fluid>
          <AuthenticationHeader />
          <LoginTestimonals />
          <LoginContent />
        </Container>
      );
    }}
  </FirebaseConsumer>
);

const LoginContent = () => (
  <Container>
    <Row noGutters>
      <Col
        className="space-2 space-md-3 space-lg-0"
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

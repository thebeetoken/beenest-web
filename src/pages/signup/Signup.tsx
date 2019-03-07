import * as React from 'react';
import { Col, Container, Fade, Row } from 'reactstrap';
import { Redirect, RouteProps } from 'react-router-dom';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import LoadingTakeover from 'shared/loading/LoadingTakeover';
import { AUTH_CONTAINER, AUTH_CONTENT } from 'styled/sharedClasses/authentication';

import SignupForm from './SignupForm';

const Signup = (props: RouteProps) => (
  <FirebaseConsumer>
    {({ loading, user }: FirebaseUserProps) => {
      if (loading) return <LoadingTakeover />;

      if (user) {
        const state = (props.location && props.location.state) || {};
        const destination = state.referrer || '/work';
        return <Redirect to={destination} />;
      }
      return (
        <Container className={AUTH_CONTAINER} fluid>
          <SignupContent />
        </Container>
      );
    }}
  </FirebaseConsumer>
);

const SignupContent = () => (
  <Container tag={Fade}>
    <Row className="justify-content-center" noGutters>
      <Col
        className={AUTH_CONTENT}
        md="8"
        lg="5"
        xl="6">
        <SignupForm />
      </Col>
    </Row>
  </Container>
);

export default Signup;

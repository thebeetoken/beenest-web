import * as React from 'react';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { Redirect, RouteProps } from 'react-router-dom';

import AuthHeader from 'components/work/AuthHeader';
import UserTestimonials from 'components/work/UserTestimonials';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { AUTHENTICATION_CONTAINER, AUTHENTICATION_CONTENT } from 'styled/sharedClasses/authentication';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';

import SignupForm from './SignupForm';

const Signup = (props: RouteProps) => (
  <FirebaseConsumer>
    {({ loading, user }: FirebaseUserProps) => {
      if (loading) {
        return (
          <Container className={VIEWPORT_CENTER_LAYOUT}>
            <Spinner color="primary" style={{ width: '8rem', height: '8rem' }} type="grow" />
          </Container>
        );
      }

      if (user) {
        const state = (props.location && props.location.state) || {};
        const destination = state.referrer || '/work';
        return <Redirect to={destination} />;
      }
      return (
        <Container className={AUTHENTICATION_CONTAINER} fluid>
          <AuthHeader />
          <UserTestimonials />
          <SignupContent />
        </Container>
      );
    }}
  </FirebaseConsumer>
);

const SignupContent = () => (
  <Container>
    <Row noGutters>
      <Col
        className={AUTHENTICATION_CONTENT}
        md={{ size: 8, offset: 2 }}
        lg={{ size: 7, offset: 2 }}
        xl={{ size: 6, offset: 3 }}
      >
        <SignupForm />
      </Col>
    </Row>
  </Container>
);

export default Signup;

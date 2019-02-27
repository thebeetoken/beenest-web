import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Redirect, RouteProps } from 'react-router-dom';

import SimpleHeader from 'components/work/SimpleHeader';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import Loading from 'shared/loading/Loading';
import { AUTH_CONTAINER, AUTH_CONTENT } from 'styled/sharedClasses/authentication';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';

import SignupForm from './SignupForm';

const Signup = (props: RouteProps) => (
  <FirebaseConsumer>
    {({ loading, user }: FirebaseUserProps) => {
      if (loading) {
        return (
          <Container className={VIEWPORT_CENTER_LAYOUT}>
            <Loading height="8rem" width="8rem" />
          </Container>
        );
      }

      if (user) {
        const state = (props.location && props.location.state) || {};
        const destination = state.referrer || '/work';
        return <Redirect to={destination} />;
      }
      return (
        <Container className={AUTH_CONTAINER} fluid>
          <SimpleHeader primary />
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
        className={AUTH_CONTENT}
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

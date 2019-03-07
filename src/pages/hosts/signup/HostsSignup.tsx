import * as React from 'react';
import { Col, Container, Fade, Row } from 'reactstrap';
import { Redirect, RouteProps } from 'react-router-dom';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import LoadingTakeover from 'legacy/shared/loading/LoadingTakeover';
import { AUTH_CONTENT } from 'styled/sharedClasses/authentication';


import HostsSignupForm from './HostsSignupForm';

const HostsSignup = (props: RouteProps) => (
  <FirebaseConsumer>
    {({ loading, user }: FirebaseUserProps) => {
      if (loading) return <LoadingTakeover />;

      if (user) {
        const state = (props.location && props.location.state) || {};
        const destination = state.referrer || '/';
        return <Redirect to={destination} />;
      }
      return (
        <Container className="d-flex flex-column flex-lg-row align-items-center position-relative px-0 pb-4 pb-md-0 min-vh-100" fluid>
          <HostsSignupContent />
        </Container>
      );
    }}
  </FirebaseConsumer>
);

const HostsSignupContent = () => (
  <Container className="d-flex align-items-center justify-content-center min-vh-100 pt-4 pt-md-0" tag={Fade}>
    <Row className="justify-content-center w-100" noGutters>
      <Col
        className={AUTH_CONTENT}
        md="8"
        lg="5"
        xl="6">
        <HostsSignupForm />
      </Col>
    </Row>
  </Container>
);

export default HostsSignup;

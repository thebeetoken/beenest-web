import * as React from 'react';
import { Col, Container, Fade } from 'reactstrap';

import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = () => (
  <Container tag={Fade} className="min-vh-100 p-0" fluid>
    <div
      className="bg-img-hero d-flex flex-column align-items-center justify-content-center min-vh-100 gradient-overlay-half-primary-v1"
      style={{ backgroundImage: `url('https://static.beenest.com/images/app/misc/painted-ladies2.jpg')` }}>
      <Col md="7" lg="4" className="p-2 p-md-0">
        <ForgotPasswordForm />
      </Col>
    </div>
  </Container>
);

export default ForgotPassword;
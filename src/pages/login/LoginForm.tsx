import * as React from 'react';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';


const LoginForm = () => (
  <Form className="mt-5">
    <div className="mb-7">
      <h2 className="h3 text-primary font-weight-normal mb-0">Welcome <span className="font-weight-semi-bold">back</span></h2>
      <p>Login to manage your account</p>
    </div>
    
    <FormGroup>
      <Label for="loginEmail" className="form-label">
        Email Address
      </Label>
      <Input
        type="email"
        name="name"
        id="loginEmail"
        placeholder="Email address"
        invalid={false}
      />
      <FormFeedback invalid>Email is invalid</FormFeedback>
    </FormGroup>

    <FormGroup>
      <Label for="loginPassword" className="form-label">
        <span className="d-flex justify-content-between align-items-center">
          Password <a className="link-muted text-capitalize font-weight-normal" href="/work">Forgot Password?</a>
        </span>
      </Label>
      <Input
        type="password"
        name="password"
        id="loginPassword"
        placeholder="********"
        invalid={false}
      />
      <FormFeedback invalid>Something went wrong! Please make sure your password is correct.</FormFeedback>
    </FormGroup>
    <Row className="align-items-center mb-5">
      <Col xs="6">
      <span className="small text-muted">Don't have an account?</span> <a className="small" href="/">Signup</a>
      </Col>
      <Col xs="6" className="text-right">
        <Button type="submit" color="primary" className="btn-primary transition-3d-hover">
          Get Started
        </Button>
      </Col>
    </Row>
  </Form>
);

export default LoginForm;

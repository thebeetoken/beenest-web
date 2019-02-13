import * as React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
} from 'reactstrap';
import { Route, Redirect, Switch } from 'react-router';
import NotFound from 'components/routes/NotFound';
import WorkAccountGeneral from './WorkAccountGeneral';
import WorkAccountPayment from './WorkAccountPayment';
import WorkAccountSecurity from './WorkAccountSecurity';
import WorkAccountVerification from './WorkAccountVerification';

class WorkAccount extends React.Component<any> {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="inverse" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Container>
          <div>
            <h1>Profile</h1>
            <hr />
            <Nav>
              <NavItem>
                <NavLink href="/work/account/general">General Info</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/work/account/payment">Payment</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/work/account/security">Security</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/work/account/verification">Verification</NavLink>
              </NavItem>
            </Nav>

            <Switch>
              <Route exact path="/work/account/general" render={() => <WorkAccountGeneral />} />
              <Route exact path="/work/account/payment" render={() => <WorkAccountPayment />} />
              <Route exact path="/work/account/security" component={WorkAccountSecurity} />
              <Route exact path="/work/account/verification" component={WorkAccountVerification} />
              <Redirect exact from="/work/account" to="/work/account/general" />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Container>

      </div>
    );
  }
}

export default WorkAccount;

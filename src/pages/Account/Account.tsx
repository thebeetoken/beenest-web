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
} from 'reactstrap';
import { Route, Redirect, Switch } from 'react-router';
import NotFound from 'components/routes/NotFound';
import AccountGeneral from './AccountGeneral';
import AccountPayment from './AccountPayment';
import AccountSecurity from './AccountSecurity';
import AccountVerification from './AccountVerification';

class Account extends React.Component<any> {
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
                <NavLink href="/account/general">General Info</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/account/payment">Payment</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/account/security">Security</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/account/verification">Verification</NavLink>
              </NavItem>
            </Nav>

            <Switch>
              <Route exact path="/account/general" render={() => <AccountGeneral />} />
              <Route exact path="/account/payment" render={() => <AccountPayment />} />
              <Route exact path="/account/security" component={AccountSecurity} />
              <Route exact path="/account/verification" component={AccountVerification} />
              <Redirect exact from="/account" to="/account/general" />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Container>

      </div>
    );
  }
}

export default Account;

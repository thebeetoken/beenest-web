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
              <Route exact path="/work/account/general" render={() => <h1>This is the General Info Page</h1>} />
              <Route exact path="/work/account/payment" render={() => <h1>This is the Payment Page</h1>} />
              <Route exact path="/work/account/security" component={() => <h1>This is the Security Page</h1>} />
              <Route exact path="/work/account/verification" component={() => <h1>This is the Verification Page</h1>} />
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

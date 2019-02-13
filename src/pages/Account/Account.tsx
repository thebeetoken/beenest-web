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
  Col,
  Row,
} from 'reactstrap';
import { Route, Redirect, Switch } from 'react-router';
import NotFound from 'components/routes/NotFound';
import AccountGeneral from './AccountGeneral';
import AccountPayment from './AccountPayment';
import AccountSecurity from './AccountSecurity';
import AccountVerification from './AccountVerification';
import { GET_ACCOUNT_PAGE } from 'networking/users';
import { Query } from 'react-apollo';
import AudioLoading from 'shared/loading/AudioLoading';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';

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

        <Query query={GET_ACCOUNT_PAGE}>
          {({ loading, error, data }) => {
            if (loading) {
              return <AudioLoading height={48} width={96} />;
            }
            if (error || !data) {
              return <h1>{error ? error.message : 'Error / No Data'}</h1>;
            }
            const { user } = data;
            return (
              <Container>
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
                
                <Container>
                  <Row>
                    <Col md={6}>
                      <hr />
                      <Switch>
                        <Route exact path="/work/account/general" render={(props: RouterProps) => <AccountGeneral {...props} user={user} />} />
                        <Route exact path="/work/account/payment" render={() => <AccountPayment />} />
                        <Route exact path="/work/account/security" component={AccountSecurity} />
                        <Route exact path="/work/account/verification" component={AccountVerification} />
                        <Redirect exact from="/work/account" to="/work/account/general" />
                        <Route component={NotFound} />
                      </Switch>
                    </Col>
                  </Row>
                </Container>
              </Container>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default () => (
  <FirebaseConsumer>
    {({ user, loading }: FirebaseUserProps) => {
      if (loading) {
        return null;
      }
      return user ? <Account /> : <Redirect to="/login" />;
    }}
  </FirebaseConsumer>
);

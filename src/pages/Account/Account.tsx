import * as React from 'react';
import { Nav, NavItem, NavLink, Container, Col, Row } from 'reactstrap';
import { Query } from 'react-apollo';
import { Route, Redirect, Switch } from 'react-router';
import { NavLink as RRNavLink } from 'react-router-dom';
import { GET_ACCOUNT_PAGE } from 'networking/users';

import AudioLoading from 'shared/loading/AudioLoading';
import NotFound from 'components/routes/NotFound';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';

import AccountGeneral from './AccountGeneral';
import AccountPayment from './AccountPayment';
import AccountSecurity from './AccountSecurity';
import AccountVerification from './AccountVerification';

const Account = () => {
  return (
    <Query query={GET_ACCOUNT_PAGE}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AudioLoading height={48} width={96} />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }

        const { creditBalance, user } = data;
        return (
          <Container>
            <h1>Profile</h1>
            <hr />
            <Nav tabs>
              {[
                {
                  tag: RRNavLink,
                  to: '/work/account/general',
                  title: 'General Info',
                },
                {
                  tag: RRNavLink,
                  to: '/work/account/payment',
                  title: 'Payment',
                },
                {
                  tag: RRNavLink,
                  to: '/work/account/security',
                  title: 'Security',
                },
                {
                  tag: RRNavLink,
                  to: '/work/account/verification',
                  title: 'Verification',
                },
              ].map(({ title, tag, to }) => (
                <NavItem>
                  <NavLink tag={tag} to={to}>
                    {title}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>

            <Container>
              <Row>
                <Col md={6}>
                  <hr />
                  <Switch>
                    <Route
                      exact
                      path="/work/account/general"
                      render={(props: RouterProps) => <AccountGeneral {...props} user={user} />}
                    />
                    <Route
                      exact
                      path="/work/account/payment"
                      render={(props: RouterProps) => <AccountPayment {...props} creditBalance={creditBalance} />}
                    />
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
  );
};

export default () => (
  <FirebaseConsumer>
    {({ user, loading }: FirebaseUserProps) => {
      if (loading) {
        return null;
      }
      return user ? <Account /> : <Redirect to="/work/login" />;
    }}
  </FirebaseConsumer>
);

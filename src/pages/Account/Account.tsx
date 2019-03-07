import * as React from 'react';
import { Nav, NavItem, NavLink, Container, Col, Fade, Row, Badge } from 'reactstrap';
import { Query } from 'react-apollo';
import { Route, Redirect, Switch } from 'react-router';
import { NavLink as RRNavLink } from 'react-router-dom';
import { GET_ACCOUNT_PAGE } from 'networking/users';

import LoadingTakeover from 'shared/loading/LoadingTakeover';
import NotFound from 'components/routes/NotFound';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';

import AccountGeneral from './AccountGeneral';
import AccountPayment from './AccountPayment';
import AccountSecurity from './AccountSecurity';
import AccountVerification from './AccountVerification';
import ProfilePhotoUploader from 'components/work/ProfilePhotoUploader';

const Account = () => {
  return (
    <Query query={GET_ACCOUNT_PAGE}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingTakeover />;

        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }

        const { creditBalance, user } = data;
        return (
          <Container className="pt-8 pb-6" tag={Fade}>
            <h1>Profile</h1>
            <hr />
            <Nav className="mb-5 w-lg-50" tabs>
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
                <NavItem key={to}>
                  <NavLink
                    className="d-flex align-items-center"
                    tag={tag}
                    to={to}>
                    {title}
                    {title === 'Verification'
                      && !user.completedVerification
                      && <Badge className="ml-2" color="danger">!</Badge>}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>

            <Container tag={Fade}>
              <Row className="flex-column-reverse flex-md-row">
                <Col md="6" className="mb-5">
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
                <Col md="4" className="d-flex justify-content-center mb-3 mb-md-0 offset-md-1">
                  <ProfilePhotoUploader profilePicUrl={user.profilePicUrl} />
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

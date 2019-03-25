import * as React from 'react';
import { Redirect, Route, Switch, NavLink as RRNavLink } from 'react-router-dom';

import HostBookings from './HostBookings';
import HostListings from './HostListings';
import HostPayments from './HostPayments';

import NotFound from 'pages/admin/NotFound';
import AuthenticatedRoute from 'HOCs/AuthenticatedRoute';
import { compose, graphql } from 'react-apollo';
import { CREATE_LISTING, Listing, GET_HOST_LISTINGS } from 'networking/listings';
import { getFriendlyErrorMessage } from 'utils/validators';
import { Container, Row, Col, Fade, Button, Nav, NavItem, NavLink } from 'reactstrap';

interface Props extends RouterProps {
  createListing: () => Promise<Listing>;
}

const HostPage = ({ createListing, history }: Props) => {
  const [isCreateListingClicked, setCreateListingClicked] = React.useState<boolean>(false);
  const HOST_ROUTES = [
    {
      to: '/host/bookings',
      title: 'Bookings',
      component: <HostBookings />,
    },
    {
      to: '/host/listings',
      title: 'Listings',
      component: <HostListings createListing={handleNewListingClick} />,
    },
    {
      to: '/host/payments',
      title: 'Payments',
      component: <HostPayments />,
    },
  ];

  return (
    <Container className="pt-8 pb-10 mb-6" tag={Fade}>
      <Row>
        <Col>
          <h1 className="mb-0">Host Profile</h1>
        </Col>
        <Col md="4" lg="3" xl="2" className="mt-2 mt-md-0 d-flex align-items-center justify-content-end">
          <Button
            block
            disabled={isCreateListingClicked}
            onClick={handleNewListingClick}>
            Add New Listing
          </Button>
        </Col>
      </Row>
      <hr />
      <Nav className="mb-5" tabs>
        {HOST_ROUTES.map(({ title, to }) => (
          <NavItem key={to}>
            <NavLink
              tag={RRNavLink}
              to={to}>
              {title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
        <Switch>
          {HOST_ROUTES.map(({ component, to }) => (
            <AuthenticatedRoute key={to} exact path={to} component={() => component} />
          ))}
          <Redirect from="/host" to="/host/listings" />
          <Route component={NotFound} />
        </Switch>
    </Container>
  );

  function handleNewListingClick() {
    setCreateListingClicked(true);
    createListing()
      .then((response: any) => {
        const { id } = response.data.createListing;
        setCreateListingClicked(false);
        history.push(`/host/listings/${id}/edit`);
      })
      .catch((error: Error) => {
        console.error(error);
        setCreateListingClicked(false);
        alert(`There was a problem creating this listing: ${getFriendlyErrorMessage(error)}`);
      });
  }
}

export default compose(
  graphql(CREATE_LISTING, {
    props: ({ mutate }: any) => ({
      createListing: () => {
        return mutate({
          refetchQueries: [{ query: GET_HOST_LISTINGS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
              return;
            }
            const { createListing } = data;
            const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
            store.writeQuery({
              query: GET_HOST_LISTINGS,
              data: {
                hostListings: [ createListing, ...hostListings ],
              },
            });
          },
        });
      },
    }),
  })
)(HostPage);

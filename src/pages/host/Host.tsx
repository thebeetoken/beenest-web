import * as React from 'react';
import { Redirect, Route, Switch, NavLink as RRNavLink } from 'react-router-dom';
import { Listing, CREATE_LISTING, GET_HOST_LISTINGS } from 'networking/listings';
import { Container, Fade, Button, NavItem, NavLink, Nav, Row, Col } from 'reactstrap';
import AuthenticatedRoute from 'HOCs/AuthenticatedRoute';
import NotFound from '../notFound';
import { compose, graphql } from 'react-apollo';
import { getFriendlyErrorMessage } from 'utils/validators';

interface Props extends RouterProps {
  createListing: () => Promise<Listing>;
}

const Host = ({ createListing, history }: Props) => {
  const [isCreateListingClicked, setCreateListingClicked] = React.useState<boolean>(false);

  return (
    <Container className="pt-8 pb-6" tag={Fade}>
      <Row>
        <Col>
          <h1 className="mb-0">Host Profile</h1>
        </Col>
        <Col md="4" lg="3" xl="2" className="d-flex align-items-center justify-content-end">
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
        {[
          {
          to: '/work/host/bookings',
            title: 'Bookings',
          },
          {
            to: '/work/host/listings',
            title: 'Listings',
          },
          {
            to: '/work/host/payments',
            title: 'Payments',
          },
        ].map(({ title, to }) => (
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
          <AuthenticatedRoute exact path="/work/host/bookings" component={() => <h1>This is Host Bookings</h1>} />
          <AuthenticatedRoute exact path="/work/host/listings" render={() => <h1>This is Host Listings</h1>} />
          <AuthenticatedRoute exact path="/work/host/payments" component={() => <h1>This is Host Payments</h1>} />
          <Redirect from="/work/host" to="/work/host/listings" />
          <Route component={NotFound} />
        </Switch>
    </Container>
  );

  function handleNewListingClick() {
    setCreateListingClicked(true);
    createListing()
      .then((response: any) => {
        const { id } = response.data.createListing;
        history.push(`/work/host/listings/${id}/edit`);
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
)(Host);

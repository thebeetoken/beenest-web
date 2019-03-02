import * as React from 'react';
import { Nav, NavItem, NavLink, Container, Col, Row } from 'reactstrap';
import { Query, compose, graphql } from 'react-apollo';
import { Route, Redirect, Switch } from 'react-router';
import { NavLink as RRNavLink } from 'react-router-dom';

import AudioLoading from 'shared/loading/AudioLoading';
import NotFound from 'components/routes/NotFound';
import { GET_GUEST_SORTED_BOOKINGS, Booking, Currency, GUEST_CANCEL_BOOKING } from 'networking/bookings';
import { differenceInDays } from 'date-fns';
import { cancel, loadWeb3 } from 'utils/web3';

const Trips = () => {
  return (
    <Query query={GET_GUEST_SORTED_BOOKINGS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AudioLoading height={48} width={96} />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }

        const { cancelled, current, past, upcoming } = data;
        const isCurrentEmpty = !(current || []).length;
        // const isUpcomingEmpty = !(upcoming || []).length;
        return (
          <Container>
            <h1>Trips</h1>
            <hr />
            <Nav tabs>
              {[
                {
                  to: '/work/trips/current',
                  title: 'Current',
                },
                {
                  to: '/work/trips/upcoming',
                  title: 'Upcoming',
                },
                {
                  to: '/work/trips/past',
                  title: 'Past',
                },
                {
                  to: '/work/trips/cancelled',
                  title: 'Cancelled',
                },
              ].map(({ title, to }) => (
                <NavItem key={to}>
                  <NavLink tag={RRNavLink} to={to}>
                    {title}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>

            <Container>
              <Row>
                <Col md="6">
                  <Switch>
                    <Route
                      exact
                      path="/work/trips/current"
                      component={() => (
                        <>
                          <h1>This is the current page</h1>
                          <p>{JSON.stringify(current)}</p>
                        </>
                      )}
                    />
                    <Route
                      exact
                      path="/work/trips/upcoming"
                      component={() => (
                        <>
                          <h1>This is the upcoming page</h1>
                          <p>{JSON.stringify(upcoming)}</p>
                        </>
                      )}
                    />
                    <Route
                      exact
                      path="/work/trips/past"
                      component={() => (
                        <>
                          <h1>This is the past page</h1>
                          <p>{JSON.stringify(past)}</p>
                        </>
                      )}
                    />
                    <Route
                      exact
                      path="/work/trips/cancelled"
                      component={() => (
                        <>
                          <h1>This is the cancelled page</h1>
                          <p>{JSON.stringify(cancelled)}</p>
                        </>
                      )}
                    />
                    <Redirect exact from="/work/trips" to={isCurrentEmpty ? "/work/trips/upcoming" : "/work/trips/current"} />
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

export default compose(
  graphql(GUEST_CANCEL_BOOKING, {
    props: ({ mutate }: any) => ({
      cancelBooking: async (booking: Booking) => {
        const { id, currency, checkInDate, status } = booking;
        const days = differenceInDays(checkInDate, Date.now());
        if (currency === Currency.BEE && days >= 7 && status === 'guest_paid') {
          const web3 = loadWeb3();
          await cancel(web3.eth, id);
        }
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_GUEST_SORTED_BOOKINGS }],
          update: (store: any, { data: guestCancelBooking }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.allBookings) {
              return;
            }
            const { allBookings } = store.readQuery({ query: GET_GUEST_SORTED_BOOKINGS });
            const index = allBookings.findIndex((booking: Booking) => booking.id === id);
            allBookings[index].status = guestCancelBooking.status;
            store.writeQuery({ query: GET_GUEST_SORTED_BOOKINGS, data: allBookings });
          },
        });
      },
    }),
  })
)(Trips);

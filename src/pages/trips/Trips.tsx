import * as React from 'react';
import { Nav, NavItem, NavLink, Container, Col, Row, CardDeck, Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Query, compose, graphql } from 'react-apollo';
import { Route, Redirect, Switch } from 'react-router';
import { NavLink as RRNavLink } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import { cancel, loadWeb3 } from 'utils/web3';
import { GET_GUEST_SORTED_BOOKINGS, Booking, Currency, GUEST_CANCEL_BOOKING } from 'networking/bookings';

import NotFound from 'components/routes/NotFound';
import Loading from 'components/shared/loading/Loading';
import ActiveTripCard from 'components/work/ActiveTripCard';
import { AlertProperties } from 'components/work/Alert/Alert';
import LoadingPortal from 'components/shared/LoadingPortal';

interface Props {
  cancelBooking: (booking: Booking) => Promise<void>;
}

enum ModalType {
  CANCEL_BOOKING = 'CANCEL_BOOKING',
  CONTACT_HOST = 'CONTACT_HOST',
}


const Trips = ({ cancelBooking }: Props) => {
  const [modal, setModal] = React.useState<ModalType | undefined>(undefined);
  const [alert, setAlert] = React.useState<AlertProperties>({ color: '', msg: '', show: false });
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  const [currency, setCurrency] = React.useState<Currency | null>(Currency.USD);
  
  
  return (
    <Query query={GET_GUEST_SORTED_BOOKINGS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }

        const { cancelled, current, past, upcoming } = data;
        const isCurrentEmpty = !(current || []).length;
        // const isUpcomingEmpty = !(upcoming || []).length;
        return (
          <>
            <Container>
              <h1>Trips</h1>
              <hr />
              <Nav tabs>
                {[
                  {
                    tag: RRNavLink,
                    to: '/work/trips/current',
                    title: 'Current',
                  },
                  {
                    tag: RRNavLink,
                    to: '/work/trips/upcoming',
                    title: 'Upcoming',
                  },
                  {
                    tag: RRNavLink,
                    to: '/work/trips/past',
                    title: 'Past',
                  },
                  {
                    tag: RRNavLink,
                    to: '/work/trips/cancelled',
                    title: 'Cancelled',
                  },
                ].map(({ title, tag, to }) => (
                  <NavItem key={to}>
                    <NavLink tag={tag} to={to}>
                      {title}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
              
              <Alert
                color={alert.color}
                isOpen={alert.show}>
                {alert.msg}
              </Alert>

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
                      <CardDeck>
                        <Row>
                          {past.map((booking: Booking) => {
                            return (
                              <Col key={booking.id} md="6" lg="4">
                                <ActiveTripCard
                                  booking={booking}
                                  onCancelClick={handleCancelBooking} />
                              </Col>
                            );
                          })}
                        </Row>
                      </CardDeck>
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
            </Container>

            {/* {modal === ModalType.CANCEL_BOOKING &&
              <Modal isOpen toggle={handleModalAction}>
                <ModalHeader>Cancel Booking</ModalHeader>
                <ModalBody>
                  <h1>Some Basic Are You Sure You Want To Cancel</h1>
                </ModalBody>
              </Modal>
            } */}

            {/* {modal === ModalType.CONTACT_HOST &&
              <Modal isOpen toggle={handleModalAction}>
                <ModalHeader>Contact Host</ModalHeader>
                <ModalBody>
                  <ContactHostForm booking={booking} onClose={handleModalAction} />
                </ModalBody>
              </Modal>
            } */}

            {isSubmitting && <LoadingPortal currency={currency} />}
          </>
        );
      }}
    </Query>
  );

  function handleCancelBooking(booking: Booking) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setSubmitting(true);
      cancelBooking(booking)
        .then(() => {
          setCurrency(booking.currency);
          setAlert({
            ...alert,
            msg: 'Your booking has been cancelled',
            show: true,
          });
        })
        .catch((error: Error) => {
          setAlert({
            ...alert,
            msg: `There was an error processing your request.  ${error.message}`,
            show: true,
          });
        })
        .finally(() => setSubmitting(false));
    }
  };

  function handleModalAction(modal?: ModalType) {
    setModal(modal);
  }
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

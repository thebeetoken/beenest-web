import * as React from 'react';
import { Nav, NavItem, NavLink, Container, Col, Row, Alert, Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
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
import ContactHostFormModal from 'components/work/ContactHostFormModal';

interface Props {
  cancelBooking: (booking: Booking) => Promise<void>;
}

enum ModalType {
  CANCEL_BOOKING = 'CANCEL_BOOKING',
  CONTACT_HOST = 'CONTACT_HOST',
}

function Trips({ cancelBooking }: Props) {
  const [modal, setModal] = React.useState<ModalType | undefined>(undefined);
  const [alert, setAlert] = React.useState<AlertProperties>({ color: '', msg: '', show: false });
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  const [booking, setBooking] = React.useState<Booking | undefined>(undefined);
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
              <Nav className="mb-5" tabs>
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
                isOpen={alert.show}
                toggle={() => setAlert({ ...alert, show: !alert.show })}>
                {alert.msg}
              </Alert>

              <Switch>
                <Route
                  exact
                  path="/work/trips/current"
                  component={() => (
                    <Container fluid>
                      <Row>
                        {current.map((booking: Booking) => {
                          return (
                            <Col key={booking.id} className="d-flex" md="6" lg="4">
                              <ActiveTripCard
                                key={booking.id}
                                booking={booking}
                                handleModalAction={(modal: ModalType) => handleModalAction(modal, booking)} />
                            </Col>
                          );
                        })}
                      </Row>
                    </Container>
                  )}
                />
                <Route
                  exact
                  path="/work/trips/upcoming"
                  component={() => (
                    <Container fluid>
                      <Row>
                        {upcoming.map((booking: Booking) => {
                          return (
                            <Col key={booking.id} className="d-flex" md="6" lg="4">
                              <ActiveTripCard
                                key={booking.id}
                                booking={booking}
                                handleModalAction={(modal: ModalType) => handleModalAction(modal, booking)} />
                            </Col>
                          );
                        })}
                      </Row>
                    </Container>
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

            {modal === ModalType.CANCEL_BOOKING &&
              <Modal isOpen toggle={handleModalAction}>
                <ModalHeader>Cancel Booking</ModalHeader>
                <ModalBody>
                  <h6>Are you sure you want to cancel this booking?</h6>
                  {booking && <h6>{`Booking: ${booking.id}`}</h6>}
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => handleModalAction()}>Back</Button>{' '}
                  <Button color="danger" onClick={() => handleCancelBooking()}>Yes, Cancel Booking</Button>
                </ModalFooter>
              </Modal>
            }

            {modal === ModalType.CONTACT_HOST &&
              <ContactHostFormModal booking={booking} handleModalAction={handleModalAction} />
            }

            {isSubmitting && <LoadingPortal currency={currency} />}
          </>
        );
      }}
    </Query>
  );

  function handleCancelBooking() {
    if (!booking) return;

    setSubmitting(true);
    cancelBooking(booking)
      .then(() => {
        setCurrency(booking.currency);
        setAlert({
          color: 'success',
          msg: 'Your booking has been cancelled',
          show: true,
        });
        setModal(undefined);
      })
      .catch((error: Error) => {
        setAlert({
          color: 'danger',
          msg: `There was an error processing your request.  ${error.message}`,
          show: true,
        });
      })
      .finally(() => setSubmitting(false));
  };

  function handleModalAction(modal?: ModalType, booking?: Booking) {
    setBooking(booking);
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

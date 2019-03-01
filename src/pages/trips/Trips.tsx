import * as React from 'react';
import { Nav, NavItem, NavLink, Container, Col, Row, Alert, Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import { Query } from 'react-apollo';
import { Route, Redirect, Switch } from 'react-router';
import { NavLink as RRNavLink } from 'react-router-dom';
import { GET_GUEST_SORTED_BOOKINGS, Booking, Currency, GUEST_CANCEL_BOOKING } from 'networking/bookings';

import NotFound from 'components/routes/NotFound';
import Loading from 'components/shared/loading/Loading';
import ActiveTripCard from 'components/work/ActiveTripCard';
import { AlertProperties } from 'components/work/Alert/Alert';
import LoadingPortal from 'components/shared/LoadingPortal';
import ContactHostFormModal from 'components/work/ContactHostFormModal';
import CancelBookingModal from 'components/work/CancelBookingModal.tsx';

enum ModalType {
  CANCEL_BOOKING = 'CANCEL_BOOKING',
  CONTACT_HOST = 'CONTACT_HOST',
}

function Trips() {
  const [modal, setModal] = React.useState<ModalType | undefined>(undefined);
  const [alert, setAlert] = React.useState<AlertProperties>({ color: '', msg: '', show: false });
  const [booking, setBooking] = React.useState<Booking | undefined>(undefined);

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
              <CancelBookingModal booking={booking} handleModalAction={handleModalAction} setAlert={setAlert}/>
            }

            {modal === ModalType.CONTACT_HOST &&
              <ContactHostFormModal booking={booking} handleModalAction={handleModalAction} />
            }
          </>
        );
      }}
    </Query>
  );

  function handleModalAction(modal?: ModalType, booking?: Booking) {
    setBooking(booking);
    setModal(modal);
  }
};

export default Trips;

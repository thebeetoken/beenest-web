import * as React from 'react';
import { Query, graphql } from 'react-apollo';
import differenceInDays from 'date-fns/difference_in_days';

import AudioLoading from 'shared/loading/AudioLoading';
import {
  Booking,
  Currency,
  GET_GUEST_SORTED_BOOKINGS,
  GUEST_CANCEL_BOOKING
} from 'networking/bookings';
import Divider from 'shared/Divider';
import GeneralWrapper from 'shared/GeneralWrapper';

import TripsContainer from './Trips.container';
import ActiveTripCard from 'routes/Trips/ActiveTripCard';
import { compose } from 'recompose';
import Snackbar from 'shared/Snackbar';
import ExpiredTripCard from 'routes/Trips/ExpiredTripCard';
import { cancel, loadWeb3 } from 'utils/web3';
import Button from 'shared/Button';
import BeeLink from 'shared/BeeLink';
import CryptoPortal from 'shared/CryptoPortal';
import ReusableNavBar from 'shared/ReusableNavBar';
import { Switch, Route, Redirect } from 'react-router';
import NotFound from 'components/routes/NotFound';
import StartedTripCard from 'components/routes/Trips/StartedTripCard';

interface Props {
  cancelBooking: (booking: Booking) => Promise<void>;
}

interface State {
  message: string;
  open: boolean;
  isSubmitting: boolean;
}

class Trips extends React.Component<Props, State> {
  readonly state = {
    message: '',
    open: false,
    isSubmitting: false,
  };

  render() {
    const { message, open, isSubmitting } = this.state;
    return (
      <TripsContainer>
        <GeneralWrapper className="trips-body" width="100%">
          <div className="trips-header">
            <h1>My Trips</h1>
            <Divider size="tall"/>
          </div>
          <Query query={GET_GUEST_SORTED_BOOKINGS}>
            {({ loading, error, data }) => {
              if (loading) {
                return <AudioLoading height={48} width={96} />;
              }
              if (error || !data) {
                return <h1>{error ? error.message : 'Error / No Data'}</h1>;
              }
              const { cancelled, current, past, started, upcoming } = data;
              const isCurrentEmpty = !(current || []).length;
              const isUpcomingEmpty = !(upcoming || []).length;
              return (
                <>
                  <ReusableNavBar config={[
                    {
                      title: 'Current',
                      to: '/trips/current',
                    },
                    {
                      title: 'Upcoming',
                      to: '/trips/upcoming',
                    },
                    {
                      title: 'Past',
                      to: '/trips/past',
                    },
                    {
                      title: 'Cancelled /\nRejected',
                      to: '/trips/cancelled',
                    }
                  ]} />
                  <div className="trip-cards-container">
                    <Switch>
                      <Route exact path="/trips/current" component={() =>
                        <>
                          {!!started.length &&
                            <>
                              <div className="started-trip-container">
                                <h3>Finish this booking:</h3>
                                <StartedTripCard
                                  trip={started[0]} />
                              </div>
                              <Divider size="tall" />
                              <h2>Current bookings:</h2>
                            </>
                          }
                          {!!current.length &&
                            <section className="active-cards-container">
                              {current.map((trip: Booking) =>
                                <ActiveTripCard 
                                  onCancelClick={this.handleCancelBooking.bind(this, trip)}
                                  key={trip.id}
                                  trip={trip} />
                              )}
                            </section>
                          }
                        </>
                      } />
                      <Route exact path="/trips/upcoming" component={() =>
                        <>
                          {isUpcomingEmpty
                            ?
                              <div className="trips-book-now">
                                <div className="trips-book-now--text">
                                  <h2>You haven't booked any trips yet.</h2>
                                  <BeeLink to="/">Let's change that!</BeeLink>
                                </div>
                                <BeeLink to="/">
                                  <Button radius="4px">Book a Home Today!</Button>
                                </BeeLink>
                              </div>
                            :
                              <section className="active-cards-container">
                                {upcoming.map((trip: Booking) => (
                                  <ActiveTripCard
                                    onCancelClick={this.handleCancelBooking.bind(this, trip)}
                                    key={trip.id}
                                    trip={trip}
                                  />
                                ))}
                              </section>
                          }
                        </>
                      } />
                      <Route exact path="/trips/past" component={() =>
                        <>
                          {!!past.length && (
                            <section className="expired-trip-cards">
                              {past.map((trip: Booking) => (
                                <ExpiredTripCard key={trip.id} trip={trip} />
                              ))}
                            </section>
                          )}
                        </>
                      } />
                      <Route exact path="/trips/cancelled" component={() =>
                        <>
                          {!!cancelled.length && (
                            <section className="expired-trip-cards">
                              {cancelled.map((trip: Booking) => (
                                <ExpiredTripCard key={trip.id} trip={trip} />
                              ))}
                            </section>
                          )}
                        </>
                      } />
                      <Redirect exact from="/trips" to={isCurrentEmpty ? "/trips/upcoming" : "/trips/current"} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                  {isSubmitting && <CryptoPortal />}
                  {open && (
                    <Snackbar autoHideDuration={5000} open={open} onClose={this.closeSnackbar}>
                      {message}
                    </Snackbar>
                  )}
                </>
              );
            }}
          </Query>
        </GeneralWrapper>
      </TripsContainer>
    );
  }

  closeSnackbar = () => {
    this.setState({ open: false });
  };

  handleCancelBooking = (booking: Booking) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.setState({ isSubmitting: true });
      this.props
        .cancelBooking(booking)
        .then(() => {
          this.setState({
            message: 'Your booking has been cancelled',
            open: true,
            isSubmitting: false,
          });
        })
        .catch((error: Error) => {
          this.setState({
            message: `There was an error processing your request.  ${error.message}`,
            open: true,
            isSubmitting: false,
          });
        });
    }
  };
}

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

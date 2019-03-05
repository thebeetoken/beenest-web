import * as React from 'react';
import { Query, graphql } from 'react-apollo';
import differenceInDays from 'date-fns/difference_in_days';

import AudioLoading from 'legacy/shared/loading/AudioLoading';
import {
  Booking,
  Currency,
  GET_GUEST_SORTED_BOOKINGS,
  GUEST_CANCEL_BOOKING
} from 'networking/bookings';
import Divider from 'legacy/shared/Divider';
import GeneralWrapper from 'legacy/shared/GeneralWrapper';

import TripsContainer from './Trips.container';
import ActiveTripCard from './ActiveTripCard';
import { compose } from 'recompose';
import Snackbar from 'legacy/shared/Snackbar';
import ExpiredTripCard from './ExpiredTripCard';
import { cancel, loadWeb3 } from 'utils/web3';
import Button from 'legacy/shared/Button';
import BeeLink from 'legacy/shared/BeeLink';
import LoadingPortal from 'legacy/shared/LoadingPortal';
import TabNavBar from 'legacy/shared/TabNavBar';
import { Switch, Route, Redirect } from 'react-router';
import NotFound from 'legacy/routes/NotFound';

interface Props {
  cancelBooking: (booking: Booking) => Promise<void>;
}

interface State {
  currency: Currency | null;
  message: string;
  open: boolean;
  isSubmitting: boolean;
}

class Trips extends React.Component<Props, State> {
  readonly state = {
    currency: Currency.USD,
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
              const { cancelled, current, past, upcoming } = data;
              const isCurrentEmpty = !(current || []).length;
              const isUpcomingEmpty = !(upcoming || []).length;
              return (
                <>
                  <TabNavBar config={[
                    {
                      title: 'Current',
                      to: '/legacy/trips/current',
                    },
                    {
                      title: 'Upcoming',
                      to: '/legacy/trips/upcoming',
                    },
                    {
                      title: 'Past',
                      to: '/legacy/trips/past',
                    },
                    {
                      title: 'Cancelled / Rejected',
                      to: '/legacy/trips/cancelled',
                    }
                  ]} />
                  <div className="trip-cards-container">
                    <Switch>
                      <Route exact path="/legacy/trips/current" component={() => isCurrentEmpty ? (
                        <div className="trips-book-now">
                          <div className="trips-book-now--text">
                            <h2>You have no trips awaiting approval.</h2>
                          </div>
                          <BeeLink to="/legacy">
                            <Button>Book a Home Today!</Button>
                          </BeeLink>
                        </div>                        
                      ) : (
                        <section className="active-cards-container">
                          {current.map((trip: Booking) =>
                            <ActiveTripCard 
                              onCancelClick={this.handleCancelBooking.bind(this, trip)}
                              key={trip.id}
                              trip={trip} />
                          )}
                        </section>
                      )} />
                      <Route exact path="/legacy/trips/upcoming" component={() => isUpcomingEmpty ? (
                        <div className="trips-book-now">
                          <div className="trips-book-now--text">
                            <h2>You haven't booked any trips yet.</h2>
                          </div>
                          <BeeLink to="/legacy">
                            <Button>Book a Home Today!</Button>
                          </BeeLink>
                        </div>
                      ) : (
                        <section className="active-cards-container">
                          {upcoming.map((trip: Booking) => (
                            <ActiveTripCard
                              onCancelClick={this.handleCancelBooking.bind(this, trip)}
                              key={trip.id}
                              trip={trip}
                            />
                          ))}
                        </section>
                      )} />
                      <Route exact path="/legacy/trips/past" component={() => past.length > 0 ? (
                        <section className="expired-trip-cards">
                          {past.map((trip: Booking) => (
                            <ExpiredTripCard key={trip.id} trip={trip} />
                          ))}
                        </section>
                      ) : (<></>)} />
                      <Route exact path="/legacy/trips/cancelled" component={() => cancelled.length > 0 ? (
                        <section className="expired-trip-cards">
                          {cancelled.map((trip: Booking) => (
                            <ExpiredTripCard key={trip.id} trip={trip} />
                          ))}
                        </section>
                      ) : (<></>)} />
                      <Redirect exact from="/legacy/trips" to={isCurrentEmpty ? "/legacy/trips/upcoming" : "/legacy/trips/current"} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                  {isSubmitting && <LoadingPortal currency={this.state.currency} />}
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
            currency: booking.currency,
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

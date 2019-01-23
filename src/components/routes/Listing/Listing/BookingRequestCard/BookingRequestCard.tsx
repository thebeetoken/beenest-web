import 'react-dates/initialize';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router';

import moment from 'moment';
import { DateRangePicker } from 'react-dates';

import BookingRequestCardContainer from './BookingRequestCard.container';
import DateRangePickerContainer from 'styled/containers/DateRangePicker.container';
import { Booking, Currency, CREATE_BOOKING, GET_GUEST_SORTED_BOOKINGS } from 'networking/bookings';
import { Price, Reservation } from 'networking/listings';
import Button from 'shared/Button';
import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import { numberToLocaleString } from 'utils/numberToLocaleString';
import { parseQueryString, addQueryParams } from 'utils/queryParams';

interface CreateBookingInput {
  checkInDate: string;
  checkOutDate: string;
  listingId: number;
  numberOfGuests: number;
}

interface Props extends RouterProps {
  loggedIn: boolean;
  checkInDate: string;
  checkOutDate: string;
  completedVerification: boolean;
  listingId: number;
  maxGuests: number;
  minimumNights: number;
  pricePerNightUsd: number;
  prices: Price[];
  reservations: Reservation[];
  totalQuantity: number;
  createBooking: (input: CreateBookingInput) => Promise<Booking>;
}

interface State {
  endDate: moment.Moment | null;
  focusedInput: 'startDate' | 'endDate' | null;
  isDisabled: boolean;
  numberOfGuests: number;
  startDate: moment.Moment | null;
  [key: string]: number | boolean | string | moment.Moment | null;
}

interface DateRange {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

interface validGuestsInput {
  numberOfGuests: number;
  maxGuests: number;
}

interface QueryParams {
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: string;
}

function getInitialState(props: Props): State {
  const { maxGuests } = props;
  const queryParams: QueryParams = parseQueryString(location.search);
  const { checkInDate, checkOutDate, numberOfGuests } = queryParams;
  const startDate = props.checkInDate ? moment.utc(props.checkInDate) :
    checkInDate ? moment.utc(checkInDate) : null;
  const endDate = props.checkOutDate ? moment.utc(props.checkOutDate) :
    checkOutDate ? moment.utc(checkOutDate) : null;
  const isDisabled: boolean = !(startDate && endDate);
  return {
    startDate,
    endDate,
    isDisabled,
    numberOfGuests:
      numberOfGuests && Number(numberOfGuests) && parseInt(numberOfGuests) <= maxGuests ? parseInt(numberOfGuests) : 1,
    focusedInput: null,
  };
}

class BookingRequestCard extends React.Component<Props, State> {
  readonly state = getInitialState(this.props);

  render() {
    const { prices, pricePerNightUsd } = this.props;
    const { endDate, startDate, focusedInput, isDisabled, numberOfGuests } = this.state;
    return (
      <BookingRequestCardContainer>
        <div className="booking-card-content-wrapper">
          <AppConsumer>
            {({ screenType }: AppConsumerProps) => {
              if (screenType < ScreenType.DESKTOP) {
                return null;
              }
              return (
                <div className="pricing-container">
                  <div className="pricing-container--primary">
                    {pricePerNightUsd && <h4>{numberToLocaleString(pricePerNightUsd)}</h4>}
                    <span>USD / night</span>
                  </div>
                  <div className="pricing-container--other-rates">
                    {prices
                      .filter(({ currency }) => Object.values(Currency).includes(currency))
                      .map(({ currency, pricePerNight }) => (
                      <h5 key={currency}>
                        {numberToLocaleString(pricePerNight, currency)}
                        <span>{currency}</span>
                      </h5>
                    ))}
                  </div>
                </div>
              );
            }}
          </AppConsumer>
          <DateRangePickerContainer className="booking-card-calendar-style">
            <div className="calendar-labels-container">
              <InputLabel>Check-in</InputLabel>
              <InputLabel>Check-out</InputLabel>
            </div>
            <AppConsumer>
              {({ screenType }: AppConsumerProps) => (
                <DateRangePicker
                  isOutsideRange={this.handleIsOutsideRange}
                  isDayBlocked={this.handleIsDayBlocked}
                  startDate={startDate} // momentPropTypes.momentObj or null,
                  startDateId="startDate"
                  startDatePlaceholderText="Check-In"
                  endDate={endDate} // momentPropTypes.momentObj or null,
                  endDateId="endDate"
                  endDatePlaceholderText="Check-Out"
                  onDatesChange={this.handleOnDatesChange} // PropTypes.func.isRequired,
                  focusedInput={focusedInput} // PropTypes.oneOf(['startDate', 'endDate']) or null,
                  onFocusChange={this.handleOnFocusChange} // PropTypes.func.isRequired,
                  minimumNights={this.props.minimumNights || 1}
                  numberOfMonths={1}
                  readOnly={screenType <= ScreenType.TABLET}
                />
              )}
            </AppConsumer>
          </DateRangePickerContainer>
          <div className="number-of-guests-input-style">
            <InputLabel htmlFor="numberOfGuests">Guests</InputLabel>
            <InputWrapper>
              <input
                id="numberOfGuests"
                onChange={this.handleNumberOfGuests}
                type="number"
                name="numberOfGuests"
                value={numberOfGuests}
              />
            </InputWrapper>
          </div>
          <form onSubmit={this.handleSubmit}>
            <Button disabled={isDisabled} radius="4px" type="submit">
              Request to Book
            </Button>
          </form>
          <div className="bottom-card-caption">
            <h3>Charges are not made until booking is finalized</h3>
          </div>
        </div>
      </BookingRequestCardContainer>
    );
  }

  handleIsOutsideRange = (day: moment.Moment) => {
    const utcDay = day
      .clone()
      .utc()
      .set('hours', 0);
    const firstDay = this.props.checkInDate ?
      moment.utc(this.props.checkInDate) :
      moment.utc().startOf('day').add(2, 'days');
    const lastDay = this.props.checkOutDate ?
      moment.utc(this.props.checkOutDate) :
      moment.utc().startOf('day').add(6, 'months');
    return utcDay.isBefore(firstDay) || utcDay.isAfter(lastDay);
  };

  handleOnDatesChange = ({ startDate, endDate }: DateRange) => {
    const checkInDate = startDate && startDate.utc().set('hours', 0);
    const checkOutDate = endDate && endDate.utc().set('hours', 0);
    this.setState(
      {
        startDate: checkInDate,
        endDate: checkOutDate,
      },
      () => {
        this.updateIsDisabled();
        const search = addQueryParams(
          {
            numberOfGuests: this.state.numberOfGuests,
            ...(checkInDate && {
              checkInDate: checkInDate && checkInDate.format('YYYY-MM-DD'),
            }),
            ...(checkOutDate && {
              checkOutDate: checkOutDate && checkOutDate.format('YYYY-MM-DD'),
            }),
          },
          this.props.location.search
        );
        this.props.history.replace({ ...this.props.location, search });
      }
    );
  };

  handleOnFocusChange = (focusedInput: 'startDate' | 'endDate' | null) => this.setState({ focusedInput });

  handleNumberOfGuests = (event: React.FormEvent<HTMLInputElement>) => {
    const { maxGuests } = this.props;
    const { name, value } = event.currentTarget;
    const numberOfGuests = parseInt(value);
    if (value && !this.isValidNumberOfGuests({ numberOfGuests, maxGuests })) return;

    this.setState({ [name]: numberOfGuests ? numberOfGuests : '' }, () => {
      this.updateIsDisabled();
      const search = addQueryParams({ numberOfGuests }, this.props.location.search);
      this.props.history.replace({ ...this.props.location, search });
    });
  };

  updateIsDisabled = (): void => {
    const { startDate, endDate, numberOfGuests } = this.state;
    const { maxGuests } = this.props;
    const validDateRange = startDate && endDate && startDate < endDate;
    const isDisabled = !validDateRange || !this.isValidNumberOfGuests({ numberOfGuests, maxGuests });
    this.setState({ isDisabled });
  };

  isValidNumberOfGuests = ({ numberOfGuests, maxGuests }: validGuestsInput): boolean => {
    return Number.isInteger(numberOfGuests) && numberOfGuests <= maxGuests && numberOfGuests > 0;
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!this.props.loggedIn) {
      return this.props.history.push({
        pathname: '/login',
        state: { referrer: this.props.location },
      });
    }
    if (!this.props.completedVerification) {
      return this.props.history.push(`/account/verification`);
    }
    const { createBooking, listingId } = this.props;
    return createBooking({
      listingId,
      checkInDate: String(this.state.startDate),
      checkOutDate: String(this.state.endDate),
      numberOfGuests: this.state.numberOfGuests,
    })
      .then((res: any) => {
        const { createBooking } = res.data;
        this.props.history.push(`/bookings/${createBooking.id}`);
      })
      .catch((err: Error) => {
        console.error(err);
        alert(err.message);
      });
  };

  handleIsDayBlocked = (day: moment.Moment): boolean => {
    if (!this.props.reservations.length) return false;

    const { reservations, totalQuantity } = this.props;
    const { focusedInput } = this.state;
    const utcDay = day
      .clone()
      .utc()
      .set('hours', 0);
    const pickingEnd = focusedInput === 'endDate';

    if (pickingEnd && this.state.startDate) {
      const selectedStartDate = this.state.startDate.utc().set('hours', 0);
      return (
        utcDay.isBefore(selectedStartDate) ||
        reservations.filter(({ startDate, endDate }: Reservation) => {
          return selectedStartDate.isBefore(endDate) && utcDay.isAfter(startDate);
        }).length >= totalQuantity
      );
    }

    return reservations.filter(({ startDate, endDate }: Reservation) => {
      return utcDay.isBetween(startDate, endDate, undefined, pickingEnd ? '(]' : '[)');
    }).length >= totalQuantity;
  };
}

export default compose(
  graphql(CREATE_BOOKING, {
    props: ({ mutate }: any) => ({
      createBooking: (input: CreateBookingInput) => {
        return mutate({
          variables: { input },
          refetchQueries: [{ query: GET_GUEST_SORTED_BOOKINGS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.guestBookings) {
              return;
            }
            const { createBooking } = data;
            const { guestBookings } = store.readQuery({ query: GET_GUEST_SORTED_BOOKINGS });
            store.writeQuery({
              query: GET_GUEST_SORTED_BOOKINGS,
              data: {
                guestBookings: {
                  ...guestBookings,
                  current: [...guestBookings.current, createBooking],
                },
              },
            });
          },
        });
      },
    }),
  })
)(withRouter(BookingRequestCard));

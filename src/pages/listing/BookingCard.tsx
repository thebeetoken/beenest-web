import * as React from 'react';
import { Button, Card, Input, Row } from 'reactstrap';
import moment from 'moment';
import { compose, graphql, Query } from 'react-apollo';

import DateRangePicker from 'legacy/work/DateRangePicker';
import { guestsSelectboxOptions } from 'legacy/work/SearchBar/searchBar.config';
import Loading from 'legacy/shared/loading/Loading';

import { CREATE_BOOKING, GET_GUEST_SORTED_BOOKINGS, CreateBookingInput } from 'networking/bookings';
import { GET_PUBLIC_LISTING, Listing, Reservation } from 'networking/listings';

import { SETTINGS } from 'configs/settings';

import { formatPrice } from 'utils/formatter';
import { parseQueryString } from 'utils/queryParams';

const { BEENEST_HOST } = SETTINGS;


interface Params {
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: number;
}

interface Dates {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

interface Props extends Listing {
  createBooking: (input: CreateBookingInput) => Promise<any>
}

const BookingCard = ({
  checkInDate,
  checkOutDate,
  createBooking,
  id,
  reservations,
  totalQuantity
}: Props) => {
  const params: Params = parseQueryString(location.search);

  const [focusedInput, setFocusedInput] = React.useState<'startDate' | 'endDate' | null>(null);
  const [startDate, setStartDate] = React.useState<moment.Moment | null>(params.checkInDate ? moment.utc(params.checkInDate) : null);
  const [endDate, setEndDate] = React.useState<moment.Moment | null>(params.checkOutDate ? moment.utc(params.checkOutDate) : null);
  const [numberOfGuests, setNumberOfGuests] = React.useState<number>(params.numberOfGuests || 1);
  const [isBooking, setBooking] = React.useState<boolean>(false);
  const setDates = ({ startDate, endDate }: Dates) => (setStartDate(startDate), setEndDate(endDate));
  const input = { checkInDate: startDate, checkOutDate: endDate, numberOfGuests };

  return <Query query={GET_PUBLIC_LISTING} fetchPolicy="cache-and-network" variables={{ id, input }}>
    {({ loading, error, data }) => <Card className="p-5 shadow border-0">
      <Row className="m-0">
        <h3 className="d-inline">
          {loading ? <Loading width="2rem" height="2rem" /> : error ? error.message : formatPrice(data.listing.pricePerNightUsd)}
        </h3>
        <small className="pl-3 mt-3"> per night</small>
      </Row>
      <Row className="w-100 m-0 mb-3">
        <DateRangePicker
          className="w-100"
          isOutsideRange={isOutsideDateRange}
          isDayBlocked={isDayBlocked}
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="startDate"
          startDatePlaceholderText="Check-In"
          daySize={32}
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="endDate"
          endDatePlaceholderText="Check-Out"
          onDatesChange={setDates} // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf(['startDate', 'endDate']) or null,
          onFocusChange={setFocusedInput} // PropTypes.func.isRequired,
          minimumNights={1}
          numberOfMonths={1}
        />
      </Row>
      <Row className="w-100 m-0 mb-3">
        <Input
          type="select"
          name="numberOfGuests"
          value={numberOfGuests}
          onChange={event => setNumberOfGuests(parseInt(event.target.value))}>
          {guestsSelectboxOptions.map(option => (
            <option value={option.value} key={option.value}>
              {option.option}
            </option>
          ))}
        </Input>
      </Row>
      <Row className="w-100 m-0">
        <Button
          onClick={startBooking}
          className="w-100"
          color="primary"
          disabled={!startDate || !endDate || !data.listing.isActive || isBooking}
        >
          {isBooking ? <Loading height="1rem" width="1rem" /> : 'Request to Book'}
        </Button>
      </Row>
    </Card>}
  </Query>;

  function isOutsideDateRange(day: moment.Moment) {
    const utcDay = day.clone().utc().set('hours', 0);
    const firstDay = checkInDate ? moment.utc(checkInDate) :
      moment().startOf('day').utc().set('hours', 0);
    const lastDay = checkOutDate ? moment.utc(checkOutDate) :
      moment().startOf('day').utc().add(6, 'months');
    return utcDay.isBefore(firstDay) || utcDay.isAfter(lastDay);
  }

  function isDayBlocked(day: moment.Moment) {
    const quantity = totalQuantity || 1;
    const utcDay = day.clone().utc().set('hours', 0);
    const pickingEnd = focusedInput === 'endDate';
    if (pickingEnd && startDate) {
      const selectedStartDate = startDate.utc().set('hours', 0);
      return (
        utcDay.isBefore(selectedStartDate) ||
        reservations.filter(({ startDate, endDate }: Reservation) => {
          return selectedStartDate.isBefore(endDate) && utcDay.isAfter(startDate);
        }).length >= quantity
      );
    }
    return reservations.filter(({ startDate, endDate }: Reservation) => {
      return utcDay.isBetween(startDate, endDate, undefined, pickingEnd ? '(]' : '[)');
    }).length >= quantity;
  }

  async function startBooking() {
    setBooking(true);
    try {
      const { data } = await createBooking({
        checkInDate: String(startDate),
        checkOutDate: String(endDate),
        listingId: id,
        numberOfGuests: numberOfGuests
      });
      window.location.href = `${BEENEST_HOST}/bookings/${data.createBooking.id}`;
    } catch (e) {
      console.log(e);
      alert(e.message);
      setBooking(false);
    }
  }
};


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
)(BookingCard);

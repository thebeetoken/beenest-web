import * as React from 'react';
import { Button, Card, Input, Row } from 'reactstrap';
import moment from 'moment';
import { Query } from 'react-apollo';

import DateRangePicker from 'legacy/work/DateRangePicker';
import { guestsSelectboxOptions } from 'legacy/work/SearchBar/searchBar.config';
import Loading from 'shared/loading/Loading';

import { GET_PUBLIC_LISTING, Listing, Reservation } from 'networking/listings';
import { formatPrice } from 'utils/formatter';

interface Dates {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

const BookingCard = ({
  checkInDate,
  checkOutDate,
  id,
  reservations,
  totalQuantity
}: Listing) => {
  const [focusedInput, setFocusedInput] = React.useState<'startDate' | 'endDate' | null>(null);
  const [startDate, setStartDate] = React.useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = React.useState<moment.Moment | null>(null);
  const [numberOfGuests, setNumberOfGuests] = React.useState<number>(1);
  const setDates = ({ startDate, endDate }: Dates) => (setStartDate(startDate), setEndDate(endDate));
  const input = { checkInDate: startDate, checkOutDate: endDate, numberOfGuests };

  return <Card className="p-5 shadow">
    <Query query={GET_PUBLIC_LISTING} fetchPolicy="cache-and-network" variables={{ id, input }}>
      {({ loading, error, data }) => <Row className="m-0">
        <h3 className="d-inline">
          {loading ? <Loading width="2rem" height="2rem" /> : error ? error.message : formatPrice(data.listing.pricePerNightUsd)}
        </h3>
        <small className="pl-3 mt-3"> per night</small>
      </Row>}
    </Query>
    <Row className="w-100 m-0 mb-3">
      <DateRangePicker
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
        onChange={event => setNumberOfGuests(parseInt(event.target.value))}
        component="select">
        {guestsSelectboxOptions.map(option => (
          <option value={option.value} key={option.value}>
            {option.option}
          </option>
        ))}
      </Input>
    </Row>
    <Row className="w-100 m-0">
      <Button className="w-100">Request to Book</Button>
    </Row>
  </Card>;

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
};

export default BookingCard;

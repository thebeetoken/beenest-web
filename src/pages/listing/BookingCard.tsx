import * as React from 'react';
import { Button, Card, Input, Row } from 'reactstrap';
import moment from 'moment';

import DateRangePicker from 'components/work/DateRangePicker';
import { guestsSelectboxOptions } from 'components/work/SearchBar/searchBar.config';

import { Listing } from 'networking/listings';
import { formatPrice } from 'utils/formatter';

interface Dates {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

const BookingCard = ({
  pricePerNightUsd
}: Listing) => {
  const [focusedInput, setFocusedInput] = React.useState<'startDate' | 'endDate' | null>(null);
  const [startDate, setStartDate] = React.useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = React.useState<moment.Moment | null>(null);
  const setDates = ({ startDate, endDate }: Dates) => (setStartDate(startDate), setEndDate(endDate));

  return <Card className="p-5 m-3 shadow">
    <Row className="m-0">
      <h3 className="d-inline">{formatPrice(pricePerNightUsd)}</h3>
      <small className="pl-3 mt-3"> per night</small>
    </Row>
    <Row className="w-100 m-0 mb-3">
      <DateRangePicker
        isOutsideRange={() => false}
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
        onChange={() => console.log('Guests changedd')}
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
};
export default BookingCard;

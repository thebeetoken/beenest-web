import * as React from 'react';
import { Button, Card, Input, Row } from 'reactstrap';

import DateRangePicker from 'legacy/work/DateRangePicker';
import { guestsSelectboxOptions } from 'legacy/work/SearchBar/searchBar.config';

import { Listing } from 'networking/listings';
import { formatPrice } from 'utils/formatter';

const BookingCard = ({
  pricePerNightUsd
}: Listing) => (<Card className="p-5 shadow">
  <Row className="m-0">
    <h3 className="d-inline">{formatPrice(pricePerNightUsd)}</h3>
    <small className="pl-3 mt-3"> per night</small>
  </Row>
  <Row className="w-100 m-0 mb-3">
    <DateRangePicker
      isOutsideRange={() => false}
      startDate={null} // momentPropTypes.momentObj or null,
      startDateId="startDate"
      startDatePlaceholderText="Check-In"
      daySize={32}
      endDate={null} // momentPropTypes.momentObj or null,
      endDateId="endDate"
      endDatePlaceholderText="Check-Out"
      onDatesChange={() => console.log('dates change')} // PropTypes.func.isRequired,
      focusedInput={null} // PropTypes.oneOf(['startDate', 'endDate']) or null,
      onFocusChange={() => console.log('focus change')} // PropTypes.func.isRequired,
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
</Card>);
export default BookingCard;

import * as React from 'react';
import { Button, Card, Input, Row } from 'reactstrap';

import DateRangePicker from 'components/work/DateRangePicker';
import { guestsSelectboxOptions } from 'components/work/SearchBar/searchBar.config';

import { Listing } from 'networking/listings';
import { formatPrice } from 'utils/formatter';

const BookingCard = ({
  pricePerNightUsd
}: Listing) => (<Card className="p-5 m-3">
  <Row className="m-0">
    <strong>{formatPrice(pricePerNightUsd)} per night</strong>
  </Row>
  <Row className="w-100 m-0">
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
  <Row className="w-100 m-0">
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
    <Button>Request to Book</Button>
  </Row>
</Card>);
export default BookingCard;

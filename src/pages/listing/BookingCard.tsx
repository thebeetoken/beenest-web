import * as React from 'react';
import { Button, Card, Row } from 'reactstrap';

import DateRangePicker from 'components/work/DateRangePicker';
import { Listing } from 'networking/listings';

import { formatPrice } from 'utils/formatter';

const BookingCard = ({
  pricePerNightUsd
}: Listing) => (<Card>
  <Row><strong>{formatPrice(pricePerNightUsd)} per night</strong></Row>
  <Row><DateRangePicker
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
  /></Row>
  <Row><Button>Request to Book</Button></Row>
</Card>);
export default BookingCard;

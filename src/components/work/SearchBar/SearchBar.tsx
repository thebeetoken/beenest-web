import * as React from 'react';
import { Button, Col, Form, FormGroup, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';

import { guestsSelectboxOptions } from './searchBar.config';

import GoogleAutoComplete from 'components/shared/GoogleAutoComplete';
import DateRangePickerContainer from 'styled/containers/DateRangePicker.container';
import { parseQueryString, stringifyQueryString } from 'utils/queryParams';

enum SearchBarQueryParam {
  CHECK_IN_DATE = 'checkInDate',
  CHECK_OUT_DATE = 'checkOutDate',
  LOCATION_QUERY = 'locationQuery',
  NUMBER_OF_GUESTS = 'numberOfGuests',
}

type QueryParams = Partial<{
  [SearchBarQueryParam.CHECK_IN_DATE]: string;
  [SearchBarQueryParam.CHECK_OUT_DATE]: string;
  [SearchBarQueryParam.LOCATION_QUERY]: string;
  [SearchBarQueryParam.NUMBER_OF_GUESTS]: string;
}>

interface DateRange {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

interface LatLng {
  lat: number,
  lng: number,
}

interface LatLngBounds {
  east: number;
  north: number;
  south: number;
  west: number;
}

interface State {
  bounds: LatLngBounds | null;
  coordinates: LatLng | null;
  checkInDate: moment.Moment | null;
  checkOutDate: moment.Moment | null;
  focusedInput: 'startDate' | 'endDate' | null;
  locationQuery: string | undefined;
  numberOfGuests: string;
}

function getInitialState({ location }: RouterProps): State {
  const queryParams: QueryParams = parseQueryString(location.search);
  const { checkInDate, checkOutDate, locationQuery, numberOfGuests } = queryParams;
  return {
    bounds: null,
    coordinates: null,
    locationQuery,
    focusedInput: null,
    checkInDate: checkInDate ? moment(checkInDate) : null,
    checkOutDate: checkOutDate ? moment(checkOutDate) : null,
    numberOfGuests: numberOfGuests && Number(numberOfGuests) ? parseInt(numberOfGuests).toFixed() : '1',
  };
}

const SearchBar = (props: RouterProps) => {
  const [searchState, setSearchState] = React.useState<State>(getInitialState(props));
  const { checkInDate, checkOutDate, focusedInput, locationQuery } = searchState;

  const firstAvailableDay: moment.Moment = moment()
    .utc()
    .startOf('day')
    .add(2, 'days');
  const futureBlockedDates: moment.Moment = moment()
    .utc()
    .startOf('day')
    .add(6, 'months');

  const { CHECK_IN_DATE, CHECK_OUT_DATE, LOCATION_QUERY, NUMBER_OF_GUESTS } = SearchBarQueryParam;
  return (
    <Form className="d-flex flex-column flex-lg-row justify-content-between w-100"
      onKeyPress={disableEnter}>
      <Col md="4" className="px-0">
        <GoogleAutoComplete onPlaceChange={handlePlaceChange}>
          <FormGroup className="mb-md-0">
            <Input
              onChange={handleChange}
              id={LOCATION_QUERY}
              name={LOCATION_QUERY}
              placeholder="Try &quot;San Francisco&quot;"
              defaultValue={locationQuery}
              required />
          </FormGroup>
        </GoogleAutoComplete>

      </Col>

      <Col md="4" className="px-0">
        <FormGroup className="mb-md-0">
          {/* <DateRangePickerContainer className="d-md-none">
            <DateRangePicker
              isOutsideRange={handleIsOutsideRange}
              startDate={checkInDate} // momentPropTypes.momentObj or null,
              startDateId="startDate"
              startDatePlaceholderText="Check-In"
              daySize={32}
              endDate={checkOutDate} // momentPropTypes.momentObj or null,
              endDateId="endDate"
              endDatePlaceholderText="Check-Out"
              onDatesChange={handleOnDatesChange} // PropTypes.func.isRequired,
              focusedInput={focusedInput} // PropTypes.oneOf(['startDate', 'endDate']) or null,
              onFocusChange={handleOnFocusChange} // PropTypes.func.isRequired,
              minimumNights={1}
              numberOfMonths={1}
              readOnly={true}
            />
          </DateRangePickerContainer> */}

          <DateRangePickerContainer>
            <DateRangePicker
              isOutsideRange={handleIsOutsideRange}
              startDate={checkInDate} // momentPropTypes.momentObj or null,
              startDateId="startDate"
              startDatePlaceholderText="Check-In"
              daySize={40}
              endDate={checkOutDate} // momentPropTypes.momentObj or null,
              endDateId="endDate"
              endDatePlaceholderText="Check-Out"
              onDatesChange={handleOnDatesChange} // PropTypes.func.isRequired,
              focusedInput={focusedInput} // PropTypes.oneOf(['startDate', 'endDate']) or null,
              onFocusChange={handleOnFocusChange} // PropTypes.func.isRequired,
              minimumNights={1}
              numberOfMonths={1}
              readOnly={false}
            />
          </DateRangePickerContainer>
        </FormGroup>
      </Col>


      <Col md="2" className="px-0">
        <FormGroup className="mb-md-0">
          <Input
            type="select"
            name={NUMBER_OF_GUESTS}
            component="select">
            {guestsSelectboxOptions.map(option => (
              <option value={option.value} key={option.value}>
                {option.option}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>


      <Button
        className="btn-primary mb-md-0 transition-3d-hover"
        type="submit"
        onClick={handleSubmit}
        color="primary">
        Search
			</Button>

    </Form>
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { bounds, coordinates, checkInDate, checkOutDate, numberOfGuests, locationQuery } = searchState;
    return props.history.push({
      pathname: '/listings',
      search: stringifyQueryString({
        locationQuery,
        utm_term: locationQuery,
        ...(bounds && { bounds }),
        ...(coordinates && { coordinates }),
        ...(numberOfGuests && { numberOfGuests }),
        ...(checkInDate && {
          checkInDate: checkInDate.format('YYYY-MM-DD'),
        }),
        ...(checkOutDate && {
          checkOutDate: checkOutDate.format('YYYY-MM-DD'),
        }),
      }),
    });
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // handlePlaceChange will be called later, if the user selects from Autocomplete
    return setSearchState({
      ...searchState,
      coordinates: null,
      bounds: null,
      locationQuery: event.target.value,
    });
  }

  function handlePlaceChange(place: google.maps.places.PlaceResult, value: string) {
    if (!place.geometry || !value) return;
    setSearchState({
      ...searchState,
      coordinates: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
      bounds: place.geometry.viewport.toJSON(),
      locationQuery: value,
    });
  }

  function handleIsOutsideRange(day: moment.Moment) {
    const utcDay = day
      .clone()
      .utc()
      .set('hours', 0);
    return utcDay.isBefore(firstAvailableDay) || utcDay.isAfter(futureBlockedDates);
  }

  function handleOnDatesChange({ startDate, endDate }: DateRange) {
    const checkInDate = startDate && startDate.utc().set('hours', 0);
    const checkOutDate = endDate && endDate.utc().set('hours', 0);
    setSearchState({
      ...searchState,
      checkInDate,
      checkOutDate,
    });
  }

  function handleOnFocusChange(focusedInput: 'startDate' | 'endDate' | null) {
    console.log(focusedInput);
    setSearchState({ ...searchState, focusedInput });
  }

  function disableEnter(event: React.KeyboardEvent) {
    // Places Array does not update in time, so we need to disable the native submit enter keypress and force the
    // Client to submit by clicking on the button
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }
};

export default withRouter(SearchBar);
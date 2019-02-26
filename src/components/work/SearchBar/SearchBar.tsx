import * as React from 'react';
import { Button, Col, Form, FormGroup, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';

import { guestsSelectboxOptions } from './searchBar.config';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import GoogleAutoComplete from 'components/shared/GoogleAutoComplete';
import WorkDateRangePickerContainer from 'styled/containers/WorkDateRangePicker.container';
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

class SearchBar extends React.Component<RouterProps, State> {
  readonly state: State = getInitialState(this.props);

  private firstAvailableDay: moment.Moment = moment()
    .utc()
    .startOf('day')
    .add(2, 'days');
  private futureBlockedDates: moment.Moment = moment()
    .utc()
    .startOf('day')
    .add(6, 'months');

  render() {
    const { checkInDate, checkOutDate, focusedInput, locationQuery } = this.state;
    const { LOCATION_QUERY, NUMBER_OF_GUESTS } = SearchBarQueryParam;
    return (
      <Form className="d-flex flex-column flex-lg-row justify-content-between w-100"
        onKeyPress={this.disableEnter}>
        <Col mg="12" lg="4" className="px-0">
          <FormGroup className="mb-lg-0 bee-home-search-autocomplete">
            <GoogleAutoComplete onPlaceChange={this.handlePlaceChange}>
              <Input
                onChange={this.handleLocationChange}
                id={LOCATION_QUERY}
                name={LOCATION_QUERY}
                placeholder="Try &quot;San Francisco&quot;"
                defaultValue={locationQuery}
                required />
            </GoogleAutoComplete>
          </FormGroup>

        </Col>

        <Col mg="12" lg="4" className="px-0">
          <FormGroup className="mb-lg-0">
            <AppConsumer>
              {({ screenType }: AppConsumerProps) => {
                const isMobile = screenType < ScreenType.TABLET;
                const isTablet = screenType <= ScreenType.TABLET;
                return (

                  <WorkDateRangePickerContainer>
                    <DateRangePicker
                      isOutsideRange={this.handleIsOutsideRange}
                      startDate={checkInDate} // momentPropTypes.momentObj or null,
                      startDateId="startDate"
                      startDatePlaceholderText="Check-In"
                      daySize={isMobile ? 32 : 40}
                      endDate={checkOutDate} // momentPropTypes.momentObj or null,
                      endDateId="endDate"
                      endDatePlaceholderText="Check-Out"
                      onDatesChange={this.handleOnDatesChange} // PropTypes.func.isRequired,
                      focusedInput={focusedInput} // PropTypes.oneOf(['startDate', 'endDate']) or null,
                      onFocusChange={this.handleOnFocusChange} // PropTypes.func.isRequired,
                      minimumNights={1}
                      numberOfMonths={1}
                      readOnly={isTablet}
                    />
                  </WorkDateRangePickerContainer>
                );
              }}
            </AppConsumer>
          </FormGroup>
        </Col>


        <Col md="12" lg="2" className="px-0">
          <FormGroup className="mb-lg-0">
            <Input
              type="select"
              name={NUMBER_OF_GUESTS}
              onChange={this.handleGuestChange}
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
          onClick={this.handleSubmit}
          color="primary">
          Search
        </Button>

      </Form>
    );

  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { bounds, coordinates, checkInDate, checkOutDate, numberOfGuests, locationQuery } = this.state;
    return window.location.href = `${location.origin}/listings?${stringifyQueryString({
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
    })}`
  };

  handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handlePlaceChange will be called later, if the user selects from Autocomplete
    this.setState({
      coordinates: null,
      bounds: null,
      locationQuery: event.target.value,
    });
  };

  handleGuestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ numberOfGuests: event.target.value });
    console.log(this.state);
  }

  handlePlaceChange = (place: google.maps.places.PlaceResult, value: string) => {
    if (!place.geometry || !value) return;
    this.setState({
      coordinates: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
      bounds: place.geometry.viewport.toJSON(),
      locationQuery: value,
    });
  };

  handleIsOutsideRange = (day: moment.Moment) => {
    const utcDay = day
      .clone()
      .utc()
      .set('hours', 0);
    return utcDay.isBefore(this.firstAvailableDay) || utcDay.isAfter(this.futureBlockedDates);
  };

  handleOnDatesChange = ({ startDate, endDate }: DateRange) => {
    const checkInDate = startDate && startDate.utc().set('hours', 0);
    const checkOutDate = endDate && endDate.utc().set('hours', 0);
    this.setState({
      checkInDate,
      checkOutDate,
    });
  };

  handleOnFocusChange = (focusedInput: 'startDate' | 'endDate' | null) => { this.setState({ focusedInput }) };

  disableEnter = (event: React.KeyboardEvent) => {
    // Places Array does not update in time, so we need to disable the native submit enter keypress and force the
    // Client to submit by clicking on the button
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  };
};

export default withRouter(SearchBar);
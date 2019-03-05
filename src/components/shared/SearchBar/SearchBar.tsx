import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import SearchBarContainer from './SearchBar.container';
import DateRangePickerContainer from 'styled/containers/DateRangePicker.container';

import Button from 'shared/Button';
import GoogleAutoComplete from 'shared/GoogleAutoComplete';
import InputWrapper from 'shared/InputWrapper';
import { parseQueryString, stringifyQueryString } from 'utils/queryParams';
import { AppConsumer, AppConsumerProps, ScreenType } from 'legacy/Legacy.context';

interface QueryParams {
  checkInDate?: string;
  checkOutDate?: string;
  locationQuery?: string;
  numberOfGuests?: string;
}

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
  const { checkInDate, checkOutDate, numberOfGuests, locationQuery } = queryParams;
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
  private inputRef: React.RefObject<HTMLInputElement | null> = React.createRef();

  private firstAvailableDay: moment.Moment = moment()
    .utc()
    .startOf('day')
    .add(2, 'days');
  private futureBlockedDates: moment.Moment = moment()
    .utc()
    .startOf('day')
    .add(6, 'months');

  render() {
    const {
      checkInDate,
      checkOutDate,
      focusedInput,
      locationQuery,
      numberOfGuests,
    } = this.state;
    return (
      <SearchBarContainer className="search-bar">
        <form className="search-bar-form" onKeyPress={this.disableEnter} onSubmit={this.handleSubmit}>
          <div className="search-bar-form--location">
            <div className="search-bar-autocomplete-container">
              <GoogleAutoComplete inputRef={this.inputRef} onPlaceChange={this.handlePlaceChange}>
                <InputWrapper box>
                  <input
                    onChange={this.handleChange}
                    ref={this.inputRef}
                    id="locationQuery"
                    name="locationQuery"
                    placeholder="Try &quot;San Francisco&quot;"
                    defaultValue={locationQuery}
                    required
                    type="text" />
                </InputWrapper>
              </GoogleAutoComplete>
            </div>
          </div>
          <AppConsumer>
            {({ screenType }: AppConsumerProps) => {
              const isMobile = screenType < ScreenType.TABLET;
              const isTablet = screenType <= ScreenType.TABLET;
              return (
                <div className="search-bar-form--date-range">
                  <DateRangePickerContainer>
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
                  </DateRangePickerContainer>
                </div>
              );
            }}
          </AppConsumer>
          <div className="search-bar-form--guests">
            <InputWrapper box>
              <input
                id="numberOfGuests"
                min="1"
                step="1"
                name="numberOfGuests"
                onChange={this.handleGuests}
                placeholder="Guests"
                type="number"
                value={numberOfGuests}
              />
            </InputWrapper>
          </div>
          <Button
            className="search-button"
            type="submit">
            Search Listings
          </Button>
        </form>
      </SearchBarContainer>
    );
  }

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

  handleOnFocusChange = (focusedInput: 'startDate' | 'endDate' | null) => { this.setState({ focusedInput })};
  handleGuests = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ numberOfGuests: event.target.value });

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handlePlaceChange will be called later, if the user selects from Autocomplete
    return this.setState({ coordinates: null, bounds: null, locationQuery: event.target.value });
  };

  handlePlaceChange = (place: google.maps.places.PlaceResult) => {
    if (!place.geometry) return;
    this.setState({
      coordinates: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
      bounds: place.geometry.viewport.toJSON(),
    })
  };

  disableEnter = (event: React.KeyboardEvent) => {
    // Places Array does not update in time, so we need to disable the native submit enter keypress and force the
    // Client to submit by clicking on the button
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  };


  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { bounds, coordinates, checkInDate, checkOutDate, numberOfGuests } = this.state;
    const locationQuery = this.inputRef.current ? this.inputRef.current.value : '';
    return this.props.history.push({
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
}

export default withRouter(SearchBar);

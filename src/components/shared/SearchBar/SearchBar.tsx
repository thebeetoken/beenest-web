import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import SearchBarContainer from './SearchBar.container';
import DateRangePickerContainer from 'styled/containers/DateRangePicker.container';

import Button from 'shared/Button';
import GoogleAutoComplete from 'shared/GoogleAutoComplete';
import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import { parseQueryString, stringifyQueryString } from 'utils/queryParams';
import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';

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

interface State {
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
    locationQuery,
    focusedInput: null,
    checkInDate: checkInDate ? moment(checkInDate) : null,
    checkOutDate: checkOutDate ? moment(checkOutDate) : null,
    numberOfGuests: numberOfGuests && Number(numberOfGuests) ? parseInt(numberOfGuests).toFixed() : '1',
  };
}

class SearchBar extends React.Component<RouterProps, State> {
  readonly state: State = getInitialState(this.props);
  private placesRef: React.RefObject<google.maps.places.SearchBox | null> = React.createRef();
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
            <InputLabel htmlFor="locationQuery">Location</InputLabel>
            <div className="search-bar-autocomplete-container">
              <GoogleAutoComplete placesRef={this.placesRef} inputRef={this.inputRef} defaultValue={locationQuery} />
            </div>
          </div>
          <AppConsumer>
            {({ screenType }: AppConsumerProps) => {
              const isMobile = screenType <= ScreenType.TABLET;
              return (
                <div className="search-bar-form--date-range">
                  <div className="calendar-labels-container">
                    <InputLabel>Check-in</InputLabel>
                    <InputLabel>Check-out</InputLabel>
                  </div>
                  <DateRangePickerContainer>
                    <DateRangePicker
                      isOutsideRange={this.handleIsOutsideRange}
                      startDate={checkInDate} // momentPropTypes.momentObj or null,
                      startDateId="startDate"
                      endDate={checkOutDate} // momentPropTypes.momentObj or null,
                      endDateId="endDate"
                      onDatesChange={this.handleOnDatesChange} // PropTypes.func.isRequired,
                      focusedInput={focusedInput} // PropTypes.oneOf(['startDate', 'endDate']) or null,
                      onFocusChange={this.handleOnFocusChange} // PropTypes.func.isRequired,
                      minimumNights={1}
                      numberOfMonths={1}
                      readOnly={isMobile}
                    />
                  </DateRangePickerContainer>
                </div>
              );
            }}
          </AppConsumer>
          <div className="search-bar-form--guests">
            <InputLabel htmlFor="numberOfGuests">Guests</InputLabel>
            <InputWrapper box>
              <input
                id="numberOfGuests"
                min="1"
                step="1"
                name="numberOfGuests"
                onChange={this.handleGuests}
                placeholder="# of Guests"
                type="number"
                value={numberOfGuests}
              />
            </InputWrapper>
          </div>
          <div className="bee-flex-div" />
          <Button className="search-button" type="submit">
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

  handleOnFocusChange = (focusedInput: 'startDate' | 'endDate' | null) => this.setState({ focusedInput });
  handleGuests = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ numberOfGuests: event.target.value });

  disableEnter = (event: React.KeyboardEvent) => {
    // Places Array does not update in time, so we need to disable the native submit enter keypress and force the
    // Client to submit by clicking on the button
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { checkInDate, checkOutDate, numberOfGuests } = this.state;
    const locationQuery = this.inputRef.current ? this.inputRef.current.value : '';
    const places = this.placesRef.current ? this.placesRef.current.getPlaces() : undefined;
    return this.props.history.push({
      pathname: '/listings',
      search: stringifyQueryString({
        locationQuery,
        utm_term: locationQuery,
        ...(places &&
          places.length && {
            coordinates: {
              lat: places[0].geometry.location.lat(),
              lng: places[0].geometry.location.lng(),
            },
          }),
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

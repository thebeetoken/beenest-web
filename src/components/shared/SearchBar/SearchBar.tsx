import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
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

interface State {
  checkInDate: moment.Moment | null;
  checkOutDate: moment.Moment | null;
  checkInDateFocus: boolean;
  checkOutDateFocus: boolean;
  locationQuery: string | undefined;
  numberOfGuests: string;
}

function getInitialState({ location }: RouterProps): State {
  const queryParams: QueryParams = parseQueryString(location.search);
  const { checkInDate, checkOutDate, numberOfGuests, locationQuery } = queryParams;
  return {
    locationQuery,
    checkInDateFocus: false,
    checkOutDateFocus: false,
    checkInDate: checkInDate ? moment(checkInDate) : null,
    checkOutDate: checkOutDate ? moment(checkOutDate) : null,
    numberOfGuests: numberOfGuests && Number(numberOfGuests) ? parseInt(numberOfGuests).toFixed() : '1',
  };
}

class SearchBar extends React.Component<RouterProps, State> {
  readonly state: State = getInitialState(this.props);
  private placesRef: React.RefObject<google.maps.places.SearchBox | null> = React.createRef();
  private inputRef: React.RefObject<HTMLInputElement | null> = React.createRef();

  render() {
    const {
      checkInDate,
      checkInDateFocus,
      checkOutDate,
      checkOutDateFocus,
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
                <div className="search-bar-form--row">
                  <div className="search-bar-form--check-in-date">
                    <InputLabel htmlFor="checkInDate">Check-in</InputLabel>
                    <DateRangePickerContainer>
                      <SingleDatePicker
                        date={checkInDate}
                        focused={checkInDateFocus}
                        daySize={32}
                        id="checkInDate"
                        numberOfMonths={1}
                        onDateChange={this.handleCheckInDate}
                        onFocusChange={this.handleCheckInFocus}
                        readOnly={isMobile}
                      />
                    </DateRangePickerContainer>
                  </div>
                  <div className="search-bar-form--check-out-date">
                    <InputLabel htmlFor="checkOutDate">Check-out</InputLabel>
                    <DateRangePickerContainer>
                      <SingleDatePicker
                        anchorDirection="right"
                        date={checkOutDate}
                        daySize={32}
                        focused={checkOutDateFocus}
                        id="checkOutDate"
                        numberOfMonths={1}
                        onDateChange={this.handleCheckOutDate}
                        onFocusChange={this.handleCheckOutFocus}
                        readOnly={isMobile}
                      />
                    </DateRangePickerContainer>
                  </div>
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

  handleCheckInDate = (checkInDate: moment.Moment | null) => {
    if (checkInDate && this.state.checkOutDate && checkInDate.isSameOrAfter(this.state.checkOutDate)) {
      return this.setState({
        checkInDate,
        checkOutDate: null,
      });
    }
    return this.setState({ checkInDate });
  }
  handleCheckOutDate = (checkOutDate: moment.Moment | null) => {
    if (checkOutDate && this.state.checkInDate && checkOutDate.isSameOrBefore(this.state.checkInDate)) {
      return this.setState({
        checkInDate: null,
        checkOutDate,
      });
    }
    return this.setState({ checkOutDate });
  }
  handleCheckInFocus = () => this.setState({ checkInDateFocus: !this.state.checkInDateFocus });
  handleCheckOutFocus = () => this.setState({ checkOutDateFocus: !this.state.checkOutDateFocus });
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

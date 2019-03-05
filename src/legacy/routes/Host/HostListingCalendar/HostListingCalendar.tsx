import * as React from 'react';
import moment from 'moment';
import Calendar from 'rc-calendar';
import { Query } from 'react-apollo';
import CopyToClipboard from 'react-copy-to-clipboard';

import { SETTINGS } from 'configs/settings';
import AudioLoading from 'legacy/shared/loading/AudioLoading';
import BeeLink from 'legacy/shared/BeeLink';
import Button from 'legacy/shared/Button';
import Divider from 'legacy/shared/Divider';
import SelectBoxWrapper from 'legacy/shared/SelectBoxWrapper';
import Svg from 'legacy/shared/Svg';
import { GET_LISTING_CALENDAR, Reservation } from 'networking/listings';
import { formatAddress } from 'utils/formatter';

import HostListingCalendarContainer from './HostListingCalendar.container';

function overlaps({ startDate, endDate }: Reservation, date: moment.Moment) {
  return date.clone().utc().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  }).isBetween(startDate, endDate, undefined, '[)');
}

const MONTH_OPTIONS = (() => {
  const monthOptions = [ moment.utc().set({
    date: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  }) ];
  while (monthOptions.length < 6) {
    const nextMonth = monthOptions[monthOptions.length - 1].clone().add({ months: 1 });
    monthOptions.push(nextMonth);
  }
  return monthOptions;
})();

const { BEENEST_HOST_API } = SETTINGS;

class HostListingCalendar extends React.Component<RouterProps> {
  state = { selectedMonth: MONTH_OPTIONS[0] };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => this.setState({
    selectedMonth: MONTH_OPTIONS.find(month => month.toString() === event.target.value)
  });

  render() {
    const { id } = this.props.match.params;
    return (
      <Query query={GET_LISTING_CALENDAR} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <AudioLoading />;
          }
          if (error || !data) {
            return <h1>{error ? error.message : 'Unable to fetch listing'}</h1>;
          }
          const {
            city,
            country,
            reservations,
            state,
            title
          } = data.listing;
          const { selectedMonth } = this.state;
          const icalLink = `${BEENEST_HOST_API}/beenest/v2/listings/${id}.ics`;
          return (<HostListingCalendarContainer>
            <aside className="host-listing-calendar--back">
              <BeeLink to='/host/listings'>
                <Button
                  className="back-to-listings"
                  clear
                  color="upper"
                  noStartPadding
                  prefix="utils/arrow-left">
                  Back to Listings
                </Button>
              </BeeLink>
            </aside>
            <section className="host-listing-calendar">
              <header>
                <h1>{title}</h1>
                <h2>{formatAddress(city, state, country)}</h2>
                <BeeLink to={`/host/listings/${id}/pricing_availability`}>
                  <Button className="host-listing-calendar--edit" background="core" color="white">
                    Add/Edit iCals
                  </Button>
                </BeeLink>
              </header>
              <Divider color="middle" />
              <SelectBoxWrapper suffixSize="tiny">
                <select id="month" defaultValue={selectedMonth.toString()} onChange={this.handleChange}>
                  {MONTH_OPTIONS.map(month => <option
                    value={month.toString()}
                    key={month.toString()}>
                    {month.format('MMMM YYYY')}
                  </option>)}
                </select>
                <label htmlFor="month">
                  <Svg className="suffix" src="utils/carat-down" />
                </label>
              </SelectBoxWrapper>
              <span className="host-listing-calendar--ical">
                <h3>iCal link:</h3>
                <CopyToClipboard text={icalLink}><h4>{icalLink}</h4></CopyToClipboard>
              </span>
              <Calendar
                disabledDate={(date) => reservations.some(
                  (reservation: Reservation )=> overlaps(reservation, date)
                )}
                showDateInput={false}
                showToday={false}
                value={selectedMonth}
              />
            </section>
          </HostListingCalendarContainer>);
        }}
      </Query>
    );
  }
}

export default HostListingCalendar;
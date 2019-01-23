import * as React from 'react';

import StartedTripCardContainer from './StartedTripCard.container';
import LazyImage from 'components/shared/LazyImage';
import { formatSingleDate } from 'utils/formatDate';
import Divider from 'components/shared/Divider';
import ListItem from 'components/shared/ListItem';
import BeeLink from 'components/shared/BeeLink';
import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import Svg from 'components/shared/Svg';
import Button from 'components/shared/Button';
import { Booking } from 'networking/bookings';
import { stringifyQueryString } from 'utils/queryParams';
import { Listing } from 'networking/listings';
import { formatAddress } from 'utils/formatter';

interface Props {
  trip: Booking;
}

const StartedTripCard = ({ trip }: Props) => {
  const { checkInDate, checkOutDate, listing, numberOfGuests } = trip;
  const { idSlug } = listing;
  const queryString = stringifyQueryString({
    checkInDate: formatSingleDate(checkInDate, 'YYYY-MM-DD'),
    checkOutDate: formatSingleDate(checkOutDate, 'YYYY-MM-DD'),
    numberOfGuests,
  });
  const queryParams = !!Object.keys(queryString).length ? `?${queryString}` : '';
  return (
    <StartedTripCardContainer className="bee-started-trip-card">
      <div className="started-trip-photo">
        <LazyImage src={listing.listingPicUrl} transition />
      </div>
      <div className="started-trip-info">
        <h3>
          <BeeLink target="_blank" to={`/listings/${idSlug}${queryParams}`}>{listing.title}</BeeLink>
        </h3>
        <div className="address">
        <BeeLink href={getGoogleMapURI(listing)} target="_blank">
          <ListItem noHover suffixColor="secondary" textColor="secondary" textTransform="uppercase">
            <span>{formatAddress(listing.city, listing.state, listing.country.toUpperCase())}</span>
            <AppConsumer>
              {({ screenType }: AppConsumerProps) => (
                screenType > ScreenType.TABLET && <Svg className="suffix" src="decorative/location" />
              )}
            </AppConsumer>
          </ListItem>
        </BeeLink>
        </div>
        <div className="dates">
          <div className="date">
            <h5>
              Check-in:
            </h5>
            <h6>
              {formatSingleDate(checkInDate)}
            </h6>
          </div>
          <div className="date">
            <h5>
              Check-out:
            </h5>
            <h6>
              {formatSingleDate(checkOutDate)}
            </h6>
          </div>
        </div>
        <div className="divider">
          <Divider />
        </div>
        <BeeLink target="_blank" to={`/listings/${idSlug}${queryParams}`}>
          <Button
            color="white"
            background="core"
            radius="4px"
            size="small"
            suffix="utils/arrow-right">
            Continue Booking
          </Button>
        </BeeLink>
      </div>
    </StartedTripCardContainer>
  );
};

export default StartedTripCard;

function getGoogleMapURI(listing: Listing): string {
  const listingAddress = `${listing.addressLine1 ? listing.addressLine1 + ' ' : ''}${listing.city} ${listing.state}`;
  return `https://www.google.com/maps/place/${encodeURIComponent(listingAddress)}`;
}

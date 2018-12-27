import * as React from 'react';

import ActiveTripCardContainer from './ActiveTripCard.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import { Booking } from 'networking/bookings';
import { Listing } from 'networking/listings';
import BeeLink from 'shared/BeeLink';
import Divider from 'shared/Divider';
import LazyImage from 'shared/LazyImage';
import ListItem from 'shared/ListItem';
import Fab from 'shared/Fab';
import Svg from 'shared/Svg';
import { formatSingleDate } from 'utils/formatDate';
import { getUserBookingDisplayStatus } from 'utils/bookingsDisplayStatus';


interface Props {
  onCancelClick: () => void;
  trip: Booking;
}

const ActiveTripCard = ({ onCancelClick, trip }: Props) => {
  const { checkInDate, checkOutDate, id, listing, status } = trip;
  const mailTo = trip.supportEmail ? `mailto:${trip.supportEmail}` : 'mailto:support@beetoken.com';
  const streetAddress = (listing.addressLine1 || '').concat(listing.addressLine2 ? `, ${listing.addressLine2}` : '');
  const isApproved = status === 'host_approved';
  const isStarted = status === 'started';
  const displayStatus = getUserBookingDisplayStatus(status);
  const titleLink = status === 'started' ? `/bookings/${id}/options` : `listings/${listing.idSlug}`;
  return (
    <ActiveTripCardContainer className="bee-active-trip-card">
      <div className="active-trip-photo">
        <LazyImage src={listing.listingPicUrl} transition />
      </div>
      <div className="trip-large-section">
        <h3>
          <BeeLink to={titleLink}>{listing.title}</BeeLink>
        </h3>
        <div className="bee-flex-div" />
        <div className="address">
        <BeeLink href={getGoogleMapURI(listing)} target="_blank">
          <ListItem noHover suffixColor="secondary" textColor="secondary" textTransform="uppercase">
            <span>{trip.status === 'host_approved' && streetAddress} {listing.city && `${listing.city}, `}{listing.state && `${listing.state}, `}{listing.country.toUpperCase()}</span>
            <AppConsumer>
              {({ screenType }: AppConsumerProps) => (
                screenType > ScreenType.TABLET && <Svg className="suffix" src="decorative/location" />
              )}
            </AppConsumer>
          </ListItem>
        </BeeLink>
        </div>
        <div className="dates">
          <h5>
            Check-in: <span>{formatSingleDate(checkInDate)}</span>
          </h5>
          <h5>
            Check-out: <span>{formatSingleDate(checkOutDate)}</span>
          </h5>
        </div>
        <h4>Status: {displayStatus}</h4>
        <h5>Booking ID: <span>{id}</span></h5>
        <div className="divider">
          <Divider />
        </div>
        <div className="actions">
          <BeeLink href={mailTo}>
            <Fab
              clear
              color="upper"
              icon="decorative/email"
              iconColor="secondary"
              noFlex
              noPadding
              textStyle="read-4">
              Contact Host
            </Fab>
          </BeeLink>
          {isApproved && (
            <BeeLink href={`/trips/${trip.id}/receipt`}>
              <Fab
                clear
                color="upper"
                icon="decorative/receipt"
                iconColor="secondary"
                noFlex
                noPadding
                textStyle="read-4">
                Receipt
              </Fab>
            </BeeLink>
          )}
          {!isStarted && (
            <Fab
              clear
              color="upper"
              icon="utils/cancel"
              iconColor="secondary"
              id={id}
              noFlex
              noPadding
              onClick={onCancelClick}
              textStyle="read-4">
              Cancel Trip
            </Fab>
          )}
        </div>
      </div>
    </ActiveTripCardContainer>
  );
};

export default ActiveTripCard;

function getGoogleMapURI(listing: Listing): string {
  const listingAddress = `${listing.addressLine1 ? listing.addressLine1 + ' ' : ''}${listing.city} ${listing.state}`;
  return `https://www.google.com/maps/place/${encodeURIComponent(listingAddress)}`;
}

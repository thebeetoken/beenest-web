import * as React from 'react';

import ActiveTripCardContainer from './ActiveTripCard.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'legacy/Legacy.context';
import { Booking } from 'networking/bookings';
import BeeLink from 'legacy/shared/BeeLink';
import Divider from 'legacy/shared/Divider';
import LazyImage from 'legacy/shared/LazyImage';
import ListItem from 'legacy/shared/ListItem';
import Fab from 'legacy/shared/Fab';
import Svg from 'legacy/shared/Svg';
import { formatSingleDate } from 'utils/formatDate';
import { getUserBookingDisplayStatus } from 'utils/bookingsDisplayStatus';
import { ToggleProvider, ToggleProviderRef } from 'legacy/shared/ToggleProvider';
import Portal from 'legacy/shared/Portal';
import ContactHostForm from 'legacy/shared/ContactHostForm';
import { getGoogleMapURI, formatAddress, formatGeolocationAddress } from 'utils/formatter';

interface Props {
  onCancelClick: () => void;
  trip: Booking;
}

const ActiveTripCard = ({ onCancelClick, trip }: Props) => {
  const { checkInDate, checkOutDate, id, listing, status } = trip;
  const { addressLine1, addressLine2, city, country, lat, lng, postalCode, state } = listing;
  const displayStatus = getUserBookingDisplayStatus(status);
  const titleLink = status === 'started' ? `/legacy/bookings/${id}/options` : `/legacy/listings/${listing.idSlug}`;
  return (
    <ActiveTripCardContainer className="active-trip-card">
      <div className="active-trip-photo">
        <LazyImage src={listing.listingPicUrl} transition />
      </div>
      <div className="active-trip-info">
        <h3>
          <BeeLink href={titleLink}>{listing.title}</BeeLink>
        </h3>
        <div className="bee-flex-div" />
        <div className="address">
        <BeeLink href={getGoogleMapURI(listing)} target="_blank">
          <ListItem noHover suffixColor="secondary" textColor="secondary" textTransform="uppercase">
            <span>
              {addressLine1 && formatAddress(addressLine1, addressLine2, city, state, country, postalCode)}
              {!addressLine1 && formatGeolocationAddress({ lat, lng, city, country })}
            </span>
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
            <h5>Check-in:</h5>
            <h6>{formatSingleDate(checkInDate)}</h6>
          </div>
          <div className="date">
            <h5>Check-out:</h5>
            <h6>{formatSingleDate(checkOutDate)}</h6>
          </div>
        </div>
        <h4>Status: {displayStatus}</h4>
        <h5>Booking: <span>{id}</span></h5>
        <div className="divider">
          <Divider />
        </div>
        <div className="actions">
          <ToggleProvider>
            {({ show, toggle }: ToggleProviderRef) => (
              <>
                <Fab
                  clear
                  color="upper"
                  icon="decorative/email"
                  iconColor="secondary"
                  onClick={toggle}
                  noFlex
                  noPadding
                  textStyle="read-4">
                  Contact Host
                </Fab>
                {show && (
                  <Portal color="up" opacity={0.9} onClick={toggle}>
                    <ContactHostForm
                      host={trip.host}
                      listingId={listing.id}
                      bookingId={trip.id}
                      onClose={toggle} />
                  </Portal>
                )}
              </>
            )}
          </ToggleProvider>
          <BeeLink href={`/legacy/trips/${trip.id}/receipt`}>
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
        </div>
      </div>
    </ActiveTripCardContainer>
  );
};

export default ActiveTripCard;

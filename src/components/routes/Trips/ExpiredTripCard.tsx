import * as React from 'react';

import ExpiredTripCardContainer from './ExpiredTripCard.container';

import { Booking } from 'networking/bookings';
import BeeLink from 'shared/BeeLink';
import Divider from 'shared/Divider';
import Fab from 'shared/Fab';
import LazyImage from 'shared/LazyImage';
import { formatDateRange } from 'utils/formatDate';
import { ToggleProvider, ToggleProviderRef } from 'shared/ToggleProvider';
import Portal from 'shared/Portal';
import ContactHostForm from 'shared/ContactHostForm';

interface Props {
  trip: Booking;
}

interface DisplayMap {
  [key: string]: string;
}

const cancelledByMap: DisplayMap = {
  host_cancelled: 'host',
  guest_cancelled: 'you',
};

const ExpiredTripCard = ({ trip }: Props) => {
  const { checkInDate, checkOutDate, id, listing, status } = trip;
  const cancelledBy = cancelledByMap[status] || '';
  return (
    <ExpiredTripCardContainer className="expired-trip-card">
      <div className="trip-card--img">
        <LazyImage src={listing.listingPicUrl} transition />
      </div>
      <div className="trip-card-section">
        <h2>
          {formatDateRange(checkInDate, checkOutDate)}
        </h2>
        <h3>
          <BeeLink to={`listings/${listing.idSlug}`}>{listing.title}</BeeLink>
        </h3>
        <div className="bee-flex-div" />
        <h4>
          {listing.city}, {listing.state}
        </h4>
        <h5>Booking ID: <span>{id}</span></h5>
        <div className="bee-flex-div" />
        {cancelledBy && (
          <>
            <Divider />
            <div className="trip-card--cancelled-bar">
              <h4>Trip cancelled by {cancelledBy}.</h4>
            </div>
          </>
        )}
        <Divider />
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
          <BeeLink href={`/trips/${trip.id}/receipt`}>
            <Fab
              clear
              color="upper"
              height="80px"
              icon="decorative/receipt"
              iconColor="secondary"
              noFlex
              noPadding
              textStyle="read-4">
              Receipt
            </Fab>
          </BeeLink>
        </div>
      </div>
    </ExpiredTripCardContainer>
  );
};

export default ExpiredTripCard;

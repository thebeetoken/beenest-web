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
import { getUserBookingDisplayStatus } from 'utils/bookingsDisplayStatus';

interface Props {
  trip: Booking;
}

interface DisplayMap {
  [key: string]: string;
}

const cancelledDisplayMap: DisplayMap = {
  host_cancelled: 'Trip cancelled by host',
  host_rejected: 'Trip rejected by host',
  guest_cancelled: 'Trip cancelled by you',
  guest_cancel_initiated: 'Cancel initiated by you',
  guest_rejected: 'Trip rejected by you',
  guest_rejected_payment: 'Payment rejected by you',
  expired_before_host_approved: 'Expired before host approved',
  payment_failed: 'Payment failed',
  refunded: 'Refunded',
};

const ExpiredTripCard = ({ trip }: Props) => {
  const { checkInDate, checkOutDate, id, listing, status } = trip;
  const cancelledStatus = cancelledDisplayMap[status] || '';
  const displayStatus = getUserBookingDisplayStatus(status);
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
        {!cancelledStatus && <h5>Status: {displayStatus}</h5>}
        <h6>Booking: <span>{id}</span></h6>
        <div className="bee-flex-div" />
        {cancelledStatus && (
          <>
            <Divider />
            <div className="trip-card--cancelled-bar">
              <h4>{cancelledStatus}</h4>
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

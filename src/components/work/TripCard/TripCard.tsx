import * as React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, CardText, CardFooter } from 'reactstrap';
import { Booking, GUEST_SORTED_BOOKINGS } from 'networking/bookings';
import { getUserBookingDisplayStatus, cancelledDisplayMap } from 'utils/bookingsDisplayStatus';
import { formatAddress, formatGeolocationAddress } from 'utils/formatter';
import { formatSingleDate } from 'utils/formatDate';

enum ModalType {
  CANCEL_BOOKING = 'CANCEL_BOOKING',
  CONTACT_HOST = 'CONTACT_HOST',
}

interface Props {
  booking: Booking;
  category: GUEST_SORTED_BOOKINGS;
  handleModalAction: (modal: ModalType) => void;
}

const TripCard = ({ booking, category, handleModalAction }: Props) => {
  const { checkInDate, checkOutDate, id, listing, status } = booking;
  const { addressLine1, addressLine2, city, country, lat, lng, postalCode, state } = listing;
  const cancelledStatus = cancelledDisplayMap[status] || '';
  const displayStatus = getUserBookingDisplayStatus(status);
  const isCancelButtonShown = category !== GUEST_SORTED_BOOKINGS.PAST && category !== GUEST_SORTED_BOOKINGS.CANCELLED;
  return (
    <Card className="mb-5 shadow flex-fill border-0" key={booking.id}>
      <div className="embed-responsive embed-responsive-4by3">
        <div className="embed-responsive-item">
          <CardImg src={booking.listing.listingPicUrl} alt="Listing Cover Photo" />
        </div>
      </div>
      <CardBody className="d-flex flex-column">
        <CardTitle className="h5 font-weight-normal mb-3">{booking.listing.title}</CardTitle>
        <div className="bee-flex-div" />
        <CardSubtitle className="small mb-3">
          {addressLine1 && formatAddress(addressLine1, addressLine2, city, state, country, postalCode)}
          {!addressLine1 && formatGeolocationAddress({ lat, lng, city, country })}
        </CardSubtitle>
        <Row className="mb-1">
          <Col xs="6">
            <small>Check-in:</small>
            <h6>{formatSingleDate(checkInDate)}</h6>
          </Col>
          <Col xs="6">
            <small>Check-out:</small>
            <h6>{formatSingleDate(checkOutDate)}</h6>
          </Col>
        </Row>
        {category === GUEST_SORTED_BOOKINGS.CANCELLED
          ? <CardText className="text-danger">{cancelledStatus}</CardText>
          : <CardText>Status: {displayStatus}</CardText>}
        <CardText className="small">
          Booking: <span>{id}</span>
        </CardText>
      </CardBody>
      <CardFooter className="text-center">
        <Row className="align-items-center">
          {[
            {
              label: 'Contact Host',
              onClick: () => handleModalAction(ModalType.CONTACT_HOST),
              show: true,
            },
            {
              label: 'Receipt',
              href: `/trips/${booking.id}/receipt`,
              show: true,
            },
            {
              label: 'Cancel Trip',
              onClick: () => handleModalAction(ModalType.CANCEL_BOOKING),
              show: isCancelButtonShown,
            },
          ]
            .filter(({ show }) => show)
            .map(({ label, href, onClick }, i, arr) => {
              return (
                <Col key={i} onClick={onClick} className={i !== arr.length - 1 ? 'u-ver-divider' : ''}>
                  {href ? (
                    <a href={href}>
                      <h5 className="small font-weight-normal text-secondary mb-0">{label}</h5>
                    </a>
                  ) : (
                    <h5 className="small font-weight-normal text-secondary mb-0">{label}</h5>
                  )}
                </Col>
              );
            })}
        </Row>
      </CardFooter>
    </Card>
  );
};

export default TripCard;

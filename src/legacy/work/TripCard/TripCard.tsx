import * as React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, CardText, CardFooter } from 'reactstrap';
import { Booking, GUEST_SORTED_BOOKINGS } from 'networking/bookings';
import { getUserBookingDisplayStatus, cancelledDisplayMap } from 'utils/bookingsDisplayStatus';
import { formatAddress, formatGeolocationAddress } from 'utils/formatter';
import { formatSingleDate } from 'utils/formatDate';
import { Link } from 'react-router-dom';

interface Props {
  booking: Booking;
  category: GUEST_SORTED_BOOKINGS;
  handleOpenCancelBookingModal: () => void;
  handleOpenContactHostModal: () => void;
}

const TripCard = ({ booking, category, handleOpenCancelBookingModal, handleOpenContactHostModal }: Props) => {
  const { checkInDate, checkOutDate, id, listing, status } = booking;
  const { addressLine1, addressLine2, city, country, lat, lng, postalCode, state } = listing;
  const titleLink = `/listings/${listing.idSlug}`;
  
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
        <a href={titleLink} className="text-dark">
          <CardTitle className="h5 font-weight-normal mb-3">{booking.listing.title}</CardTitle>
        </a>
        <div className="bee-flex-div" />
        <CardSubtitle className="small mb-3">
          {addressLine1
            ? formatAddress(addressLine1, addressLine2, city, state, country, postalCode)
            : formatGeolocationAddress({ lat, lng, city, country })}
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
              onClick: (event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                handleOpenContactHostModal();
              },
              show: true,
            },
            {
              label: 'Receipt',
              to: `/work/trips/${booking.id}/receipt`,
              show: true,
            },
            {
              label: 'Cancel Trip',
              onClick: (event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                handleOpenCancelBookingModal();
              },
              show: isCancelButtonShown,
            },
          ]
            .filter(({ show }) => show)
            .map(({ label, to, onClick }, i, arr) => {
              return (
                <Col key={i} className={i !== arr.length - 1 ? 'u-ver-divider' : ''}>
                  <Link to={to || '#'} onClick={onClick}>
                    <h5 className="small font-weight-normal text-secondary mb-0">{label}</h5>
                  </Link>
                </Col>
              );
            })}
        </Row>
      </CardFooter>
    </Card>
  );
};

export default TripCard;

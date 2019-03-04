import * as React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, CardText, CardFooter } from 'reactstrap';
import { Booking } from 'networking/bookings';
import { getUserBookingDisplayStatus } from 'utils/bookingsDisplayStatus';
import { formatAddress, formatGeolocationAddress } from 'utils/formatter';
import { formatSingleDate } from 'utils/formatDate';

interface Props {
  booking: Booking;
  handleOpenCancelBookingModal: () => void;
  handleOpenContactHostModal: () => void;
}

const TripCard = ({ booking, handleOpenCancelBookingModal, handleOpenContactHostModal }: Props) => {
  const { checkInDate, checkOutDate, id, listing, status } = booking;
  const { addressLine1, addressLine2, city, country, lat, lng, postalCode, state } = listing;
  const displayStatus = getUserBookingDisplayStatus(status);
  return (
    <Card className="mb-5 flex-fill" key={booking.id}>
      <div className="embed-responsive embed-responsive-4by3">
        <div className="embed-responsive-item">
          <CardImg className="h-100" top src={booking.listing.listingPicUrl} alt="Listing Cover Photo" />
        </div>
      </div>
      <CardBody>
        <CardTitle className="h5 font-weight-normal mb-3">{booking.listing.title}</CardTitle>
        <CardSubtitle className="small mb-3">
          {addressLine1
            ? formatAddress(addressLine1, addressLine2, city, state, country, postalCode)
            : formatGeolocationAddress({ lat, lng, city, country })}
        </CardSubtitle>
        <Row>
          <Col xs="6">
            <small>Check-in:</small>
            <h6>{formatSingleDate(checkInDate)}</h6>
          </Col>
          <Col xs="6">
            <small>Check-out:</small>
            <h6>{formatSingleDate(checkOutDate)}</h6>
          </Col>
        </Row>
        <CardText>Status: {displayStatus}</CardText>
        <CardText className="small">
          Booking: <span>{id}</span>
        </CardText>
      </CardBody>
      <CardFooter className="text-center">
        <Row className="align-items-center">
          <Col
            xs="4"
            onClick={handleOpenContactHostModal}
            className="u-ver-divider">
            <h5 className="small c-pointer font-weight-normal text-secondary mb-0">Contact Host</h5>
          </Col>
          <Col
            xs="4"
            className="u-ver-divider">
            <a href={`/trips/${booking.id}/receipt`}>
              <h5 className="small font-weight-normal text-secondary mb-0">Receipt</h5>
            </a>
          </Col>
          <Col
            xs="4"
            onClick={handleOpenCancelBookingModal}>
            <h5 className="small c-pointer font-weight-normal text-secondary mb-0">Cancel Trip</h5>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
};

export default TripCard;

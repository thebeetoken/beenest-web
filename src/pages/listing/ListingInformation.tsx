import * as React from 'react';
import { Col, Fade, Row } from 'reactstrap';
import sanitizeHtml from 'sanitize-html';

import { Listing } from 'networking/listings';
import GoogleMaps from 'shared/GoogleMaps';
import Avatar from 'components/work/Avatar';
import ContactHostButton from 'components/work/ContactHostButton';
import { formatAddress, formatMonth } from 'utils/formatter';

const ListingInformation = ({
  amenities,
  checkInTime,
  checkOutTime,
  city,
  country,
  description,
  homeType,
  host,
  id,
  lat,
  lng,
  minimumNights,
  maxGuests,
  numberOfBedrooms,
  numberOfBathrooms,
  sharedBathroom,
  sleepingArrangement,
  state,
  title
}: Listing) => <Fade className="mt-6">
  <h3>{title}</h3>
  <address>{formatAddress(city, state, country)}</address>

  <section className="mb-6">
    <Avatar user={host} />
    <p>Host: {host.displayName}</p>
  </section>

  <section className="mb-6">
    <h3>Description</h3>
    <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }} />
    <hr className="mt-6"/>
  </section>

  <section className="mb-6">
    <h3>Accommodations</h3>
    <dl className="row">
      {homeType && <>
        <dt className="col-6">Home Type</dt>
        <dd className="col-6">{homeType}</dd>
      </>}
      {sleepingArrangement && <>
        <dt className="col-6">Sleeping arrangement</dt>
        <dd className="col-6">{sleepingArrangement}</dd>
      </>}
      {typeof numberOfBedrooms === 'number' && <>
        <dt className="col-6">Number of bedrooms</dt>
        <dd className="col-6">{numberOfBedrooms}</dd>
      </>}
      {typeof numberOfBathrooms === 'number' && <>
        <dt className="col-6">Number of bathrooms</dt>
        <dd className="col-6">{numberOfBathrooms}</dd>
      </>}
      {sharedBathroom && <>
        <dt className="col-6">Shared bathroom</dt>
        <dd className="col-6">{sharedBathroom}</dd>
      </>}
      {typeof maxGuests === 'number' && <>
        <dt className="col-6">Maximum number of guests</dt>
        <dd className="col-6">{maxGuests}</dd>
      </>}
      {typeof minimumNights === 'number' && <>
        <dt className="col-6">Minimum number of nights</dt>
        <dd className="col-6">{minimumNights}</dd>
      </>}
      {checkInTime && <>
        <dt className="col-6">Check-in</dt>
        <dd className="col-6">{checkInTime.from} to {checkInTime.to}</dd>
      </>}
      {checkOutTime && <>
        <dt className="col-6">Check-out</dt>
        <dd className="col-6">{checkOutTime}</dd>
      </>}
    </dl>
    <hr className="mt-6"/>
  </section>

  <section className="mb-6">
    <h3 className={amenities.length > 0 ? '' : 'd-none'}>Amenities</h3>
    <ul>
      {amenities.map(amenity => <li key={amenity}>{amenity}</li>)}
    </ul>
    <hr className="mt-6"/>
  </section>

  <section className="mb-6">
    <h3 className="d-none d-md-block">Location</h3>
    <GoogleMaps lat={lat} lng={lng} showCircle />
    <hr className="mt-6"/>
  </section>

  <section className="mb-6">
    <h3>About {host.displayName}</h3>
    <p><small>Member since {formatMonth(host.createdAt)}</small></p>
    <Row className="align-items-center justify-content-between">
      <Col xs="auto"><Avatar user={host} /></Col>
      <Col xs="auto"><ContactHostButton listingId={id} host={host} /></Col>
    </Row>
    {host.about && <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(host.about) }} />}
  </section>

</Fade>;

export default ListingInformation;

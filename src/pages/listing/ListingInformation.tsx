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
        <dt className="col-6 font-weight-medium mb-2 mb-md-0 text-lh-sm">Home Type</dt>
        <dd className="col-6 text-lh-sm">{homeType}</dd>
      </>}
      {sleepingArrangement && <>
        <dt className="col-6 font-weight-medium mb-2 mb-md-0 text-lh-sm">Sleeping arrangement</dt>
        <dd className="col-6 text-lh-sm">{sleepingArrangement}</dd>
      </>}
      {typeof numberOfBedrooms === 'number' && <>
        <dt className="col-6 font-weight-medium mb-2 mb-md-0 text-lh-sm">Number of bedrooms</dt>
        <dd className="col-6 text-lh-sm">{numberOfBedrooms}</dd>
      </>}
      {typeof numberOfBathrooms === 'number' && <>
        <dt className="col-6 font-weight-medium mb-2 mb-md-0 text-lh-sm">Number of bathrooms</dt>
        <dd className="col-6 text-lh-sm">{numberOfBathrooms}</dd>
      </>}
      {sharedBathroom && <>
        <dt className="col-6 font-weight-medium mb-2 mb-md-0 text-lh-sm">Shared bathroom</dt>
        <dd className="col-6 text-lh-sm">{sharedBathroom}</dd>
      </>}
      {typeof maxGuests === 'number' && <>
        <dt className="col-6 font-weight-medium mb-2 mb-md-0 text-lh-sm">Maximum number of guests</dt>
        <dd className="col-6 text-lh-sm">{maxGuests}</dd>
      </>}
      {typeof minimumNights === 'number' && <>
        <dt className="col-6 font-weight-medium mb-2 mb-md-0 text-lh-sm">Minimum number of nights</dt>
        <dd className="col-6 text-lh-sm">{minimumNights}</dd>
      </>}
      {checkInTime && <>
        <dt className="col-6 font-weight-medium mb-2 mb-md-0 text-lh-sm">Check-in</dt>
        <dd className="col-6 text-lh-sm">{checkInTime.from} to {checkInTime.to}</dd>
      </>}
      {checkOutTime && <>
        <dt className="col-6 font-weight-medium mb-2 mb-md-0 text-lh-sm">Check-out</dt>
        <dd className="col-6 text-lh-sm">{checkOutTime}</dd>
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
    <h3>Location</h3>
    <GoogleMaps className="bee-custom-google-maps" lat={lat} lng={lng} showCircle />
    <hr className="mt-6"/>
  </section>

  <section className="mb-6">
    <h3>About {host.displayName}</h3>
    <p><small>Member since {formatMonth(host.createdAt)}</small></p>
    <Row className="align-items-center justify-content-between">
      <Col xs="auto"><Avatar user={host} /></Col>
      <Col xs="auto" className="p-md-0 pr-lg-2"><ContactHostButton listingId={id} host={host} /></Col>
    </Row>
    {host.about && <p className="mt-4" dangerouslySetInnerHTML={{ __html: sanitizeHtml(host.about) }} />}
  </section>

</Fade>;

export default ListingInformation;

import * as React from 'react';
import { Fade } from 'reactstrap';
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
}: Listing) => <Fade className="mt-3">
  <h1>{title}</h1>
  <address>{formatAddress(city, state, country)}</address>
  <p>Host: {host.displayName}</p>
  <Avatar user={host} />
  <h1>Description</h1>
  <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }} />
  <h1>Accommodations</h1>
  <dl className="row">
    <dt className="col-6">Home Type</dt>
    <dd className="col-6">{homeType}</dd>
    <dt className="col-6">Sleeping arrangement</dt>
    <dd className="col-6">{sleepingArrangement}</dd>
    <dt className="col-6">Number of bedrooms</dt>
    <dd className="col-6">{numberOfBedrooms}</dd>
    <dt className="col-6">Number of bathrooms</dt>
    <dd className="col-6">{numberOfBathrooms}</dd>
    <dt className="col-6">Shared bathroom</dt>
    <dd className="col-6">{sharedBathroom}</dd>
    <dt className="col-6">Maximum number of guests</dt>
    <dd className="col-6">{maxGuests}</dd>
    <dt className="col-6">Minimum number of nights</dt>
    <dd className="col-6">{minimumNights}</dd>
    <dt className="col-6">Check-in</dt>
    <dd className="col-6">{checkInTime.from} to {checkInTime.to}</dd>
    <dt className="col-6">Check-out</dt>
    <dd className="col-6">{checkOutTime}</dd>
  </dl>
  <h1>Amenities</h1>
  <ul>
    {amenities.map(amenity => <li key={amenity}>{amenity}</li>)}
  </ul>
  <h1>Location</h1>
  <GoogleMaps lat={lat} lng={lng} showCircle />
  <h1>About {host.displayName}</h1>
  <p><small>Member since {formatMonth(host.createdAt)}</small></p>
  <Avatar user={host} />
  <ContactHostButton listingId={id} host={host} />
  <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(host.about) }} />
</Fade>;

export default ListingInformation;

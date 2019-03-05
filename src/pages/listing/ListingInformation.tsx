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
}: Listing) => <Fade>
  <h1>{title}</h1>
  <address>{formatAddress(city, state, country)}</address>
  <p>Host: {host.displayName}</p>
  <Avatar user={host} />
  <h1>Description</h1>
  <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }} />
  <h1>Accommodations</h1>
  <dl>
    <dt>Home Type</dt><dd>{homeType}</dd>
    <dt>Sleeping arrangement</dt><dd>{sleepingArrangement}</dd>
    <dt>Number of bedrooms</dt><dd>{numberOfBedrooms}</dd>
    <dt>Number of bathrooms</dt><dd>{numberOfBathrooms}</dd>
    <dt>Shared bathroom</dt><dd>{sharedBathroom}</dd>
    <dt>Maximum number of guests</dt><dd>{maxGuests}</dd>
    <dt>Minimum number of nights</dt><dd>{minimumNights}</dd>
    <dt>Check-in</dt><dd>{checkInTime.from} to {checkInTime.to}</dd>
    <dt>Check-out</dt><dd>{checkOutTime}</dd>
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

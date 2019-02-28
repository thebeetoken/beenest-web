import * as React from 'react';
import { Fade, Row } from 'reactstrap';
import sanitizeHtml from 'sanitize-html';

import { Listing } from 'networking/listings';
import ImageGrid from 'shared/ImageGrid';
import LazyImage from 'shared/LazyImage';
import { formatAddress } from 'utils/formatter';

const DEFAULT_PROFILE_URL = 'https://static.beenest.com/images/app/misc/profile.png';

const ListingInformation = ({
  checkInTime,
  checkOutTime,
  city,
  country,
  description,
  homeType,
  host,
  listingPicUrl,
  minimumNights,
  maxGuests,
  numberOfBedrooms,
  numberOfBathrooms,
  photos,
  sharedBathroom,
  sleepingArrangement,
  state,
  title
}: Listing) => <Fade>
  <Row className="w-100 px-0 mx-0" style={{ height: '75vh' }}>
    <ImageGrid images={[listingPicUrl, ...photos]} />
  </Row>
  <h1>{title}</h1>
  <h2>{formatAddress(city, state, country)}</h2>
  <h3>Host: {host.displayName}</h3>
  <LazyImage src={host.profilePicUrl || DEFAULT_PROFILE_URL} width="5rem" height="5rem" />
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
</Fade>;


export default ListingInformation;

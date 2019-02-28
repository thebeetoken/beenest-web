import * as React from 'react';
import { Fade, Row } from 'reactstrap';

import { Listing } from 'networking/listings';
import ImageGrid from 'shared/ImageGrid';
import LazyImage from 'shared/LazyImage';
import { formatAddress } from 'utils/formatter';

const DEFAULT_PROFILE_URL = 'https://static.beenest.com/images/app/misc/profile.png';

const ListingInformation = ({
  city,
  country,
  host,
  listingPicUrl,
  photos,
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
</Fade>;


export default ListingInformation;

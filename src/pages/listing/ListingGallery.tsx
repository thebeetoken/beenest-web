import * as React from 'react';
import { Row } from 'reactstrap';

import ImageGrid from 'shared/ImageGrid';

import { Listing } from 'networking/listings';

const ListingGallery = ({ listingPicUrl, photos }: Listing) => (
  <Row className="w-100 px-0 mx-0" style={{ height: '75vh' }}>
    <ImageGrid images={[listingPicUrl, ...photos]} />
  </Row>
);
export default ListingGallery;
import * as React from 'react';
import { Button, Row } from 'reactstrap';

import ImageGrid from 'shared/ImageGrid';

import { Listing } from 'networking/listings';

const ListingGallery = ({ listingPicUrl, photos }: Listing) => (
  <Row className="w-100 px-0 mx-0" style={{ height: '75vh' }}>
    <ImageGrid images={[listingPicUrl, ...photos]} />
    <Button>View Photos <span className="fas fa-camera"></span></Button>
  </Row>
);
export default ListingGallery;
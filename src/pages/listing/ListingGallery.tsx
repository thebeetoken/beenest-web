import * as React from 'react';
import { Button, Row } from 'reactstrap';

import ImageGrid from 'shared/ImageGrid';

import { Listing } from 'networking/listings';

const ListingGallery = ({ listingPicUrl, photos }: Listing) => (
  <Row className="w-100 px-0 mx-0 position-relative" style={{ height: '75vh' }}>
    <ImageGrid images={[listingPicUrl, ...photos]} />
    <Button className="position-absolute bottom-0 right-0 m-4">
      View Photos <span className="fas fa-camera"></span>
    </Button>
  </Row>
);
export default ListingGallery;
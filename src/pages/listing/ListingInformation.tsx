import * as React from 'react';
import { Fade, Row } from 'reactstrap';

import { Listing } from 'networking/listings';
import ImageGrid from 'shared/ImageGrid';

const ListingInformation = ({
  listingPicUrl,
  photos,
  title
}: Listing) => <Fade>
  <Row className="w-100 px-0 mx-0" style={{ height: '75vh' }}>
    <ImageGrid images={[listingPicUrl, ...photos]} />
  </Row>
  <h1>{title}</h1>
</Fade>;


export default ListingInformation;

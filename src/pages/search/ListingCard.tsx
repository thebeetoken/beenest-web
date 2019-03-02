import * as React from 'react';
import { Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle, Fade } from 'reactstrap';

import { ListingShort } from 'networking/listings';

const ListingCard = ({
  homeType,
  idSlug,
  listingPicUrl,
  pricePerNightUsd,
  title
}: ListingShort) => (
  <a href={`/work/listings/${idSlug}`} className="w-100 h-100">
    <Card tag={Fade} className="w-100 h-100">
      <div className="embed-responsive embed-responsive-4by3">
        <div className="embed-responsive-item">
          <CardImg className="w-100" src={listingPicUrl} alt={`Photo of ${title}`} />
        </div>
      </div>
      <CardBody>
        <CardSubtitle>{homeType}</CardSubtitle>
        <CardTitle tag="h5">{title}</CardTitle>
      </CardBody>
      <CardFooter>
        <CardText>${pricePerNightUsd} per night</CardText>
      </CardFooter>
    </Card>
  </a>
);

export default ListingCard;

import * as React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Fade } from 'reactstrap';

import { ListingShort } from 'networking/listings';

const ListingCard = ({
  homeType,
  listingPicUrl,
  pricePerNightUsd,
  sleepingArrangement,
  title
}: ListingShort) => (
  <Card tag={Fade}>
    <div className="embed-responsive embed-responsive-4by3">
      <div className="embed-responsive-item">
        <CardImg className="w-100" src={listingPicUrl} alt={`Photo of ${title}`} />
      </div>
    </div>
    <CardBody>
      <CardSubtitle>{homeType} &middot; {sleepingArrangement} </CardSubtitle>
      <CardTitle tag="h5">{title}</CardTitle>
      <CardText>${pricePerNightUsd} per night</CardText>
    </CardBody>
  </Card>
);

export default ListingCard;

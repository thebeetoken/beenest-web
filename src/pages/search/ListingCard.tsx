import * as React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';

import { ListingShort } from 'networking/listings';

const ListingCard = ({
  homeType,
  listingPicUrl,
  pricePerNightUsd,
  sleepingArrangement,
  title
}: ListingShort) => (
  <Card>
    <CardImg top width="100%" src={listingPicUrl} alt={`Photo of ${title}`} />
    <CardBody>
      <CardSubtitle>{homeType} &middot; {sleepingArrangement} </CardSubtitle>
      <CardTitle>{title}</CardTitle>
      <CardText>${pricePerNightUsd} per night</CardText>
    </CardBody>
  </Card>
);

export default ListingCard;

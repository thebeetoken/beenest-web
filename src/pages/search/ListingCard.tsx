import * as React from 'react';
import { Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle, Fade } from 'reactstrap';

import StarRatings from 'react-star-ratings';

import { ListingShort } from 'networking/listings';

const ListingCard = ({
  homeType,
  listingPicUrl,
  pricePerNightUsd,
  rating,
  title
}: ListingShort) => (
  <Card tag={Fade} className="w-100 h-100 border-0">
    <div className="embed-responsive embed-responsive-4by3">
      <div className="embed-responsive-item">
        <CardImg className="w-100" src={listingPicUrl} alt={`Photo of ${title}`} />
      </div>
    </div>
    <CardBody>
      <CardSubtitle className="small text-secondary justify-content-between row no-gutters">
        {homeType}
        {rating && <div className="mb-1" style={{ marginTop: '-0.375rem' }}>
          <StarRatings
            numberOfStars={5}
            rating={rating.average / 2}
            starDimension="0.875rem"
            starSpacing="0rem"
          />
        </div>}
      </CardSubtitle>
      <CardTitle className="mb-0" tag="h6">{title}</CardTitle>
    </CardBody>
    <CardFooter>
      <CardText>${pricePerNightUsd} per night</CardText>
    </CardFooter>
  </Card>
);

export default ListingCard;

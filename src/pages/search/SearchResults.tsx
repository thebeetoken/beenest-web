import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

import { ListingShort } from 'networking/listings';
import { stringifyQueryString } from 'utils/queryParams';

import ListingCard from './ListingCard';

interface Params {
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: number;
}

interface Props extends Params {
  listings: ListingShort[];
  onSelect: (listing: ListingShort | null) => void;
}

const listingPath = (listing: ListingShort, params: Params) =>
  `/listings/${listing.idSlug}?${stringifyQueryString(params)}`;

const SearchResults = ({
  listings,
  checkInDate,
  checkOutDate,
  numberOfGuests,
  onSelect
}: Props) => (
  <Row>
    {listings.map((listing, index) => (
      <Col xs="12" md="6" key={index} className="mb-5 d-flex">
        <Link
          onMouseEnter={() => onSelect(listing)}
          onMouseLeave={() => onSelect(null)}
          to={listingPath(listing, { checkInDate, checkOutDate, numberOfGuests })}
          className="w-100 h-100">
          <ListingCard {...listing} />
        </Link>
      </Col>
    ))}
  </Row>
);

export default SearchResults;

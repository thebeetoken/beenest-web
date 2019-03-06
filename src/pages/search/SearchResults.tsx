import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

import { ListingShort } from 'networking/listings';

import ListingCard from './ListingCard';

interface Props {
  listings: ListingShort[];
}

const SearchResults = ({ listings }: Props) => (
  <Row>
    {listings.map((listing, index) => (
      <Col xs="12" md="6" key={index} className="mb-5 d-flex">
        <Link to={`/work/listings/${listing.idSlug}`} className="w-100 h-100">
          <ListingCard {...listing} />
        </Link>
      </Col>
    ))}
  </Row>
);

export default SearchResults;

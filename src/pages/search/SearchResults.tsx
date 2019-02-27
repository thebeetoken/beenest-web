import * as React from 'react';
import { Col, Row } from 'reactstrap';

import { ListingShort } from 'networking/listings';

import ListingCard from './ListingCard';

interface Props {
  listings: ListingShort[];
}

const SearchResults = ({ listings }: Props) => (
  <Row>
    {listings.map((listing, index) => (
      <Col xs="12" md="6" lg="4" key={index}>
        <ListingCard {...listing} />
      </Col>
    ))}
  </Row>
);

export default SearchResults;

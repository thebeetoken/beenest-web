import * as React from 'react';
import { CardDeck, Col, Row } from 'reactstrap';

import { ListingShort } from 'networking/listings';

import ListingCard from './ListingCard';

interface Props {
  listings: ListingShort[];
}

const SearchResults = ({ listings }: Props) => (
  <CardDeck>
    <Row>
      {listings.map((listing, index) => (
        <Col xs="12" md="6" lg="4">
          <ListingCard key={index} {...listing} />
        </Col>
      ))}
    </Row>
  </CardDeck>
);

export default SearchResults;

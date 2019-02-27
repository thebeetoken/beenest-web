import * as React from 'react';
import { CardDeck } from 'reactstrap';

import { ListingShort } from 'networking/listings';

import ListingCard from './ListingCard';

interface Props {
  listings: ListingShort[];
}

const SearchResults = ({ listings }: Props) => (
  <CardDeck>
    {listings.map((listing, index) => <ListingCard key={index} {...listing} />)}
  </CardDeck>
);

export default SearchResults;

import * as React from 'react';

import { ListingShort } from 'networking/listings';

import ListingCard from './ListingCard';

interface Props {
  listings: ListingShort[];
}

const SearchResults = ({ listings }: Props) => (
  <>
    {listings.map(listing => <ListingCard {...listing} />)}
  </>
);

export default SearchResults;

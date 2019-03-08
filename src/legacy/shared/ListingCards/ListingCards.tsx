import * as React from 'react';

import ListingCardsContainer from 'legacy/shared/ListingCards/ListingCards.container';
import { ListingShort } from 'networking/listings';
import { ListingCard } from 'legacy/shared/ListingCard';

interface Props {
  listings: ListingShort[];
}

const ListingCards = ({ listings }: Props) => 
  <ListingCardsContainer>
    {(listings || []).map((listing: ListingShort) => {
      return (
        <ListingCard hover key={listing.id} {...listing} />
      );
    })}
  </ListingCardsContainer>
;

export default ListingCards;

import * as React from 'react';

import ListingGallery from './ListingGallery';
import ListingInformation from './ListingInformation';
import BookingCard from './BookingCard';

import { Listing } from 'networking/listings';

const ListingPage = (listing: Listing) => (<>
  <ListingGallery {...listing} />
  <ListingInformation {...listing} />
  <BookingCard {...listing} />
</>);
export default ListingPage;

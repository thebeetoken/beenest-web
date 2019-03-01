import * as React from 'react';
import { Listing } from 'networking/listings';
const BookingCard = (listing: Listing) => (
  <div>Book {listing.id}</div>
);
export default BookingCard;

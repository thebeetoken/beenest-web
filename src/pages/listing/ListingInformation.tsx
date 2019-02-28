import * as React from 'react';
import { Listing } from 'networking/listings';

const ListingInformation = ({
  title
}: Listing) => <h1>{title}</h1>;

export default ListingInformation;

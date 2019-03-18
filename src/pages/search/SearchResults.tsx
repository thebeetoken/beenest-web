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
  selectedListing?: ListingShort;
}

// Link.innerRef doesn't accept a React ref as a propType, so fake it
interface FakeRef {
  current: Element | null;
}

const listingPath = (listing: ListingShort, params: Params) =>
  `/listings/${listing.idSlug}?${stringifyQueryString(params)}`;

const SearchResults = ({
  listings,
  checkInDate,
  checkOutDate,
  numberOfGuests,
  onSelect,
  selectedListing
}: Props) => {
  const ref: FakeRef = { current: null };
  React.useEffect(() => {
    if (ref.current) {
      const bounds = ref.current.getBoundingClientRect();
      if (bounds.top > window.innerHeight || bounds.bottom < 0) {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [selectedListing]);
  return <Row>
    {listings.map((listing, index) => {
      const isSelected = listing === selectedListing;
      return <Col xs="12" md="6" key={index} className="mb-5 d-flex">
        <Link
          innerRef={a => ref.current = isSelected ? a : ref.current}
          onMouseEnter={() => onSelect(listing)}
          onMouseLeave={() => onSelect(null)}
          to={listingPath(listing, { checkInDate, checkOutDate, numberOfGuests })}
          className={`w-100 h-100 ${isSelected ? 'shadow-primary-lg' : 'shadow'}`}>
          <ListingCard {...listing} />
        </Link>
      </Col>;
    })}
  </Row>;
};

export default SearchResults;

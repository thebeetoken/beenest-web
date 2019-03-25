import * as React from 'react';
import { Col, Fade, Row } from 'reactstrap';

import { Listing, ListingShort } from 'networking/listings';

import GoogleMapsWithMarkers from 'components/shared/GoogleMapsWithMarkers';
import SearchBar from 'legacy/work/SearchBar';

import { useDebounce } from 'utils/hooks';

import { SearchFilterCriteria, toGoogleTravelMode } from './SearchCriteria';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

interface Props {
  onFilterChange: (filter: SearchFilterCriteria) => void;
  filter: SearchFilterCriteria;
  listings: Listing[];
}

const SearchPage = ({
  filter,
  onFilterChange,
  listings
}: Props) => {
  const { checkInDate, checkOutDate, numberOfGuests } = filter;
  const [selectedListing, selectListing] = React.useState<ListingShort | null>(null);
  const debouncedListing = useDebounce(selectedListing, 125);
  return <Fade>
    <Row className="px-0 mx-0 bg-white bee-top">
      <Col className="p-5" xs="12" lg="10" xl="9">
        <SearchBar
          onSubmit={params => onFilterChange({ ...filter, ...params })}
          filter={filter}
        />
      </Col>
    </Row>
    <Row className="min-vh-100 h-100 px-0 mx-0">
      <Col md="12" lg="5" xl="4" className="px-5">
        <Row className="mb-5">
          <SearchForm filter={filter} onFilterChange={onFilterChange}/>
        </Row>
        <SearchResults
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          numberOfGuests={numberOfGuests}
          onSelect={selectListing}
          listings={listings}
          selectedListing={debouncedListing || undefined}
        />
      </Col>
      <Col md="0" lg="7" xl="8" className="px-0 d-md-none d-lg-block">
        <div className="w-100 sticky-top bee-top bee-search-map z-index-0">
          <GoogleMapsWithMarkers
            className={`w-100 h-100${!!filter.near ? ' bee-directions-showing' : ''}`}
            listings={listings}
            near={filter.near}
            travelMode={toGoogleTravelMode(filter.travelMode)}
            selectedListing={debouncedListing || undefined}
            onSelect={selectListing}
          />
        </div>
      </Col>
    </Row>
  </Fade>;
};

export default SearchPage;

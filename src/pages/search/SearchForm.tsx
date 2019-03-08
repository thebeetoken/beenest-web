import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { ListingSearchCriteria } from 'networking/listings';

import TransitTime from './filters/TransitTime';

import SearchFilter from './SearchFilter';

export interface SearchFormState {
  place?: google.maps.places.PlaceResult | null;
}

interface Props {
  onFilterChange?: (filter: ListingSearchCriteria) => void;
}

const SearchForm = ({ onFilterChange }: Props) => {
  const [state, setState] = React.useState<SearchFormState>({
    place: null
  });
  const [filters, setFilters] = React.useState<ListingSearchCriteria>({});

  return <Container>
    <Row>
      <Col key={label}>
        <SearchFilter label="Close To...">
          <TransitTime
            place={state.place}
            onFilterChange={setFilters}
            onPlaceChange={setPlace}
          />
        </SearchFilter>
      </Col>
    </Row>
  </Container>;

  function setPlace(place: google.maps.places.PlaceResult | null) {
    return setState({ ...state, place: place });
  }
};

export default SearchForm;

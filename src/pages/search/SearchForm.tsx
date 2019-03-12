import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { SearchFilterCriteria } from './SearchCriteria';
import TransitTime from './filters/TransitTime';
import SearchFilter from './SearchFilter';

interface Props {
  filter?: SearchFilterCriteria;
  onFilterChange?: (filter: SearchFilterCriteria) => void;
}

const SearchForm = ({ filter, onFilterChange }: Props) => {
  return <Container>
    <Row>
      <Col>
        <SearchFilter label="Add Destination">
          <TransitTime
            place={filter ? filter.near : undefined}
            onPlaceChange={handlePlaceChange}
          />
        </SearchFilter>
      </Col>
    </Row>
  </Container>;

  function handlePlaceChange(place: google.maps.places.PlaceResult | null) {
    if (onFilterChange) {
      onFilterChange(place ? { near: place } : {});
    }
  }
};

export default SearchForm;

import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { SearchFilterCriteria } from './SearchCriteria';
import HomeType from './filters/HomeType';
import TransitTime from './filters/TransitTime';
import SearchFilter from './SearchFilter';

interface Props {
  filter: SearchFilterCriteria;
  onFilterChange: (filter: SearchFilterCriteria) => void;
}

const SearchForm = ({ filter, onFilterChange }: Props) => {
  return <Container>
    <Row>
      <Col>
        <SearchFilter label="Home Type">
          <HomeType
            homeType={filter.homeType}
            onChange={homeType => console.log(homeType)}
          />
        </SearchFilter>
      </Col>
      <Col>
        <SearchFilter label="Add Destination">
          <TransitTime
            place={filter.near}
            travelMode={filter.travelMode}
            onPlaceChange={handlePlaceChange}
            onTravelModeChange={handleTravelModeChange}
          />
        </SearchFilter>
      </Col>
    </Row>
  </Container>;

  function handlePlaceChange(place: google.maps.places.PlaceResult | null) {
    if (onFilterChange && filter) {
      const nextFilter: SearchFilterCriteria = { ...filter };
      if (!place) {
        delete nextFilter.near;
      } else {
        nextFilter.near = place;
      }
      onFilterChange(nextFilter);
    }
  }

  function handleTravelModeChange(travelMode: google.maps.TravelMode) {
    if (onFilterChange && filter) {
      onFilterChange({ ...filter, travelMode });
    }
  }
};

export default SearchForm;

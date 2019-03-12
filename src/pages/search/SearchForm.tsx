import * as React from 'react';
import { ButtonGroup, Container, Row } from 'reactstrap';

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
      <ButtonGroup>
        <SearchFilter label="Home Type" width="9rem">
          <HomeType
            homeType={filter.homeType}
            onChange={handleHomeTypeChange}
          />
        </SearchFilter>
        <SearchFilter label="Destination" width="24rem">
          <TransitTime
            place={filter.near}
            travelMode={filter.travelMode}
            onPlaceChange={handlePlaceChange}
            onTravelModeChange={handleTravelModeChange}
          />
        </SearchFilter>
      </ButtonGroup>
    </Row>
  </Container>;

  function handlePlaceChange(place: google.maps.places.PlaceResult | null) {
    const nextFilter: SearchFilterCriteria = { ...filter };
    if (!place) {
      delete nextFilter.near;
    } else {
      nextFilter.near = place;
    }
    onFilterChange(nextFilter);
  }

  function handleTravelModeChange(travelMode: google.maps.TravelMode) {
    onFilterChange({ ...filter, travelMode });
  }

  function handleHomeTypeChange(homeType: string) {
    onFilterChange({ ...filter, homeType });
  }
};

export default SearchForm;

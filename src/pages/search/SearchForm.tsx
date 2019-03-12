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
    <Row noGutters>
      <ButtonGroup>
        <SearchFilter label="Home Type" width="9rem">
          <HomeType
            homeType={filter.homeType}
            onChange={homeType => onFilterChange({ ...filter, homeType })}
          />
        </SearchFilter>
        <SearchFilter label="Destination" width="24rem">
          <TransitTime
            place={filter.near}
            travelMode={filter.travelMode}
            onPlaceChange={near => onFilterChange({ ...filter, near })}
            onTravelModeChange={travelMode => onFilterChange({ ...filter, travelMode })}
          />
        </SearchFilter>
      </ButtonGroup>
    </Row>
  </Container>;
};

export default SearchForm;

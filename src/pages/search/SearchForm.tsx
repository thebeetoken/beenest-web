import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { ListingSearchCriteria } from 'networking/listings';

import TransitTime from './filters/TransitTime';

import SearchFilter from './SearchFilter';

interface Props {
  onFilterChange?: (filter: ListingSearchCriteria) => void;
}

const SEARCH_FILTERS = [
  {
    label: 'Transit Time',
    render: (props: Props) => <TransitTime {...props} />
  }
];

const SearchForm = ({ onFilterChange }: Props) => {
  const [filters, setFilters] = React.useState<any[]>(SEARCH_FILTERS.map(() => ({})));

  return <Container>
    <Row>
    {SEARCH_FILTERS.map(({ label, render }, index) => (
      <Col key={label}>
        <SearchFilter label={label}>
          {render({ onFilterChange: filter => handleFilterChange(index, filter) })}
        </SearchFilter>
      </Col>
    ))}
    </Row>
  </Container>;

  function handleFilterChange(index: number, filter: ListingSearchCriteria) {
    const newFilters = [
      ...(filters.slice(0, index)),
      filter,
      ...(filters.slice(index + 1))
    ];
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters.reduce(
        (allFilters, nextFilter) => ({ ...allFilters, ...nextFilter }),
        {}
      ));
    }
  }
};

export default SearchForm;

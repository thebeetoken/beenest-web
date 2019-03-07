import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import TransitTime from './filters/TransitTime';

import SearchFilter from './SearchFilter';

interface Props {
  onFilterChange?: () => void;
}

const SEARCH_FILTERS = [
  // {
  //   label: 'Home Type',
  //   component: <strong>Home type!</strong>
  // },
  // {
  //   label: 'Price Range',
  //   component: <strong>Price range!</strong>
  // },
  {
    label: 'Transit Time',
    render: (props) => <TransitTime {...props} />
  },
  // {
  //   label: 'More Filters',
  //   component: <strong>Moar filters!</strong>
  // }
];

const SearchForm = ({ onFilterChange }: Props) => {
  const [filters, setFilters] = React.useState<any[]>(SEARCH_FILTERS.map(() => ({})));

  return <Container>
    <Row>
    {SEARCH_FILTERS.map(({ label, render }) => (
      <Col key={label}>
        <SearchFilter label={label}>
          {render({ onFilterChange: filter => handleFilterChange(index, filter) })}
        </SearchFilter>
      </Col>
    ))}
    </Row>
  </Container>;

  function handleFilterChange(index, filter) {
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

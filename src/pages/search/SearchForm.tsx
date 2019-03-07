import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import DistanceFrom from './filters/DistanceFrom';

import SearchFilter from './SearchFilter';

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
    label: 'Distance From...',
    component: () => <DistanceFrom />
  },
  // {
  //   label: 'More Filters',
  //   component: <strong>Moar filters!</strong>
  // }
];

const SearchForm = () => (
  <Container>
    <Row>
    {SEARCH_FILTERS.map(({ label, component }) => (
      <Col key={label}>
        <SearchFilter label={label}>
          {component}
        </SearchFilter>
      </Col>
    ))}
    </Row>
  </Container>
);

export default SearchForm;

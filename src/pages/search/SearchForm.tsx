import * as React from 'react';

import SearchFilter from './SearchFilter';

const SEARCH_FILTERS = [
  {
    label: 'Home Type',
    component: <strong>Home type!</strong>
  },
  {
    label: 'Price Range',
    component: <strong>Price range!</strong>
  },
  {
    label: 'Transit Time',
    component: <strong>Transit time!</strong>
  },
  {
    label: 'More Filters',
    component: <strong>Moar filters!</strong>
  }  
];

const SearchForm = () => (
  <>
  {SEARCH_FILTERS.map(({ label, component }) => (
    <SearchFilter label={label}>
      {component}
    </SearchFilter>
  ))}
  </>
);

export default SearchForm;

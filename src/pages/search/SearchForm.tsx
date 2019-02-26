import * as React from 'react';
import { Form, Input } from 'reactstrap';

import GoogleMapsWithMarkers from 'shared/GoogleMapsWithMarkers';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';

import SearchForm from './SearchForm';

const SearchForm = () => {
  return (
    <Form>
      <Input type='text' />
    </Form>
  );
};

export default SearchForm;

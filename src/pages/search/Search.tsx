import * as React from 'react';
import { Fade } from 'reactstrap';
import { Query } from 'react-apollo';

import { SEARCH_LISTINGS } from 'networking/listings';

import Footer from 'components/work/Footer';
import Loading from 'shared/loading/Loading';

import { LISTING_CARD_IMAGE_DIMENSIONS } from 'utils/imageDimensions';
import { parseQueryString } from 'utils/queryParams';

import SearchPage from './SearchPage';

const SEARCH_PARAMS = [
  'bounds',
  'coordinates',
  'locationQuery',
  'checkInDate',
  'checkOutDate',
  'numberOfGuests'
];

const Search = () => {
  const queryParams: any = parseQueryString(location.search);
  const input: any = SEARCH_PARAMS.reduce(
    (obj, param) => queryParams[param] ? { ...obj, [param]: queryParams[param] } : obj,
    {}
  );
  return (<Fade>
    <Query query={SEARCH_LISTINGS} variables={{ input, ...LISTING_CARD_IMAGE_DIMENSIONS }}>
      {({ loading, error, data }) =>
        loading ? <Loading /> :
        error ? <h2>Error: {error.message}</h2> :
        <SearchPage listings={data.searchListings} />
      }
    </Query>
    <Footer />
  </Fade>);
};

export default Search;

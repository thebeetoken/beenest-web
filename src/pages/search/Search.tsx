import * as React from 'react';
import { Col, Container, Fade, Row } from 'reactstrap';
import { Query } from 'react-apollo';
import { ApolloError } from 'apollo-client';

import { SEARCH_LISTINGS } from 'networking/listings';

import LoadingTakeover from 'legacy/shared/loading/LoadingTakeover';
import SearchBar from 'legacy/work/SearchBar';

import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';

import { LISTING_CARD_IMAGE_DIMENSIONS } from 'utils/imageDimensions';
import { getFriendlyErrorMessage } from 'utils/validators';

import { SearchFilterCriteria, toListingSearchInput, queryToCriteria } from './SearchCriteria';
import SearchPage from './SearchPage';

const Search = () => {
  const [filter, setFilter] = React.useState<SearchFilterCriteria>(queryToCriteria(location.search));
  const input = toListingSearchInput(filter);
  return (<Fade>
    <Query query={SEARCH_LISTINGS} variables={{ input, ...LISTING_CARD_IMAGE_DIMENSIONS }}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingTakeover />;

        if (error) {
          return isBadUserInputError(error) ? <SearchErrorPage /> : <ErrorPage error={error} />;
        }
        
        if (data.searchListings.length < 1) {
          return <EmptySearchPage />;
        }

        return <SearchPage
          listings={data.searchListings}
          filter={filter}
          onFilterChange={setFilter}
        />;
      }}
    </Query>
  </Fade>);
};

const SearchErrorPage = () => (
  <Container tag={Fade} className="d-flex flex-column align-items-center justify-content-center bee-without-header-height-container p-0" fluid>
    <div
      className="bg-img-hero d-flex flex-column align-items-center justify-content-center gradient-overlay-half-primary-v1 bee-without-header-height-container w-100"
      style={{ backgroundImage: `url('https://static.beenest.com/images/app/misc/painted-ladies2.jpg')` }}>
      <Row className="px-4 mb-4" noGutters>
        <h5 className="font-size-md-down-5text-center text-white">Please enter in a city or region to see results.</h5>
      </Row>
      <Row className="d-flex justify-content-center px-0 mx-0 bg-white bee-top">
        <Col tag={Fade} className="w-100 p-5">
          <SearchBar />
        </Col>
      </Row>
    </div>
  </Container>
);

interface ErrorPageProps {
  error: ApolloError
}

const ErrorPage = (props: ErrorPageProps) => (
  <Container tag={Fade} className={`${VIEWPORT_CENTER_LAYOUT} flex-column bee-without-header-height-container`}>
    <h2 className="font-size-md-down-5 text-center">{getFriendlyErrorMessage(props.error)}</h2>
    <h5 className="text-center">Please contact{' '}
      <a className="text-primary" href="https://support.beenest.com/" target="_blank">support</a>{' '}
      if this continues.
    </h5>
  </Container>
);

const EmptySearchPage = () => (
  <Container tag={Fade} className="d-flex flex-column align-items-center justify-content-center bee-without-header-height-container p-0" fluid>
    <div
      className="bg-img-hero d-flex flex-column align-items-center justify-content-center gradient-overlay-half-primary-v1 bee-without-header-height-container w-100"
      style={{ backgroundImage: `url('https://static.beenest.com/images/app/misc/painted-ladies2.jpg')` }}>
      <Row className="px-4 mb-4" noGutters>
        <h5 className="text-center text-white font-weight-normal">No listings in this area, please try a different city or region.</h5>
      </Row>
      <Row className="d-flex justify-content-center px-0 mx-0 bg-white bee-top">
        <Col tag={Fade} className="w-100 p-5">
          <SearchBar />
        </Col>
      </Row>
    </div>
  </Container>
);

const isBadUserInputError = (error: ApolloError) =>
  error &&
  error.graphQLErrors &&
  error.graphQLErrors[0] &&
  error.graphQLErrors[0].extensions &&
  error.graphQLErrors[0].extensions.code === 'BAD_USER_INPUT';

export default Search;

import * as React from 'react';
import { Col, Container, Fade, Row } from 'reactstrap';
import { Query } from 'react-apollo';

import { SEARCH_LISTINGS } from 'networking/listings';
import Footer from 'components/work/Footer';
import Loading from 'shared/loading/Loading';
import { getFriendlyErrorMessage } from 'utils/validators';

import SearchBar from 'components/work/SearchBar';
import { LISTING_CARD_IMAGE_DIMENSIONS } from 'utils/imageDimensions';
import { parseQueryString } from 'utils/queryParams';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';

import SearchPage from './SearchPage';
import { ApolloError } from 'apollo-client';

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
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <Container tag={Fade} className={VIEWPORT_CENTER_LAYOUT}>
              <Loading height="8rem" width="8rem" />
            </Container>
          );
        }

        if (error) {
          return isBadUserInputError(error) ? <SearchErrorPage /> : <ErrorPage error={error} />;
        }
        
        if (data.searchListings.length < 1) {
          return <EmptySearchPage />;
        }

        return <SearchPage listings={data.searchListings} />;
      }}
    </Query>
    <Footer />
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

const isBadUserInputError = (error: ApolloError) => error && error.graphQLErrors[0].extensions && error.graphQLErrors[0].extensions.code === 'BAD_USER_INPUT';

export default Search;

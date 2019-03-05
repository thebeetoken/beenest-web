import * as React from 'react';
import { Col, Container, Fade, Row } from 'reactstrap';
import { Query } from 'react-apollo';

import { SEARCH_LISTINGS } from 'networking/listings';
import Footer from 'components/work/Footer';
import Loading from 'shared/loading/Loading';

import SearchBar from 'components/work/SearchBar';
import { LISTING_CARD_IMAGE_DIMENSIONS } from 'utils/imageDimensions';
import { parseQueryString } from 'utils/queryParams';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';

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
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <Container tag={Fade} className={VIEWPORT_CENTER_LAYOUT}>
              <Loading height="8rem" width="8rem" />
            </Container>
          );
        }
        if (error && error.message.includes('400') && Object.keys(queryParams).length === 0) {
          return (
            <Container tag={Fade} className="d-flex flex-column align-items-center justify-content-center bee-without-header-height-container">
              <Row className="d-flex justify-content-center px-0 mx-0 bg-white bee-top">
                <Col className="w-100 p-5">
                  <SearchBar />
                </Col>
              </Row>
              <Row className="px-4" noGutters>
                <h5 className="text-center">Please enter in a city or region to see results.</h5>
              </Row>
            </Container>
          );
        } else if (error) {
          return (
            <Container tag={Fade} className={`${VIEWPORT_CENTER_LAYOUT} flex-column bee-without-header-height-container`}>
              <h2 className="font-size-md-down-5 text-center">Error: {error.message}</h2>
              <h5 className="text-center">Please contact support if this continues.</h5>
            </Container>
          );
        }
        
        return <SearchPage listings={data.searchListings} />;
      }}
    </Query>
    <Footer />
  </Fade>);
};

export default Search;

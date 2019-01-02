import * as React from 'react';
import { Query } from 'react-apollo';
import isValid from 'date-fns/is_valid';

import ListingsResultContainer from './ListingsResult.container';
import ListingsResultMap from './ListingsResultMap';

import AudioLoading from 'shared/loading/AudioLoading';
import { SEARCH_LISTINGS } from 'networking/listings';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import ListingCards from 'shared/ListingCards';
import { parseQueryString } from 'utils/queryParams';
import SearchBar from 'shared/SearchBar';
import { ToggleProvider, ToggleProviderRef } from 'shared/ToggleProvider';
import { LISTING_CARD_IMAGE_DIMENSIONS } from 'utils/imageDimensions';

const ListingsResult = () => (
  <ListingsResultContainer>
    <div className="listing-results-header-container">
      <SearchBar />
    </div>
    <div className="listing-results-wrapper">
      <ListingQuery />
    </div>
  </ListingsResultContainer>
);

interface QueryParams {
  checkInDate?: string;
  checkOutDate?: string;
  coordinates?: {
    lat: string;
    lng: string;
  };
  numberOfGuests?: string;
  locationQuery?: string;
}

const ListingQuery = () => {
  const queryParams: QueryParams = parseQueryString(location.search);
  const { checkInDate, checkOutDate, coordinates, numberOfGuests, locationQuery } = queryParams;
  const areCoordinatesValid = coordinates && coordinates.lat && coordinates.lng;
  const input = {
    checkInDate: checkInDate && isValid(new Date(checkInDate)) ? checkInDate : '',
    checkOutDate: checkOutDate && isValid(new Date(checkOutDate)) ? checkOutDate : '',
    numberOfGuests: numberOfGuests ? parseInt(numberOfGuests) : 1,
    locationQuery: locationQuery || '',
    ...(areCoordinatesValid && {
      coordinates: {
        lat: coordinates && coordinates.lat ? parseFloat(coordinates.lat) : 0,
        lng: coordinates && coordinates.lng ? parseFloat(coordinates.lng) : 0,
      },
    }),
  };
  return (
    <Query query={SEARCH_LISTINGS} variables={{ input, ...LISTING_CARD_IMAGE_DIMENSIONS }}>
      {({ loading, error, data }): JSX.Element => {
        if (loading) {
          return <AudioLoading height={48} width={96} />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const { searchListings } = data;
        if (!searchListings.length) {
          return (
            <div className="listing-query-body--no-results">
              <h3>No listings found.</h3>
              <p>You're in luck! Be the first to list your property in {locationQuery} and get $200 in BEE as a signing bonus!</p>
              <BeeLink to="/hosts/signup?utm_source=search_host_signup_button"><Button>Add your listing now</Button></BeeLink>
            </div>
          );
        }
        return (
          <ToggleProvider showing>
            {({ show, toggle }: ToggleProviderRef ) => (
              <div className={`listing-query-body${show ? ' listing-query-body--map-showing' : ''}`}>
                <aside className="listing-query-body--map">
                  <ListingsResultMap listings={data.searchListings}
                    toggle={toggle}
                    show={show} />
                </aside>
                <div className="listing-query-body--cards">
                  <ListingCards listings={data.searchListings} />
                </div>
              </div>
            )}
          </ToggleProvider>
        );
      }}
    </Query>
  );
};

export default ListingsResult;

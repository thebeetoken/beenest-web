import * as React from 'react';
import { Query } from 'react-apollo';
import isValid from 'date-fns/is_valid';

import ListingsResultContainer from './ListingsResult.container';
import ListingsResultMap from './ListingsResultMap';

import AudioLoading from 'legacy/shared/loading/AudioLoading';
import { SEARCH_LISTINGS } from 'networking/listings';
import BeeLink from 'legacy/shared/BeeLink';
import Button from 'legacy/shared/Button';
import ListingCards from 'legacy/shared/ListingCards';
import { parseQueryString } from 'utils/queryParams';
import SearchBar from 'legacy/shared/SearchBar';
import { ToggleProvider, ToggleProviderRef } from 'legacy/shared/ToggleProvider';
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

interface BoundsQueryParams {
  east: string;
  north: string;
  south: string;
  west: string;
}

interface QueryParams {
  bounds?: BoundsQueryParams;
  checkInDate?: string;
  checkOutDate?: string;
  coordinates?: {
    lat: string;
    lng: string;
  };
  numberOfGuests?: string;
  locationQuery?: string;
}

const boundsToSearchParams = (bounds: BoundsQueryParams) => {
  // Add some padding to search bounds, e.g. to get Monterey Park from Los Angeles
  const east = parseFloat(bounds.east);
  const west = parseFloat(bounds.west);
  const south = parseFloat(bounds.south);
  const north = parseFloat(bounds.north);
  const latPad = (east - west) / 8;
  const lngPad = (north - south) / 8;
  return {
    east: east + latPad,
    west: west - latPad,
    north: north + lngPad,
    south: south - lngPad
  };
};

const ListingQuery = () => {
  const queryParams: QueryParams = parseQueryString(location.search);
  const { bounds, checkInDate, checkOutDate, coordinates, numberOfGuests, locationQuery } = queryParams;
  const areBoundsValid = bounds && bounds.east && bounds.north && bounds.south && bounds.west;
  const areCoordinatesValid = coordinates && coordinates.lat && coordinates.lng;
  const parsedBounds = areBoundsValid && !!bounds ? boundsToSearchParams(bounds) : undefined;
  const input = {
    checkInDate: checkInDate && isValid(new Date(checkInDate)) ? checkInDate : '',
    checkOutDate: checkOutDate && isValid(new Date(checkOutDate)) ? checkOutDate : '',
    numberOfGuests: numberOfGuests ? parseInt(numberOfGuests) : 1,
    locationQuery: locationQuery || '',
    ...(areBoundsValid && { bounds: parsedBounds }),
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
              <p>You're in luck! Be the first to list your property in {locationQuery}!</p>
              <BeeLink to="/legacy/hosts/signup?utm_source=search_host_signup_button"><Button>Add your listing now</Button></BeeLink>
            </div>
          );
        }
        return (
          <ToggleProvider showing>
            {({ show, toggle }: ToggleProviderRef ) => (
              <div className={`listing-query-body${show ? ' listing-query-body--map-showing' : ''}`}>
                <aside className="listing-query-body--map">
                  <ListingsResultMap
                    bounds={parsedBounds}
                    listings={data.searchListings}
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

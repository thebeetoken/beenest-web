import { LatLng, LatLngBounds, ListingSearchInput } from 'networking/listings';
import { parseQueryString } from 'utils/queryParams';

const SEARCH_PARAMS = [
  'bounds',
  'coordinates',
  'locationQuery',
  'checkInDate',
  'checkOutDate',
  'near',
  'numberOfGuests',
  'travelMode'
];

export interface SearchFilterCriteria {
  bounds?: LatLngBounds;
  checkInDate?: string;
  checkOutDate?: string;
  coordinates?: LatLng;
  homeType?: string;
  locationQuery?: string;
  numberOfGuests?: number;
  travelMode?: google.maps.TravelMode;
  near?: google.maps.places.PlaceResult;
}

export function queryToCriteria(queryString: string): SearchFilterCriteria {
  const queryParams: any = parseQueryString(queryString);
  return {
    bounds: queryParams.bounds && {
      east: parseFloat(queryParams.bounds.east),
      west: parseFloat(queryParams.bounds.west),
      north: parseFloat(queryParams.bounds.north),
      south: parseFloat(queryParams.bounds.south)
    },
    coordinates: queryParams.coordinates && {
      lat: parseFloat(queryParams.bounds.lat),
      lng: parseFloat(queryParams.bounds.lng)
    },
    homeType: queryParams.homeType,
    numberOfGuests: queryParams.numberOfGuests && parseInt(queryParams.numberOfGuests),
    travelMode: queryParams.travelMode,
    near: queryParams.near
  };
}

export function toListingSearchInput({ near, homeType }: SearchFilterCriteria): ListingSearchInput {
  return {
    near: near && {
      lat: near.geometry.location.lat(),
      lng: near.geometry.location.lng()
    },
    homeType
  };
}

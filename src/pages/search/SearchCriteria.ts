import { LatLng, LatLngBounds, ListingSearchInput } from 'networking/listings';
import { parseQueryString } from 'utils/queryParams';

interface NamedLatLng extends LatLng {
  name: string;
}

// Redundant to google.maps.TravelMode, but that may be unavailable at
// initialization-time; it loads asynchronously.
enum TravelMode {
  DRIVING,
  WALKING,
  TRANSIT,
  BICYCLING
}

export interface SearchFilterCriteria {
  bounds?: LatLngBounds;
  checkInDate?: string;
  checkOutDate?: string;
  coordinates?: LatLng;
  homeType?: string;
  locationQuery?: string;
  numberOfGuests?: number;
  travelMode?: TravelMode;
  near?: NamedLatLng;
}

export function toGoogleTravelMode(travelMode: TravelMode) {
  if (typeof google === 'undefined') {
    return undefined;
  }
  switch (travelMode) {
  case TravelMode.DRIVING: return google.maps.TravelMode.DRIVING;
  case TravelMode.WALKING: return google.maps.TravelMode.WALKING;
  case TravelMode.TRANSIT: return google.maps.TravelMode.TRANSIT;
  case TravelMode.BICYCLING: return google.maps.TravelMode.BICYCLING;
  }
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

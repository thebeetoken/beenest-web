import { LatLng, LatLngBounds, ListingSearchInput } from 'networking/listings';
import { parseQueryString, stringifyQueryString } from 'utils/queryParams';

export interface NamedLatLng extends LatLng {
  name: string;
}

// Redundant to google.maps.TravelMode, but that may be unavailable at
// initialization-time; it loads asynchronously.
export enum TravelMode {
  DRIVING = "DRIVING",
  WALKING = "WALKING",
  TRANSIT = "TRANSIT",
  BICYCLING = "CYCLING"
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

export function toGoogleTravelMode(travelMode?: TravelMode): google.maps.TravelMode | undefined {
  if (typeof google === 'undefined') {
    return undefined;
  }
  switch (travelMode) {
  case TravelMode.DRIVING: return google.maps.TravelMode.DRIVING;
  case TravelMode.WALKING: return google.maps.TravelMode.WALKING;
  case TravelMode.TRANSIT: return google.maps.TravelMode.TRANSIT;
  case TravelMode.BICYCLING: return google.maps.TravelMode.BICYCLING;
  }
  return undefined;
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
      lat: parseFloat(queryParams.coordinates.lat),
      lng: parseFloat(queryParams.coordinates.lng)
    },
    homeType: queryParams.homeType,
    numberOfGuests: queryParams.numberOfGuests && parseInt(queryParams.numberOfGuests),
    travelMode: queryParams.travelMode,
    near: queryParams.near
  };
}

export function criteriaToQuery(criteria: SearchFilterCriteria): string {
  return stringifyQueryString({ ...criteria, utm_term: criteria.locationQuery });
}

export function toListingSearchInput({
  bounds,
  checkInDate,
  checkOutDate,
  coordinates,
  homeType,
  locationQuery,
  numberOfGuests,
  near
}: SearchFilterCriteria): ListingSearchInput {
  return {
    bounds,
    checkInDate,
    checkOutDate,
    coordinates,
    homeType,
    locationQuery,
    numberOfGuests,
    near: near && {
      lat: near.lat,
      lng: near.lng
    }
  };
}

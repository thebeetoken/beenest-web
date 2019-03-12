import { ListingSearchInput } from 'networking/listings';

export interface SearchFilterCriteria {
  travelMode?: google.maps.TravelMode;
  near?: google.maps.places.PlaceResult;
}

export function toListingSearchInput(filter : SearchFilterCriteria): ListingSearchInput {
  return filter.near ? { near: {
    lat: filter.near.geometry.location.lat(),
    lng: filter.near.geometry.location.lng() }
  } : {};
}

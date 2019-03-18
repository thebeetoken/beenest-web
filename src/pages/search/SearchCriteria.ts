import { ListingSearchInput } from 'networking/listings';

export interface SearchFilterCriteria {
  homeType?: string;
  travelMode?: google.maps.TravelMode;
  near?: google.maps.places.PlaceResult;
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

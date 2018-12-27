/**
 * Function that returns a
 * pleasing-to-read listing
 * status
 *
 * @author kevin
 **/

enum ListingStatus {
  ACTIVE = 'Live',
  INACTIVE = 'Inactive',
  ERROR = 'Error'
}

export function getListingStatus(status: boolean): ListingStatus {
  switch(status) {
    case false:
      return ListingStatus.ACTIVE;
    case true:
      return ListingStatus.INACTIVE;
    default:
      return ListingStatus.ERROR;
  }
};

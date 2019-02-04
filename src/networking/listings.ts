import gql from 'graphql-tag';
import { Currency } from 'networking/bookings';

export interface CheckInTime {
  from: string;
  to: string;
}

export interface Listing {
  addressLine1: string;
  addressLine2?: string;
  airbnbLink?: string;
  amenities: string[];
  autoApprove: boolean;
  checkInDate: Date;
  checkInTime: CheckInTime;
  checkOutDate: Date;
  checkOutTime: string;
  city: string;
  country: string;
  createdAt: string;
  currency: string;
  description: string;
  homeType: string;
  hostNameSlug: string;
  hostId: string;
  houseRules: string;
  id: string;
  idSlug: string;
  isActive: boolean;
  lat: number;
  lng: number;
  maxGuests: number;
  minimumNights: number;
  numberOfBathrooms: number;
  numberOfBedrooms: number;
  icalUrls: string[];
  listingPicUrl: string;
  photos: string[];
  postalCode: string;
  pricePerNightUsd: number;
  prices: Price[];
  reservations: Reservation[];
  securityDepositUsd: number;
  sharedBathroom: string;
  sleepingArrangement: string;
  state: string;
  title: string;
  totalQuantity: number;
  updatedAt: string;
  host: Host | null;
}

export interface ListingShort {
  city: string;
  country: string;
  id: string;
  idSlug: string;
  homeType: string;
  lat: number;
  lng: number;
  listingPicUrl: string;
  pricePerNightUsd: number;
  prices: Price[];
  sleepingArrangement: string;
  state: string;
  title: string;
}

export interface HostListingShort {
  canPublish: boolean;
  city: string;
  country: string;
  id: string;
  idSlug: string;
  isActive: boolean;
  listingPicUrl: string;
  state: string;
  title: string;
  updatedAt: string;
}

export interface ListingInput {
  addressLine1?: string;
  addressLine2?: string;
  airbnbLink?: string;
  amenities?: string[];
  city?: string;
  country?: string;
  description?: string;
  homeType?: string;
  houseRules?: string;
  icalUrls?: string[];
  isActive?: boolean;
  lat?: number | undefined;
  listingPicUrl?: string;
  lng?: number | undefined;
  maxGuests?: number | string;
  minimumNights?: number | string;
  numberOfBathrooms?: number | string;
  numberOfBedrooms?: number | string;
  photos?: string[];
  postalCode?: string;
  pricePerNightUsd?: number | string;
  securityDepositUsd?: number | string;
  sharedBathroom?: string;
  sleepingArrangement?: string;
  state?: string;
  title?: string;
  [field: string]: any;
}

export interface HostListingReservations {
  city: string;
  country: string;
  icalUrls: string[];
  id: string;
  reservations: Reservation[];
  state: string;
  title: string;
}

export interface LatLngBounds {
  east: number;
  north: number;
  south: number;
  west: number;
}

export interface Price {
  currency: Currency;
  pricePerNight: number;
  securityDeposit: number;
}

export interface Reservation {
  startDate: Date;
  endDate: Date;
}

export interface Host {
  createdAt: Date;
  about: string;
  displayName: string;
  email: string;
  fullName?: string;
  id: string;
  profilePicUrl: string;
}

const LISTING_CARD_FRAGMENT = gql`
  fragment ListingCard on Listing {
    city
    country
    id
    idSlug
    pricePerNightUsd
    prices {
      currency
      pricePerNight
      securityDeposit
    }
    state
    title
  }
`;

const LISTING_DETAILS_FRAGMENT = gql`
  ${LISTING_CARD_FRAGMENT}
  fragment ListingDetails on Listing {
    amenities
    autoApprove
    checkInDate
    checkInTime {
      from
      to
    }
    checkOutDate
    checkOutTime
    description
    homeType
    houseRules
    lat
    lng
    maxGuests
    minimumNights
    numberOfBathrooms
    numberOfBedrooms
    listingPicUrl
    photos
    reservations {
      startDate
      endDate
    }
    securityDepositUsd
    sharedBathroom
    sleepingArrangement
    totalQuantity
    ...ListingCard
  }
`;

export const GET_LISTING = gql`
  ${LISTING_DETAILS_FRAGMENT}
  query getListing($id: ID!) {
    listing(id: $id) {
      addressLine1
      addressLine2
      createdAt
      currency
      hostNameSlug
      hostId
      icalUrls
      isActive
      postalCode
      totalQuantity
      updatedAt
      host {
        createdAt
        about
        id
        displayName
        email
        profilePicUrl
      }
      ...ListingDetails
    }
  }
`;

export const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
      hostId
    }
  }
`;

export const DUPLICATE_LISTING = gql`
  mutation DuplicateListing($id: ID!) {
    duplicateListing(id: $id) {
      id
    }
  }
`;

export const GET_HOST_LISTINGS = gql`
  query GetHostListings {
    hostListings {
      canPublish
      city
      country
      id
      idSlug
      isActive
      listingPicUrl
      state
      title
      updatedAt
    }
  }
`;

export const GET_LISTING_CALENDAR = gql`
  query getListing($id: ID!) {
    listing(id: $id) {
      city
      country
      icalUrls
      reservations {
        startDate
        endDate
      }
      state
      title
    }
  }
`;

export const GET_LISTING_FORM = gql`
  ${LISTING_DETAILS_FRAGMENT}
  query getListing($id: ID!) {
    listing(id: $id) {
      addressLine1
      addressLine2
      airbnbLink
      autoApprove
      checkInDate
      checkOutDate
      city
      country
      description
      homeType
      houseRules
      icalUrls
      id
      isActive
      maxGuests
      minimumNights
      numberOfBathrooms
      numberOfBedrooms
      lat
      listingPicUrl
      lng
      photos
      postalCode
      pricePerNightUsd
      securityDepositUsd
      sharedBathroom
      sleepingArrangement
      state
      title
      totalQuantity
      host {
        id
        email
      }
      ...ListingDetails
    }
  }
`;

export const GET_PUBLIC_LISTING = gql`
  ${LISTING_DETAILS_FRAGMENT}
  query PublicListing($id: ID!, $width: Int, $height: Int) {
    listing(id: $id) {
      host {
        id
        createdAt
        about
        displayName
        profilePicUrl(width: $width, height: $height)
      }
      ...ListingDetails
    }
  }
`;

export const GET_FEATURED_LISTINGS = gql`
  ${LISTING_CARD_FRAGMENT}
  query featuredListings($width: Int, $height: Int) {
    featuredListings {
      listingPicUrl(width: $width, height: $height)
      ...ListingCard
    }
  }
`;

export const SEARCH_LISTINGS = gql`
  ${LISTING_CARD_FRAGMENT}
  query searchListings($input: SearchListingsInput!, $width: Int, $height: Int) {
    searchListings(input: $input) {
      lat
      lng
      listingPicUrl(width: $width, height: $height)
      ...ListingCard
    }
  }
`;

export const GET_ALL_LISTINGS = gql`
  query allListings($input: AllListingsInput) {
    allListings(input: $input) {
      city
      country
      createdAt
      currency
      hostNameSlug
      hostId
      id
      isActive
      lat
      lng
      maxGuests
      minimumNights
      listingPicUrl
      prices {
        currency
        pricePerNight
        securityDeposit
      }
      pricePerNightUsd
      securityDepositUsd
      state
      title
      host {
        email
        displayName
        fullName
        id
      }
      updatedAt
    }
  }
`;

export const CREATE_LISTING = gql`
  ${LISTING_DETAILS_FRAGMENT}
  mutation CreateListing($input: ListingInput) {
    createListing(input: $input) {
      addressLine1
      addressLine2
      airbnbLink
      createdAt
      currency
      host {
        createdAt
        displayName
        email
        id
      }
      hostNameSlug
      hostId
      icalUrls
      isActive
      postalCode
      updatedAt
      ...ListingDetails
    }
  }
`;

export const UPDATE_LISTING = gql`
  ${LISTING_DETAILS_FRAGMENT}
  mutation updateListing($id: ID!, $input: ListingInput) {
    updateListing(id: $id, input: $input) {
      addressLine1
      addressLine2
      airbnbLink
      host {
        createdAt
        id
        displayName
        email
      }
      hostNameSlug
      houseRules
      icalUrls
      idSlug
      listingPicUrl
      postalCode
      updatedAt
      ...ListingDetails
    }
  }
`;

export const ACTIVATE_LISTING = gql`
  mutation ActivateListing($id: ID!) {
    activateListing(id: $id) {
      isActive
    }
  }
`;

export const DEACTIVATE_LISTING = gql`
  mutation ActivateListing($id: ID!) {
    deactivateListing(id: $id) {
      isActive
    }
  }
`;

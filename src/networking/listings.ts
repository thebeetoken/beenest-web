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
  isInactive: boolean;
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
  pricePerNight: number;
  pricePerNightUsd: number;
  pricePerNightEth: number;
  reservations: Reservation[];
  securityDeposit: number;
  securityDepositEth: number;
  securityDepositUsd: number;
  sharedBathroom: string;
  sleepingArrangement: string;
  state: string;
  title: string;
  totalQuantity: number;
  updatedAt: string;
  host: User | null;
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
  pricePerNight: number;
  pricePerNightUsd: number;
  pricePerNightEth: number;
  sleepingArrangement: string;
  state: string;
  title: string;
}

export interface HostListingShort {
  city: string;
  country: string;
  id: string;
  idSlug: string;
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
  isInactive?: boolean;
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

export interface Reservation {
  startDate: Date;
  endDate: Date;
}

export interface User {
  createdAt: Date;
  about: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  profilePicUrl: string;
  supportEmail: string;
}

interface Price {
  amount: number;
  currency: Currency;
}

export interface PaymentInfo {
  hostWalletAddress: string;
  listing: Listing;
  prices: Price[];
}

const LISTING_CARD_FRAGMENT = gql`
  fragment ListingCard on Listing {
    city
    country
    id
    idSlug
    pricePerNight
    pricePerNightUsd
    pricePerNightEth
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
    securityDeposit
    securityDepositEth
    securityDepositUsd
    sharedBathroom
    sleepingArrangement
    totalQuantity
    ...ListingCard
  }
`;

export const GET_PAYMENT_INFO = gql`
  query GetPaymentInfo($id: ID!) {
    paymentInfo(id: $id) {
      hostWalletAddress
      listing {
        id
        description
        title
      }
      prices {
        amount
        currency
      }
    }
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
      isInactive
      postalCode
      totalQuantity
      updatedAt
      host {
        createdAt
        about
        id
        email
        firstName
        profilePicUrl
        supportEmail
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

export const GET_HOST_LISTINGS = gql`
  query GetHostListings {
    hostListings {
      city
      country
      id
      idSlug
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
      isInactive
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
  query PublicListing($id: ID!) {
    listing(id: $id) {
      host {
        createdAt
        about
        firstName
        profilePicUrl
        supportEmail
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
      isInactive
      lat
      lng
      maxGuests
      minimumNights
      listingPicUrl
      pricePerNight
      pricePerNightUsd
      pricePerNightEth
      securityDeposit
      securityDepositEth
      securityDepositUsd
      state
      title
      host {
        email
        firstName
        id
        lastName
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
        email
        firstName
        id
        lastName
      }
      hostNameSlug
      hostId
      icalUrls
      isInactive
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
        email
        firstName
        lastName
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

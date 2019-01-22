import gql from 'graphql-tag';

import { Listing } from 'networking/listings';
import { User } from 'networking/users';

export interface Booking {
  approvedBy: string | null;
  cancelledBy: string | null;
  checkInDate: string;
  checkOutDate: string;
  createdAt: string;
  currency: Currency | null;
  guest: User;
  guestDepositAmount: number;
  guestTotalAmount: number;
  guestTxHash: string | null;
  guestWalletAddress: string | null;
  host: User;
  hostWalletAddress: string | null;
  id: string;
  listing: Listing;
  listingId: string;
  numberOfGuests: number;
  paymentSourceId: string | null;
  pricePerNight: number;
  priceQuotes: PriceQuote[];
  rejectedBy: string | null;
  status: string;
}

export enum BookingStatus {
  GUEST_CONFIRMED,
  HOST_APPROVED,
  GUEST_PAID,
  PAYMENT_FAILED,
  GUEST_REJECTED,
  HOST_REJECTED,
  GUEST_CANCEL_INITIATED,
  GUEST_CANCELLED,
  REFUND_INITIATED,
  REFUNDED,
  HOST_CANCELLED,
  HOST_PAID,
  COMPLETED,
  ERROR,
}

export enum Currency {
  BEE = 'BEE',
  DAI = 'DAI',
  ETH = 'ETH',
  USD = 'USD',
}

export interface PriceQuote {
  creditAmountApplied: number;
  currency: Currency;
  guestTotalAmount: number;
  guestTotalAmountUsd: number;
  pricePerNight: number;
  priceTotalNights: number;
  securityDeposit: number;
  transactionFee: number;
}

export interface CryptoPayment {
  guestWalletAddress: string;
  hostWalletAddress: string;
  transactionHash: string;
}

export interface CryptoParams {
  guestWalletAddress: string;
  paymentProtocolAddress: string;
  tokenContractAddress?: string;
  transactionHash: string;
}

export interface BuyNowInput {
  listingId: string;
  currency: string;
  amount: number;
  paymentSourceId?: string;
  cryptoPayment?: CryptoPayment;
}

export const GET_ALL_BOOKINGS = gql`
  query allBookings {
    allBookings {
      approvedBy
      cancelledBy
      checkInDate
      checkOutDate
      currency
      guestDepositAmount
      guestTotalAmount
      guestWalletAddress
      hostWalletAddress
      id
      listing {
        id
        idSlug
      }
      rejectedBy
      status
      guest {
        id
        firstName
        lastName
      }
      host {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_HOST_BOOKINGS = gql`
  query HostBookings {
  hostBookings {
      checkInDate
      checkOutDate
      currency
      guestDepositAmount
      guestTotalAmount
      guestWalletAddress
      hostWalletAddress
      id
      listing {
        title
      }
      status
      guest {
        email
        firstName
        lastName
        phoneNumber
      }
      numberOfGuests
    }
  }
`;

export const GET_ADMIN_BOOKING = gql`
  query booking($id: ID!) {
    booking(id: $id) {
      checkInDate
      checkOutDate
      currency
      numberOfGuests
      id
      listing {
        id
        idSlug
      }
      host {
        id
        firstName
      }
      guest {
        id
        firstName
      }
      status
    }
  }
`;

export const GET_BOOKING = gql`
  query booking($id: ID!) {
    booking(id: $id) {
      checkInDate
      checkOutDate
      currency
      guestTotalAmount
      host {
        id
        firstName
        walletAddress
      }
      id
      listingId
      listing {
        id
        houseRules
      }
      numberOfGuests
      priceQuotes {
        creditAmountApplied
        currency
        guestTotalAmount
        guestTotalAmountUsd
        pricePerNight
        priceTotalNights
        securityDeposit
        transactionFee
      }
      status
    }
  }
`;

export const GET_BOOKING_TRIPS_RECEIPT = gql`
  query booking($id: ID!) {
    booking(id: $id) {
      checkInDate
      checkOutDate
      currency
      guestTotalAmount
      guestTxHash
      host {
        createdAt
        firstName
        profilePicUrl
      }
      id
      listingId
      listing {
        addressLine1
        addressLine2
        city
        country
        houseRules
        id
        lat
        lng
        postalCode
        state
        title
      }
      numberOfGuests
      priceQuotes {
        creditAmountApplied
        currency
        guestTotalAmount
        guestTotalAmountUsd
        pricePerNight
        priceTotalNights
        securityDeposit
        transactionFee
      }
    }
  }
`;

export const GET_BOOKING_RECEIPT = gql`
  query booking($id: ID!) {
    booking(id: $id) {
      currency
      guestTotalAmount
      guestWalletAddress
      guestTxHash
      id
    }
  }
`;

export const GET_GUEST_BOOKINGS = gql`
  query guestBookings {
    guestBookings {
      approvedBy
      cancelledBy
      checkInDate
      checkOutDate
      createdAt
      currency
      guestDepositAmount
      guestTotalAmount
      id
      listing {
        addressLine1
        addressLine2
        city
        country
        hostId
        id
        idSlug
        listingPicUrl
        state
        title
      }
      listingId
      pricePerNight
      rejectedBy
      status
    }
  }
`;

export const GET_GUEST_SORTED_BOOKINGS = gql`
  fragment baseTripFields on Booking {
    checkInDate
    checkOutDate
    host {
      id
      firstName
    }
    id
    listing {
      city
      country
      id
      idSlug
      listingPicUrl
      state
      title
    }
    status
  }

  query guestBookings {
    upcoming: guestBookings(status: "upcoming") {
      currency
      listing {
        id
        addressLine1
        addressLine2
      }
      ...baseTripFields
    }
    pending: guestBookings(status: "pending") {
      currency
      ...baseTripFields
    }
    past: guestBookings(status: "past") {
      ...baseTripFields
    }
    cancelled: guestBookings(status: "cancelled") {
      cancelledBy
      ...baseTripFields
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation createBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
    }
  }
`;

export const GUEST_CONFIRM_BOOKING = gql`
  mutation guestConfirmBooking($input: GuestConfirmInput!) {
    guestConfirmBooking(input: $input) {
      id
      status
    }
  }
`;

export const GUEST_SELECT_PAYMENT = gql`
  mutation BookingSelectPayment($input: GuestSelectPaymentInput!) {
    guestSelectPayment(input: $input) {
      currency
      guestTotalAmount
      id
      paymentSourceId
    }
  }
`;

// Admin/Host only mutations
export const APPROVE_BOOKING = gql`
  mutation approveBooking($id: ID!) {
    approveBooking(id: $id) {
      id
      status
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation cancelBooking($id: ID!) {
    cancelBooking(id: $id) {
      id
      status
    }
  }
`;

export const GUEST_CANCEL_BOOKING = gql`
  mutation guestCancelBooking($id: ID!) {
    guestCancelBooking(id: $id) {
      id
      status
    }
  }
`;

export const REJECT_BOOKING = gql`
  mutation rejectBooking($id: ID!) {
    rejectBooking(id: $id) {
      id
      status
    }
  }
`;

export const PAYOUT_BOOKING = gql`
  mutation payoutBooking($id: ID!) {
    payoutBooking(id: $id) {
      id
      status
    }
  }
`;
//

export const BUY_NOW = gql`
  mutation BuyNow($input: BuyNowInput!) {
    buyNow(input: $input) {
      id
    }
  }
`;

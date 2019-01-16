import gql from 'graphql-tag';

export interface CreditBalance {
  amountUsd: number | null;
}

export interface User {
  about: string | null;
  beenestLink: string | null;
  citizenship: string | null;
  completedVerification: boolean | null;
  createdAt: Date;
  createTime: Date | null;
  email: string | null;
  facebookLink: string | null;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  profilePicUrl: string | null;
  residence: string | null;
  stripeAccountDashboardLink: string | null;
  supportEmail: string | null;
  btcWalletAddress: string | null;
  walletAddress: string | null;
  listingCount: number | null;
}

export interface CreateUser {
  about?: string | null;
  code?: string | null
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
}

export interface CreateHost extends CreateUser {
  isAlreadyListed: string;
  propertiesManaged: string;
}

export const GET_ACCOUNT_PAGE = gql`
  query GetAccountPage {
    user {
      about
      completedVerification
      email
      firstName
      id
      lastName
      phoneNumber
      profilePicUrl
      stripeAccountDashboardLink
      walletAddress
      listingCount
    }

    creditBalance {
      amountUsd
    }
  }
`;

export const GET_HOST_PAGE = gql`
  query user {
    user {
      about
      completedVerification
      email
      firstName
      id
      lastName
      phoneNumber
      profilePicUrl
      stripeAccountDashboardLink
      btcWalletAddress
      walletAddress
      listingCount
    }
  }
`;

export const GET_USER = gql`
  query user {
    user {
      about
      completedVerification
      email
      firstName
      id
      lastName
      phoneNumber
      profilePicUrl
      stripeAccountDashboardLink
      walletAddress
      listingCount
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      about
      email
      firstName
      id
      lastName
      phoneNumber
      profilePicUrl
      stripeAccountDashboardLink
      walletAddress
      listingCount
    }
  }
`;

export const GET_ALL_USERS = gql`
  query allUsers {
    allUsers {
      completedVerification
      email
      firstName
      id
      lastName
      phoneNumber
      profilePicUrl
      stripeAccountDashboardLink
      walletAddress
      listingCount
    }
  }
`;

export const CREATE_STRIPE_LOGIN_LINK = gql`
  mutation CreateStripeLoginLink {
    createStripeLoginLink {
      url
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      firstName
      id
      lastName
    }
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($input: SearchUsersInput) {
    searchUsers(input: $input) {
      users {
        completedVerification
        email
        firstName
        id
        lastName
        stripeAccountDashboardLink
        walletAddress
        listingCount
      }
      count
    }
  }
`;

export const SEARCH_HOSTS = gql`
  query SearchHosts($input: SearchUsersInput) {
    searchHosts(input: $input) {
      users {
        completedVerification
        email
        firstName
        id
        lastName
        stripeAccountDashboardLink
        walletAddress
        listingCount
      }
      count
    }
  }
`;

export const CREATE_OR_LOGIN_FACEBOOK_USER = gql`
  mutation createOrLoginFacebookUser($id: ID!) {
    createOrLoginFacebookUser(id: $id) {
      firstName
    }
  }
`;

export const ADMIN_CREATE_HOST = gql`
  mutation AdminCreateHost($input: AdminCreateHostInput!) {
    adminCreateHost(input: $input) {
      about
      email
      firstName
      id
      lastName
      password
      phoneNumber
      profilePicUrl
      walletAddress
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      about
      email
      firstName
      lastName
      password
    }
  }
`;

export const CREATE_HOST = gql`
  mutation CreateHost($input: CreateHostInput!) {
    createHost(input: $input) {
      about
      email
      firstName
      lastName
      password
    }
  }
`;

export const REFRESH_VERIFICATION_STATUS = gql`
  mutation refreshVerificationStatus {
    refreshVerificationStatus {
      completedVerification
    }
  }
`;

export const UPDATE_HOST = gql`
  mutation updateHost($input: UpdateHostInput!) {
    updateHost(input: $input) {
      about
      email
      firstName
      id
      lastName
      phoneNumber
      profilePicUrl
      walletAddress
    }
  }
`;

export const UPDATE_WALLET_ADDRESS = gql`
  mutation UpdateWalletAddress($input: UpdateWalletAddressInput!) {
    updateWalletAddress(input: $input) {
      btcWalletAddress
      ethWalletAddress
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      about
      email
      firstName
      lastName
      phoneNumber
      profilePicUrl
    }
  }
`;

import gql from 'graphql-tag';

export interface Conference {
  city: string;
  country: string;
  coverImage: ImageInput;
  createdAt: string;
  description: string;
  endDate: string;
  id: string;
  link: string;
  startDate: string;
  state: string;
  title: string;
  venue: string;
  listingIds: number[];
}

export interface ConferenceInput {
  city: string;
  country: string;
  coverImage: ImageInput;
  description: string;
  endDate: string;
  link: string;
  startDate: string;
  state: string;
  title: string;
  venue: string;
  listingIds: number[];
}

interface ImageInput {
  url: string;
}

export const GET_ALL_CONFERENCES = gql`
  query allConferences {
    allConferences {
      city
      country
      coverImage {
        url
      }
      createdAt
      description
      endDate
      id
      link
      startDate
      state
      title
      venue
    }
  }
`;

export const GET_CONFERENCE_FORM = gql`
  query getConference($id: ID!) {
    conference(id: $id) {
      city
      country
      coverImage {
        url
      }
      createdAt
      description
      endDate
      id
      link
      listingIds
      startDate
      state
      title
      venue
    }
  }
`;

export const GET_CONFERENCE = gql`
  query getConference($id:ID!) {
    conference(id: $id) {
      coverImage {
        url
      }
      createdAt
      description
      endDate
      id
      link
      listings {
        city
        homeType
        id
        idSlug
        isActive
        listingPicUrl
        pricePerNight
        pricePerNightUsd
        pricePerNightEth
        sleepingArrangement
        state
        title
      }
      listingIds
      startDate
      state
      title
      venue
    }
  }
`;

export const GET_FEATURED_CONFERENCE = gql`
  query featuredConferenece {
    featuredConference {
      city
      country
      coverImage {
        url
      }
      id
      state
      title
    }
  }
`;

export const CREATE_CONFERENCE = gql`
  mutation createConference($input: ConferenceInput!) {
  	createConference(input: $input) {
      city
      country
      coverImage {
        url
      }
      createdAt
      description
      endDate
      id
      link
      listingIds
      state
      startDate
      title
      venue
    }
  }
`;

export const UPDATE_CONFERENCE = gql`
  mutation upateConference($id: ID!, $input: ConferenceInput!) {
  	updateConference(id: $id, input: $input) {
      city
      country
      coverImage {
        url
      }
      createdAt
      description
      endDate
      id
      link
      listingIds
      startDate
      state
      title
      venue
    }
  }
`;

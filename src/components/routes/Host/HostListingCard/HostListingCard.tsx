import * as React from 'react';
import format from 'date-fns/format';
import { compose, graphql } from 'react-apollo';
import Switch from 'react-switch';

import HostListingCardContainer from './HostListingCard.container';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import LazyImage from 'shared/LazyImage';
import {
  ACTIVATE_LISTING,
  DEACTIVATE_LISTING,
  DELETE_LISTING,
  DUPLICATE_LISTING,
  GET_HOST_LISTINGS,
  HostListingShort,
  Listing
} from 'networking/listings';
import { formatAddress } from 'utils/formatter';
import { hexColor } from 'styled/utils';

interface Props extends HostListingShort {
  activateListing: (id: string) => Promise<Listing>;
  deactivateListing: (id: string) => Promise<Listing>;
  deleteListing: (id: string) => Promise<any>;
  duplicateListing: (ud: string) => Promise<Listing>;
}

const INCOMPLETE_LISTING = "This listing is incomplete. Click Edit to complete all required fields to publish.";

const HostListingCard = (props: Props): JSX.Element => {
  const {
    activateListing,
    canPublish,
    city,
    country,
    deactivateListing,
    deleteListing,
    duplicateListing,
    id,
    idSlug,
    isActive,
    listingPicUrl,
    state,
    title,
    updatedAt
  } = props;
  const toggleListing = isActive ? deactivateListing : activateListing;
  return (
    <HostListingCardContainer className="host-listing-card">
      <div className="host-listing-meta">
        <h1>{title}</h1>
        <h2>{(city || state || country) ? formatAddress(city, state, country) : ''}</h2>
        <div className="bee-flex-div" />
        <h3>Last edited: {format(updatedAt, 'MM/DD/YY [at] hh:mmA')}</h3>
        <BeeLink to={`/host/listings/${id}/calendar`}>
          <Button clear color="link" suffix="utils/carat-right">
            View Calendar
          </Button>
        </BeeLink>
        <div className="host-listing-meta--button-container">
          <BeeLink to={`/host/listings/${id}/edit`}>
            <Button background="core" color="white" size="small">
              Edit
            </Button>
          </BeeLink>
          <BeeLink target="_blank" to={`/listings/${idSlug}`}>
            <Button background="white" border="core" color="core" size="small">
              Preview
            </Button>
          </BeeLink>
          <Button background="white" border="core" color="core" size="small" onClick={() => duplicateListing(id)}>
            Duplicate
          </Button>
          <Button background="white" border="core" color="core" size="small" onClick={() => deleteListing(id)}>
            Delete
          </Button>
          <div className='host-listing-publish'>
            <label htmlFor={`publish-${id}`} title={canPublish ? '' : INCOMPLETE_LISTING}>
              <span className={canPublish ? '' : 'host-listing-meta--disabled'}>Publish</span>
              <FirebaseConsumer>
                {({ completedVerification }: FirebaseUserProps) => {
                  return (
                    <Switch
                      checked={isActive}
                      disabled={!canPublish || !completedVerification}
                      onColor={hexColor('correct')}
                      onChange={() => toggleListing(id).catch((error) => alert(error))}
                      id={`publish-${id}`} />
                  );
                }}
              </FirebaseConsumer>
            </label>
            {!canPublish && <p className='host-listing-notice'>{INCOMPLETE_LISTING}</p>}
          </div>
        </div>
      </div>
      <div className="host-listing-image">
        <LazyImage src={listingPicUrl} />
      </div>
    </HostListingCardContainer>
  );
}

export default compose(
  graphql(ACTIVATE_LISTING, {
    props: ({ mutate }: any) => ({
      activateListing: (id: string) => {
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_HOST_LISTINGS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
              return;
            }

            const { activateListing } = data;
            const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
            const index = hostListings.findIndex((listing: Listing) => listing.id === id);
            store.writeQuery({
              query: GET_HOST_LISTINGS,
              data: {
                hostListings: [
                  ...hostListings.slice(0, index),
                  {
                    ...hostListings[index],
                    ...activateListing,
                  },
                  ...hostListings.slice(index + 1),
                ],
              },
            });
          },
        });
      },
    }),
  }),
  graphql(DEACTIVATE_LISTING, {
    props: ({ mutate }: any) => ({
      deactivateListing: (id: string) => {
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_HOST_LISTINGS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
              return;
            }

            const { deactivateListing } = data;
            const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
            const index = hostListings.findIndex((listing: Listing) => listing.id === id);
            store.writeQuery({
              query: GET_HOST_LISTINGS,
              data: {
                hostListings: [
                  ...hostListings.slice(0, index),
                  {
                    ...hostListings[index],
                    ...deactivateListing,
                  },
                  ...hostListings.slice(index + 1),
                ],
              },
            });
          },
        });
      },
    }),
  }),
  graphql(DELETE_LISTING, {
    props: ({ mutate }: any) => ({
      deleteListing: (id: string) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) {
          return;
        }
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_HOST_LISTINGS }],
          update: (store: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
              return;
            }

            const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
            store.writeQuery({
              query: GET_HOST_LISTINGS,
              data: {
                hostListings: hostListings.filter((listing: Listing) => listing.id === id)
              },
            });
          },
        });
      },
    }),
  }),
  graphql(DUPLICATE_LISTING, {
    props: ({ mutate }: any) => ({
      duplicateListing: (id: string) => mutate({
        variables: { id },
        refetchQueries: [{ query: GET_HOST_LISTINGS }],
        update: (store: any, { data }: any) => {
          if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
            return;
          }

          const { duplicateListing } = data;
          const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
          store.writeQuery({
            query: GET_HOST_LISTINGS,
            data: { hostListings: [ duplicateListing, ...hostListings ] }
          });
        },
      })
    })
  })
)(HostListingCard);

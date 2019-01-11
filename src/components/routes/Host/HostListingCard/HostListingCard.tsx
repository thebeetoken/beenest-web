import * as React from 'react';
import format from 'date-fns/format';
import { compose, graphql } from 'react-apollo';
import Switch from 'react-switch';

import HostListingCardContainer from './HostListingCard.container';

import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import LazyImage from 'shared/LazyImage';
import { ACTIVATE_LISTING, DEACTIVATE_LISTING, DELETE_LISTING, GET_HOST_LISTINGS, HostListingShort, Listing } from 'networking/listings';
import { formatAddress } from 'utils/formatter';
import { hexColor } from 'styled/utils';

interface Props extends HostListingShort {
  activateListing: (id: string) => Promise<Listing>;
  deactivateListing: (id: string) => Promise<Listing>;
  deleteListing: (id: string) => Promise<any>;
}

const INCOMPLETE_LISTING = "This listing is incomplete. Use the Edit button to complete all required fields to publish this listing.";

const HostListingCard = (props: Props): JSX.Element => {
  const {
    activateListing,
    canPublish,
    city,
    country,
    deactivateListing,
    deleteListing,
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
        {(city || state || country) && <h2>{formatAddress(city, state, country)}</h2>}
        <div className="bee-flex-div" />
        <h3>Last edited: {format(updatedAt, 'MM/DD/YY [at] hh:mmA')}</h3>
        <div className="host-listing-meta--button-container">
          <BeeLink to={`/host/listings/${id}/edit`}>
            <Button background="core" color="white" size="small">
              Edit
            </Button>
          </BeeLink>
          <BeeLink to={`/host/listings/${id}/calendar`}>
            <Button background="core" color="white" size="small">
              Calendar
            </Button>
          </BeeLink>
          <BeeLink target="_blank" to={`/listings/${idSlug}`}>
            <Button background="core" color="white" size="small">
              Preview
            </Button>
          </BeeLink>
          <Button background="core" color="white" size="small" onClick={() => deleteListing(id)}>
            Delete
          </Button>          
          <label htmlFor={`publish-${id}`} title={canPublish ? '' : INCOMPLETE_LISTING}>
            <span className={canPublish ? '' : 'host-listing-meta--disabled'}>Publish</span>
            <Switch checked={isActive} disabled={!canPublish} onColor={hexColor('correct')} onChange={() => toggleListing(id)} id={`publish-${id}`} />
          </label>
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
  })
)(HostListingCard);

import * as React from 'react';
import { Query } from 'react-apollo';

import HostListingCard from '../HostListingCard';
import HostListingsContainer from './HostListings.container';

import { GET_HOST_LISTINGS, HostListingShort } from 'networking/listings';
import Button from 'legacy/shared/Button';
import LoadingTakeover from 'legacy/shared/loading/LoadingTakeover';

interface Props {
  createListing: () => void;
}

const HostListings = ({ createListing }: Props): JSX.Element => (
  <HostListingsContainer>
    <Query query={GET_HOST_LISTINGS}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingTakeover />;
        
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }

        const listings = data.hostListings || [];

        if (listings.length < 1) {
          return (
            <>
              <h1>You have no listings.</h1>
              <br />
              <Button background="secondary" color="white" onClick={createListing}>
                Add a listing to start earning now!
              </Button>
            </>
          );
        }

        const renderedListings = listings.map((listing: HostListingShort) => {
          return <HostListingCard {...listing} key={listing.id} />;
        });

        return renderedListings;
      }}
    </Query>
  </HostListingsContainer>
);

export default HostListings;

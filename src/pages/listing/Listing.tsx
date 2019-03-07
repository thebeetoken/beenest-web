import * as React from 'react';
import { Query } from 'react-apollo';
import { Fade } from 'reactstrap';
import { GET_PUBLIC_LISTING } from 'networking/listings';

import LoadingTakeover from 'shared/loading/LoadingTakeover';

import ListingPage from './ListingPage';

const PROFILE_IMAGE_PARAMETERS = { width: 300, height: 300 };

const Listing = ({ match }: RouterProps) => (
  <Fade className="min-vh-100">
    <Query query={GET_PUBLIC_LISTING} fetchPolicy="cache-and-network" variables={{ id: match.params.id, ...PROFILE_IMAGE_PARAMETERS }}>
      {({ loading, error, data }) => loading ? <LoadingTakeover /> :
        error ? <h1>Error: {error.message}</h1> :
        <ListingPage {...data.listing} />
      }
    </Query>
  </Fade>
);

export default Listing;

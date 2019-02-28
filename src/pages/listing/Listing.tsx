import * as React from 'react';
import { Query } from 'react-apollo';
import { Fade } from 'reactstrap';

import Footer from 'components/work/Footer';
import Header from 'components/work/Header';

import Loading from 'shared/loading/Loading';

import { GET_PUBLIC_LISTING } from 'networking/listings';

import ListingInformation from './ListingInformation';

const PROFILE_IMAGE_PARAMETERS = { width: 300, height: 300 };

const Listing = ({ match }: RouterProps) => (
  <Fade>
    <Header />
    <Query query={GET_PUBLIC_LISTING} fetchPolicy="cache-and-network" variables={{ id: match.params.id, ...PROFILE_IMAGE_PARAMETERS }}>
      {({ loading, error, data }) => loading ? <Loading /> :
        error ? <h1>Error: {error.message}</h1> :
        <ListingInformation {...data.listing} />
      }
    </Query>
    <Footer />
  </Fade>
);

export default Listing;

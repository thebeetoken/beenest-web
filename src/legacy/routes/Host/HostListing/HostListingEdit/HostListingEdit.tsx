import * as React from 'react';
import ListingForm from 'legacy/routes/Host/ListingForm';
import { Query } from 'react-apollo';
import { GET_LISTING_FORM } from 'networking/listings';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import LoadingTakeover from 'legacy/shared/loading/LoadingTakeover';


const HostListingEdit = (props: RouterProps) => (
  <FirebaseConsumer>
    {({ loading, user }: FirebaseUserProps) => {
      if (loading) return <LoadingTakeover />;

      if (!user) {
        return <h1>You are not logged in.</h1>
      }

      return (
        <Query query={GET_LISTING_FORM} variables={{ id: props.match.params.id }}>
          {({ loading, error, data }) => {
            if (loading) return <LoadingTakeover />;
            
            if (error || !data) {
              return <h1>{error ? error.message : 'Unable to fetch listing'}</h1>;
            }
            
            // key prop allows the form to dump unsaved changes when host navigates away, passing in old listing data.
            return <ListingForm key={props.history.location.key} listing={data.listing} {...props} />
          }}
        </Query>
      )
    }}
  </FirebaseConsumer>
);

export default HostListingEdit;


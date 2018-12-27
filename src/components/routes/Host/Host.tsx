import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import HostBookings from './HostBookings';
import HostListings from './HostListings';
import HostPayments from './HostPayments';
import HostContainer from './Host.container';
import HostNav from './HostNav';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import NotFound from 'routes/NotFound';
import Button from 'shared/Button';
import Divider from 'shared/Divider';
import GeneralWrapper from 'shared/GeneralWrapper';
import AudioLoading from 'shared/loading/AudioLoading';
import AuthenticatedRoute from 'HOCs/AuthenticatedRoute';
import { compose, graphql } from 'react-apollo';
import { CREATE_LISTING, Listing, GET_HOST_LISTINGS } from 'networking/listings';
import { getFriendlyErrorMessage } from 'utils/validators';

interface Props extends RouterProps {
  createListing: () => Promise<Listing>;
}

interface State {
  isCreateListingClicked: boolean;
}

class Host extends React.Component<Props, State> {
  readonly state: State = {
    isCreateListingClicked: false,
  };

  render() {
    return (
      <HostContainer>
        <GeneralWrapper
          align="flex-start"
          direction="column"
          justify="flex-start"
          width={976}>
          <header>
            <h1>Host Profile</h1>
            <Button disabled={this.state.isCreateListingClicked} onClick={this.handleNewListingClick} size="small">
              Add New Listing
            </Button>
          </header>
          <Divider color="light" size="tall" />
          <HostNav />
          <FirebaseConsumer>
            {({ loading, user }: FirebaseUserProps) => {
              if (loading) {
                return <AudioLoading height={48} width={96} />;
              }

              if (!user) {
                return <h1>You are not logged in.</h1>;
              }

              return (
                <Switch>
                  <AuthenticatedRoute exact path="/host/bookings" component={HostBookings} />
                  <AuthenticatedRoute exact path="/host/listings" render={() => <HostListings createListing={this.handleNewListingClick} />} />
                  <AuthenticatedRoute exact path="/host/payments" component={HostPayments} />
                  <Redirect from="/host" to="/host/bookings" />
                  <Route component={NotFound} />
                </Switch>
              );
            }}
          </FirebaseConsumer>
        </GeneralWrapper>
      </HostContainer>
    );
  }

  handleNewListingClick = () => {
    this.setState(
      {
        isCreateListingClicked: true,
      },
      () => {
        this.props
          .createListing()
          .then((listing: any) => {
            const { id } = listing.data.createListing;
            this.props.history.push(`/host/listings/${id}/edit`);
          })
          .catch((error: Error) => {
            console.error(error);
            this.setState({ isCreateListingClicked: false })
            alert(`There was a problem creating this listing: ${getFriendlyErrorMessage(error)}`);
          });
      }
    );
  };
}

export default compose(
  graphql(CREATE_LISTING, {
    props: ({ mutate }: any) => ({
      createListing: () => {
        return mutate({
          refetchQueries: [{ query: GET_HOST_LISTINGS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
              return;
            }
            const { createListing } = data;
            const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
            store.writeQuery({
              query: GET_HOST_LISTINGS,
              data: {
                hostListings: [ createListing, ...hostListings ],
              },
            });
          },
        });
      },
    }),
  })
)(Host);

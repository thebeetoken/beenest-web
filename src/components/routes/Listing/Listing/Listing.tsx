import * as React from 'react';
import { Query } from 'react-apollo';

import ListingContainer from './Listing.container';
import BookingRequestCard from './BookingRequestCard';
import ListingBottomBar from './ListingBottomBar';
import ListingGallery from './ListingGallery';
import ListingInformation from './ListingInformation';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { GET_PUBLIC_LISTING } from 'networking/listings';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import AudioLoading from 'shared/loading/AudioLoading';
import PopUpCard from 'shared/PopUpCard';

const PROFILE_IMAGE_PARAMETERS = { width: 300, height: 300 };

class Listing extends React.Component<RouterProps> {
  readonly state = {
    showCard: false,
  };

  toggleCard = () => this.setState({ showCard: !this.state.showCard });

  render() {
    const { id } = this.props.match.params;
    return (
      <ListingContainer>
        <Query query={GET_PUBLIC_LISTING} fetchPolicy="cache-and-network" variables={{ id, ...PROFILE_IMAGE_PARAMETERS }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <AudioLoading height={48} width={96} />;
            }
            if (error || !data || !data.listing.id) {
              return (
                <div className="listing-body error">
                  <h1>Sorry! This listing is currently unavailable.  Please try again later.</h1>
                  <BeeLink to="/">
                    <Button>Back to Search</Button>
                  </BeeLink>
                </div>
              )
            }
            const { listing } = data;
            const {
              checkInDate,
              checkOutDate,
              id,
              listingPicUrl,
              maxGuests,
              minimumNights,
              photos,
              pricePerNightUsd,
              prices,
              reservations,
              totalQuantity,
              host,
            } = listing;
            const { showCard } = this.state;
            const renderBookCard = (
              <FirebaseConsumer>
                {({ user, completedVerification }: FirebaseUserProps) => {
                  return (
                    <BookingRequestCard
                      loggedIn={!!user}
                      completedVerification={completedVerification}
                      listingId={id}
                      checkInDate={checkInDate}
                      checkOutDate={checkOutDate}
                      maxGuests={maxGuests}
                      minimumNights={minimumNights}
                      prices={prices}
                      pricePerNightUsd={pricePerNightUsd}
                      reservations={reservations}
                      totalQuantity={totalQuantity || 1}
                    />
                  );
                }}
              </FirebaseConsumer>
            );
            return (
              <AppConsumer>
                {({ screenType }: AppConsumerProps) => {
                  const responsive = screenType < ScreenType.DESKTOP;
                  return (
                    <>
                      <ListingGallery listingPicUrl={listingPicUrl} photos={photos} />
                      <div className="listing-body">
                        <ListingInformation listing={listing} host={host} />
                        {!responsive && renderBookCard}
                      </div>
                      {responsive && (
                        <PopUpCard peekHeight={88} showCard={showCard} toggleCard={this.toggleCard}>
                          <ListingBottomBar
                            prices={prices}
                            pricePerNightUsd={pricePerNightUsd}
                            showCard={showCard}
                            toggleCard={this.toggleCard}
                          />
                          {renderBookCard}
                        </PopUpCard>
                      )}
                    </>
                  );
                }}
              </AppConsumer>
            );
          }}
        </Query>
      </ListingContainer>
    );
  }
}

export default Listing;

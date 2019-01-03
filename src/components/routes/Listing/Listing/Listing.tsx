import * as React from 'react';
import { Query } from 'react-apollo';

import ListingContainer from './Listing.container';
import BookingRequestCard from './BookingRequestCard';
import BuyNowCard from './BuyNowCard';
import ListingBottomBar from './ListingBottomBar';
import ListingGallery from './ListingGallery';
import ListingInformation from './ListingInformation';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { GET_PUBLIC_LISTING } from 'networking/listings';
import AudioLoading from 'shared/loading/AudioLoading';
import PopUpCard from 'shared/PopUpCard';

class Listing extends React.Component<RouterProps> {
  readonly state = {
    showCard: false,
  };

  toggleCard = () => this.setState({ showCard: !this.state.showCard });

  render() {
    return (
      <ListingContainer>
        <Query query={GET_PUBLIC_LISTING} variables={{ id: this.props.match.params.id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <AudioLoading height={48} width={96} />;
            }
            if (error || !data) {
              return <h1>{error ? error.message : 'Error / No Data'}</h1>;
            }
            const { listing } = data;
            const {
              autoApprove,
              checkInDate,
              checkOutDate,
              id,
              listingPicUrl,
              maxGuests,
              minimumNights,
              photos,
              pricePerNight,
              pricePerNightEth,
              pricePerNightUsd,
              reservations,
              totalQuantity,
              host,
            } = listing;
            const { showCard } = this.state;
            const renderBookCard = (
              <FirebaseConsumer>
                {({ user, completedVerification }: FirebaseUserProps) => {
                  if (autoApprove) {
                    return (
                      <BuyNowCard
                        loggedIn={!!user}
                        completedVerification={completedVerification}
                        listingId={id}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        pricePerNight={pricePerNight}
                        pricePerNightEth={pricePerNightEth}
                        pricePerNightUsd={pricePerNightUsd}
                      />
                    );
                  }

                  return (
                    <BookingRequestCard
                      loggedIn={!!user}
                      completedVerification={completedVerification}
                      listingId={id}
                      checkInDate={checkInDate}
                      checkOutDate={checkOutDate}
                      maxGuests={maxGuests}
                      minimumNights={minimumNights}
                      pricePerNight={pricePerNight}
                      pricePerNightEth={pricePerNightEth}
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
                            pricePerNight={pricePerNight}
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

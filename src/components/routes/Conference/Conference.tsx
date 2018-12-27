import * as React from 'react';

import { Query } from 'react-apollo';
import { GET_CONFERENCE } from 'networking/conferences';
import format from 'date-fns/format';
import { ListingShort } from 'networking/listings';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import AudioLoading from 'shared/loading/AudioLoading';
import BeeLink from 'shared/BeeLink';
import ConferenceContainer from './Conference.container';
import LazyImage from 'shared/LazyImage';
import { HotelCard } from 'shared/HotelCard';
import Overlay from 'shared/Overlay';
import ListingCards from 'shared/ListingCards';

const HOTEL_ROOM = 'Hotel Room';

const Conference = ({ match }: RouterProps) => (
  <ConferenceContainer className="bee-conference">
    <Query query={GET_CONFERENCE} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <AudioLoading height={48} width={96} />
          );
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }

        const { conference } = data;
        const { coverImage, description, link, listings, startDate, title, venue } = conference;

        const renderHotelListings = (listings || [])
          .filter((listing: ListingShort) => listing.homeType === HOTEL_ROOM)
          .map((listing: ListingShort) => {
            return <HotelCard hover key={listing.id} {...listing} />;
          });
        const propertyListings = (listings || [])
          .filter((listing: ListingShort) => listing.homeType !== HOTEL_ROOM);

        // TODO: startDate.replace('Z', '') is a hack to get date to display
        //       consistently from time zone to time zone.
        return (
          <AppConsumer>
            {({ screenType }: AppConsumerProps) => (
              <>
                <div className="conference-hero">
                  <Overlay color="black" opacity={0.3}>
                    <LazyImage src={coverImage && coverImage.url} position='bottom left' transition />
                    <div className="text-container">
                      <h1>{title}</h1>
                      {startDate && <h2>{`${format(startDate.replace('Z',''), 'MMMM D, YYYY')} @ ${venue || 'TBD'}`}</h2>}
                      {screenType >= ScreenType.TABLET &&<h3>{description}</h3>}
                      <h4>{screenType >= ScreenType.TABLET && 'Still Don\'t Have Conference Tickets? '}
                        <BeeLink href={link}>Purchase Tickets Here</BeeLink></h4>
                    </div>
                  </Overlay>
                </div>
                <div className="conference-body">
                  {!!renderHotelListings.length && <h2>Hotel Packages Available:</h2>}
                  <div className="conference-hotels-container">
                    {renderHotelListings}
                  </div>
                  {!!propertyListings.length && <h2>Available Nearby Listings:</h2>}
                  <ListingCards listings={propertyListings} />
                </div>
              </>
            )}
          </AppConsumer>
        );
      }}
    </Query>
  </ConferenceContainer>
);

export default Conference;

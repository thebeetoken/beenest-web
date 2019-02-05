import * as React from 'react';
import sanitizeHtml from 'sanitize-html';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { Listing, Host } from 'networking/listings';
import Button from 'shared/Button';
import Divider from 'shared/Divider';
import GoogleMaps from 'shared/GoogleMaps';
import LazyImage from 'shared/LazyImage';
import ListItem from 'shared/ListItem';
import Svg from 'shared/Svg';
import { dateToYear } from 'utils/formatDate';
import { formatAddress  } from 'utils/formatter'
import Portal from 'components/shared/Portal';
import ContactHostForm from 'components/shared/ContactHostForm';
import { ToggleProviderRef, ToggleProvider } from 'components/shared/ToggleProvider';

interface Props {
  listing: Listing;
  host: Host;
}

const DEFAULT_PROFILE_URL = 'https://static.beenest.com/images/app/misc/profile.png';

const ListingInformation = ({ listing, host }: Props) => {
  const {
    amenities,
    checkInTime,
    checkOutTime,
    city,
    country,
    description,
    homeType,
    id,
    lat,
    lng,
    maxGuests,
    minimumNights,
    numberOfBathrooms,
    numberOfBedrooms,
    sharedBathroom,
    sleepingArrangement,
    state,
    title,
  } = listing;
  const { about, createdAt, displayName, profilePicUrl } = host;
  const renderAmenities = (amenities || []).map(amenity=> {
    const noFlex = amenity && amenity.length > 25;
    return (
      <ListItem noFlex={!!noFlex} noHover prefixColor="style" start="tiniest" key={amenity}>
        <Svg className="prefix" src="utils/check-circle" />
        <span>{amenity}</span>
      </ListItem>
    );
  });
  
  return (
    <div className="listing-information-container">
      <div className="heading-container">
        <h1>{title}</h1>
        <h3>
          {formatAddress(city, state, country)}
        </h3>
      </div>

      <div className="host-welcome-container">
        <h3>Host: {displayName}</h3>
        <div className="host-welcome-container--img">
          <LazyImage src={profilePicUrl || DEFAULT_PROFILE_URL} />
        </div>
      </div>

      <div className="description-container">
        <h2>Description</h2>
        {description && <div className="description-container--content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }} />}
      </div>

      <div className="accommodations-container">
        <h2>Accommodations</h2>
        <ul>
          {homeType && <li>Home type: {homeType}</li>}
          {sleepingArrangement && <li>Sleeping arrangement: {sleepingArrangement}</li>}
          {numberOfBedrooms && <li>Number of bedrooms: {numberOfBedrooms}</li>}
          {numberOfBathrooms && <li>Number of bathrooms: {numberOfBathrooms}</li>}
          {sharedBathroom && <li>Shared bathroom: {sharedBathroom}</li>}
          {maxGuests && <li>Maximum number of guests: {maxGuests}</li>}
          {minimumNights && <li>Minimum number of nights: {minimumNights}</li>}
          {checkInTime && <li>Check-in: {checkInTime.from} to {checkInTime.to}</li>}
          {checkOutTime && <li>Check-out: {checkOutTime}</li>}
        </ul>
      </div>

      <div className="amenities-container">
        <h2>Amenities</h2>
        <div className="amenities-list-container">
          <ul>{renderAmenities}</ul>
        </div>
      </div>

      <Divider className="divider-style" />

      <div className="location-container">
        <h2>Location</h2>
        <h3>(Specific location will be revealed once booking is confirmed)</h3>
        <GoogleMaps lat={lat} lng={lng} showCircle />
      </div>

      <Divider className="divider-style" />

      <div className="about-host-container">
        <div className="about-host-heading-container">
          <h2>About {displayName}</h2>
          {createdAt && <h3>Joined since {dateToYear(createdAt)}</h3>}
          <div className="about-host-container--img">
            <LazyImage src={profilePicUrl || DEFAULT_PROFILE_URL} />
          </div>
          <FirebaseConsumer>
            {({ completedVerification }: FirebaseUserProps) => {
              if (!completedVerification) {
                return null;
              }
              return (
                <ToggleProvider>
                  {({ show, toggle }: ToggleProviderRef) => (
                    <>
                      <Button
                        background="white"
                        border="core"
                        className="about-host-container--contact-btn"
                        color="core"
                        onClick={toggle}
                        size="small"
                        suffix="decorative/email">
                        Contact Host
                      </Button>
                      {show && (
                        <Portal color="up" opacity={0.9} onClick={toggle}>
                          <ContactHostForm
                            host={host}
                            listingId={id}
                            onClose={toggle} />
                        </Portal>
                      )}
                    </>
                  )}
                </ToggleProvider>
              );
            }}
          </FirebaseConsumer>
        </div>
        {about && <div className="about-host-container--description" dangerouslySetInnerHTML={{ __html: sanitizeHtml(about) }} />}
      </div>
    </div>
  );
};

export default ListingInformation;

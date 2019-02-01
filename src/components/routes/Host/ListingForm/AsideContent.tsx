import * as React from 'react';

interface AsideContentInterface {
  [name: string]: React.ReactNode;
}

const HomeType = () => (
  <div>
    <strong>Entire place</strong>
    <p>The whole space is dedicated to guests. This may be a house, apartment, condo, loft, etc.</p>
    <br />
    <strong>Private room</strong>
    <p>A single room within a place is dedicated to guests. While other areas could be shared, guests have their own private room for sleeping.</p>
    <br />
    <strong>Shared room</strong>
    <p>Bedrooms or a common area that could be shared with others are dedicated to guests.</p>
  </div>
);

const FullAddress = () => (
  <div>
    <p>Don't forget to add a zip code!</p>
  </div>
);

const Title = () => (
  <div>
    <p>This is ListingName Info</p>
  </div>
);

const Description = () => (
  <div>
    <p>This is Description Info</p>
  </div>
);

const Country = () => (
  <div>
    <p>This is Country Info</p>
  </div>
);

const ListingPicUrl = () => (
  <div>
    <p>This is Cover Photo Info</p>
  </div>
);

const Photos = () => (
  <div>
    <p>This is Listing Photos Info</p>
  </div>
);

const SleepingArrangement = () => (
  <div>
    <p>This is Sleeping Arrangement Info</p>
  </div>
);

const NumberOfBedrooms = () => (
  <div>
    <p>This is Number of Bedrooms Info</p>
  </div>
);

const NumberOfBathrooms = () => (
  <div>
    <p>This is Number of Bathrooms Info</p>
  </div>
);

const SharedBathroom = () => (
  <div>
    <p>This is Shared Bathroom Info</p>
  </div>
);

const Amenities = () => (
  <div>
    <p>This is Amenities Info</p>
  </div>
);

const MaxGuests = () => (
  <div>
    <p>This is Max Guests Info</p>
  </div>
);

const MinimumNights = () => (
  <div>
    <p>This is Min Nights Info</p>
  </div>
);

const PricePerNightUsd = () => (
  <div>
    <p>This is Price Per Night USD Info</p>
  </div>
);

const SecurityDepositUsd = () => (
  <div>
    <p>This is Security Deposit USD Info</p>
  </div>
);

const IcalUrls = () => (
  <div>
    <p>This is iCal Urls Info</p>
  </div>
);

const CheckInTime = () => (
  <div>
    <p>This is Check In Time Info</p>
  </div>
);

const CheckOutTime = () => (
  <div>
    <p>This is Check Out Time Info</p>
  </div>
);

const HouseRules = () => (
  <div>
    <p>This is House Rules Info</p>
  </div>
);

const AsideContent: AsideContentInterface = {
  homeType: <HomeType />,
  title: <Title />,
  description: <Description />,
  addressLine1: <FullAddress/>,
  addressLine2: <FullAddress/>,
  city: <FullAddress/>,
  state: <FullAddress/>,
  postalCode: <FullAddress/>,
  country: <Country />,
  listingPicUrl: <ListingPicUrl />,
  photos: <Photos />,
  
  sleepingArrangement: <SleepingArrangement />,
  numberOfBedrooms: <NumberOfBedrooms />,
  numberOfBathrooms: <NumberOfBathrooms />,
  sharedBathroom: <SharedBathroom />,
  amenities: <Amenities />,

  maxGuests: <MaxGuests />,
  minimumNights: <MinimumNights />,
  pricePerNightUsd: <PricePerNightUsd />,
  securityDepositUsd: <SecurityDepositUsd />,
  icalUrls: <IcalUrls />,
  
  checkInTime: <CheckInTime />,
  checkOutTime: <CheckOutTime />,
  houseRules: <HouseRules />,
}

export default AsideContent;
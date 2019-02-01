import * as React from 'react';

interface AsideContentInterface {
  [name: string]: React.ReactNode;
}

const HomeType = (props: any) => (
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

const FullAddress = (props: any) => (
  <div>
    <p>Don't forget to add a zip code!</p>
  </div>
);

const MaxGuests = (props: any) => (
  <div>
    <p>This is Max Guests Info</p>
  </div>
);

const CheckInTime = (props: any) => (
  <div>
    <p>This is Check In Time Info</p>
  </div>
);

const SleepingArrangement = (props: any) => (
  <div>
    <p>This is Sleeping Arrangement Info</p>
  </div>
);
  
const AsideContent: AsideContentInterface = {
  homeType: <HomeType />,
  addressLine1: <FullAddress/>,
  addressLine2: <FullAddress/>,
  city: <FullAddress/>,
  state: <FullAddress/>,
  postalCode: <FullAddress/>,
  maxGuests: <MaxGuests />,
  checkInTime: <CheckInTime />,
  sleepingArrangement: <SleepingArrangement />,
}

export default AsideContent;
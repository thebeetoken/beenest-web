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

const ListingPicUrl = () => (
  <div>
    <p>High-quality photos are a must as our guests are typically business travelers. Ideal image dimensions are 1440x960. The maximum file size is 5 MB and the file types we accept are .jpg &amp; .png.</p>
  </div>
);

const Photos = () => (
  <div>
    <p>Beenest recommends listings have at least 5 high definition photos available. Pro tip: provide multiple photos with different angles of bedrooms, bathrooms, and public spaces so guests know exactly what to expect.</p>
  </div>
);

const SleepingArrangement = () => (
  <div>
    <p>The number and type of beds you have determine how many guests can stay comfortably.</p>
    <br />
    <p>Sleeping arrangements help guests decide whether your space is a right fit and know what to expect once they’re there.</p>
  </div>
);

const NumberOfBathrooms = () => (
  <div>
    <p>If you have a toilet separate from the shower, count it as a 0.5 bathroom. Count only the bathrooms guests can use.</p>
  </div>
);

const Amenities = () => (
  <div>
    <p>Please make sure to include Wifi capabilities for business travelers. Providing the essentials helps guests feel at home in your place. Other common amenities include: TV, Heat, Air Conditioning, Iron, Hair dryer, First Aid Kit, Parking on premises, etc.</p>
    <br />
    <p>There’s no maximum to the number of amenities you can include so add as many as you’d like! </p>
  </div>
);

const PricePerNightUsd = () => (
  <div>
    <p>The price per night should include any associated fees typically charged to guests. This includes cleaning fees, occupancy taxes, etc.</p>
    <br />
    <p>Why do we do this? We’re not like everyone else. Rather than tack on a laundry list of fees to guests’ bills only at the time of booking (or even after!), Beenest aims to increase transparency in travel and provide all costs up front immediately.</p>
  </div>
);

const SecurityDepositUsd = () => (
  <div>
    <p><strong>Note:</strong> Security deposit is not charged at the time of booking. It will only be charged if a guest damages your property.</p>
  </div>
);

const IcalUrls = () => (
  <div>
    <p>To avoid double bookings and to prevent multiple guests from booking the same dates, sync your Beenest calendar with your other calendars and input your iCal URL from other booking platforms.</p>
    <br />
    <p>Instructions to export calendars on other platforms are generally:</p>
    <ol>
      <li>Go to <strong>Host</strong> and select <strong>Calendar</strong></li>
      <li>Click <strong>Availability</strong> settings in your calendar view</li>
      <li>Under Sync calendars, select <strong>Export Calendar</strong></li>
      <li>Copy and paste the calendar link into Beenest</li>
    </ol>
    <p><strong>Note:</strong> When you edit an external calendar that syncs with your calendar on Beenest, it will take a few hours for those changes to be visible to guests who view your listing.</p>
  </div>
);

const HouseRules = () => (
  <div>
    <p>Common house rules include:</p>
    <ul>
      <li>No smoking, parties, or events</li>
      <li>Self check-in with keypad</li>
      <li>No pets</li>
      <li>Additional cancellation policies</li>
    </ul>
  </div>
);

const AsideContent: AsideContentInterface = {
  homeType: <HomeType />,
  title: <></>,
  description: <></>,
  addressLine1: <FullAddress/>,
  addressLine2: <FullAddress/>,
  city: <FullAddress/>,
  state: <FullAddress/>,
  postalCode: <FullAddress/>,
  country: <></>,
  listingPicUrl: <ListingPicUrl />,
  photos: <Photos />,
  
  sleepingArrangement: <SleepingArrangement />,
  numberOfBedrooms: <></>,
  numberOfBathrooms: <NumberOfBathrooms />,
  sharedBathroom: <></>,
  amenities: <Amenities />,

  maxGuests: <></>,
  minimumNights: <></>,
  pricePerNightUsd: <PricePerNightUsd />,
  securityDepositUsd: <SecurityDepositUsd />,
  icalUrls: <IcalUrls />,
  
  checkInTime: <></>,
  checkOutTime: <></>,
  houseRules: <HouseRules />,
}

export default AsideContent;
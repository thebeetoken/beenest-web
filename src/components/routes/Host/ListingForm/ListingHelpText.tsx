import * as React from 'react';
import ListItem from 'shared/ListItem';
import Svg from 'shared/Svg';
import LazyImage from 'shared/LazyImage';

interface ListingHelpTextInterfaceInterface {
  [name: string]: React.ReactNode;
}

const HomeType = () => (
  <div>
    <h3>Type of Home</h3>
    <h4>Entire place</h4>
    <p>The whole space is dedicated to guests. This may be a house, apartment, condo, loft, etc.</p>
    <h4>Private room</h4>
    <p>A single room within a place is dedicated to guests. While other areas could be shared, guests have their own private room for sleeping.</p>
    <h4>Shared room</h4>
    <p>Bedrooms or a common area that could be shared with others are dedicated to guests.</p>
  </div>
);

const Title = () => (
  <div>
    <h3>Listing Name</h3>
    <p>&quot;Beautiful Home with Wifi and Views&quot;</p>
  </div>
);

const Description = () => (
  <div>
    <h3>Listing Description</h3>
    <p>Include a summary of your place to help guests imagine what it will be like to stay there. Note what makes your place special, mention what the neighborhood is like, and add anything else guests should know before arriving.</p>
  </div>
)

const FullAddress = () => (
  <div>
    <h3>Full Address</h3>
    <p>When adding the Full Address -- don’t forget to add a zip code!</p>
  </div>
);

const ListingPicUrl = () => (
  <div>
    <h3>Cover Photo</h3>
    <p>High-quality photos are a must as our guests are typically business travelers. Ideal image dimensions are 1440x960. The maximum file size is 5 MB and the file types we accept are .jpg &amp; .png.</p>
    <h4>Examples:</h4>
    <div className="images-container">
      <LazyImage className="image-container--horizontal" src="https://static.beenest.com/images/photo-examples/Do_LA_Bedroom.jpg" />
      <LazyImage className="image-container--horizontal" src="https://static.beenest.com/images/photo-examples/Do_LA_Bedroom_2.jpg" />
    </div>
  </div>
);

const Photos = () => (
  <div>
    <h3>Listing Photos</h3>
    <p>Beenest recommends listings have at least 5 high-definition photos available. Photos are the best way to show off your place to potential guests. <span>Pro tip:</span> provide multiple well-lit photos with different angles of bedrooms, bathrooms, and public spaces so guests know exactly what to expect.</p>
    <h4>Do:</h4>
    <ul>
      <ListItem noHover prefixColor="correct" start="tiny">
        <Svg className="prefix" src="utils/check-circle" />
        <span>Take horizontal photos</span>
      </ListItem>
      <ListItem noHover prefixColor="correct" start="tiny">
        <Svg className="prefix" src="utils/check-circle" />
        <span>Take photos when natural light is brightest</span>
      </ListItem>
      <ListItem noHover prefixColor="correct" start="tiny">
        <Svg className="prefix" src="utils/check-circle" />
        <span>Provide multiple angles</span>
      </ListItem>
    </ul>
    <h4>Don't:</h4>
    <ul>
      <ListItem noHover prefixColor="incorrect" start="tiny">
        <Svg className="prefix" src="utils/x-circle" />
        <span>Take vertical photos</span>
      </ListItem>
      <ListItem noHover prefixColor="incorrect" start="tiny">
        <Svg className="prefix" src="utils/x-circle" />
        <span>Take photos when there is no natural light</span>
      </ListItem>
      <ListItem noHover prefixColor="incorrect" start="tiny">
        <Svg className="prefix" src="utils/x-circle" />
        <span>Upload blurry photos</span>
      </ListItem>
    </ul>
  </div>
);

const SleepingArrangement = () => (
  <div>
    <h3>Sleeping Arrangement</h3>
    <p>Sleeping Arrangement must include the quantity and size of beds.</p>
  </div>
);

const NumberOfBedrooms = () => (
  <div>
    <h3>Number of Bedrooms</h3>
    <p>Number of Bedrooms help guests decide whether your space is a right fit and know what to expect once they’re there.</p>
  </div>
);

const NumberOfBathrooms = () => (
  <div>
    <h3>Number of Bathrooms</h3>
    <p>If you have a toilet separate from the shower, count it as a 0.5 bathroom. Count only the bathrooms guests can use.</p>
  </div>
);

const SharedBathroom = () => (
  <div>
    <h3>Shared Bathroom</h3>
    <p>Clicking this box confirms that the bathroom is shared.</p>
  </div>
);

const Amenities = () => (
  <div>
    <h3>Amenities</h3>
    <p>Please make sure to include Wifi capabilities for business travelers. Providing the essentials helps guests feel at home in your place. Other common amenities include: TV, Heat, Air Conditioning, Iron, Hair dryer, First Aid Kit, Parking on premises, etc.</p>
    <p>There’s no maximum to the number of amenities you can include so add as many as you’d like! </p>
  </div>
);

const MaxGuests = () => (
  <div>
    <h3>Max Guests</h3>
    <p>Is your place made for a single traveler or a group? Indicate the maximum number of guests your place allows.</p>
  </div>
);

const MinimumNights = () => (
  <div>
    <h3>Minimum Nights</h3>
    <p>Indicate the minimum number of nights guests must book to stay at your place.</p>
  </div>
);

const PricePerNightUsd = () => (
  <div>
    <h3>Price Per Night</h3>
    <p>The price per night should include any associated fees typically charged to guests. This includes cleaning fees, occupancy taxes, etc.</p>
    <p>Why do we do this? We’re not like everyone else. Beenest is unique in that, rather than tack on a laundry list of fees to guests’ bills only at the time of booking (or even after), Beenest aims to increase transparency in travel and provide all costs up front.</p>
  </div>
);

const SecurityDepositUsd = () => (
  <div>
    <h3>Security Deposit</h3>
    <p><span>Note:</span> Security deposit is not charged at the time of booking. It will only be charged if a guest damages your property.</p>
  </div>
);

const IcalUrls = () => (
  <div>
    <h3>iCal Urls</h3>
    <p>To avoid double bookings and to prevent multiple guests from booking the same dates, sync your Beenest calendar with your other calendars and input your iCal URL from other booking platforms.</p>
    <p>Instructions to export calendars on other platforms are generally:</p>
    <ol>
      <li>Go to <span>Host</span> and select <span>Calendar</span></li>
      <li>Click <span>Availability</span> settings in your calendar view</li>
      <li>Under Sync calendars, select <span>Export Calendar</span></li>
      <li>Copy and paste the calendar link into Beenest</li>
    </ol>
    <p><span>Note:</span> When you edit an external calendar that syncs with your calendar on Beenest, it will take a few hours for those changes to be visible to guests who view your listing.</p>
  </div>
);

const CheckInTime = () => (
  <div>
    <h3>Check-in (From) and (To)</h3>
    <p>Provide a window of time in which guests are able to check into your place. Typical times guests check in are between 11 AM - 2PM.</p>
    <p>Allowing guests to check in later, for instance up until 11:30PM, is preferred.</p>
  </div>
);

const CheckOutTime = () => (
  <div>
    <h3>Check-out (Before)</h3>
    <p>Inform guests the time in which they are required to exit the premises. Typical Check-out time is 3 PM.</p>
  </div>
);

const HouseRules = () => (
  <div>
    <h3>House Rules</h3>
    <h4>Keep your guests as informed as possible and set ground rules.</h4>
    <p>Common house rules include:</p>
    <ul>
      <li>No pets</li>
      <li>No smoking</li>
      <li>No parties or events</li>
      <li>Self check-in with keypad</li>
      <li>Additional cancellation policies</li>
    </ul>
  </div>
);

const ListingHelpTextInterface: ListingHelpTextInterfaceInterface = {
  homeType: <HomeType />,
  title: <Title />,
  description: <Description />,
  addressLine1: <FullAddress/>,
  addressLine2: <FullAddress/>,
  city: <FullAddress/>,
  state: <FullAddress/>,
  postalCode: <FullAddress/>,
  country: <FullAddress />,
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

export default ListingHelpTextInterface;
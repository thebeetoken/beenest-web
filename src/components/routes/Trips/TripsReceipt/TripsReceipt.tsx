import * as React from 'react';
import { Query } from 'react-apollo';

import TripsReceiptContainer from './TripsReceipt.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import { GET_BOOKING_TRIPS_RECEIPT, Booking } from 'networking/bookings';
import Divider from 'shared/Divider';
import AudioLoading from 'shared/loading/AudioLoading';
import GeneralWrapper from 'shared/GeneralWrapper';
import GoogleMaps from 'shared/GoogleMaps';
import LazyImage from 'shared/LazyImage';
import ListItem from 'shared/ListItem';
import Svg from 'shared/Svg';
import { dateToYear, formatDateRange } from 'utils/formatDate';
import { formatAddress, formatGeolocationAddress } from 'utils/formatter';

const TripsReceipt = ({ match }: RouterProps): JSX.Element => {
  return (
    <TripsReceiptContainer>
      <Query query={GET_BOOKING_TRIPS_RECEIPT} variables={{ id: match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <AudioLoading height={48} width={96} />;
          }
          if (error || !data) {
            return <h1>{error ? error.message : 'Error / No Data'}</h1>;
          }

          const booking = data.booking;

          return (
            <AppConsumer>
              {({ screenType }: AppConsumerProps) => {
                if (screenType < ScreenType.DESKTOP) {
                  return (
                    <GeneralWrapper width="100%">
                      <TripsReceiptContent {...booking} />
                    </GeneralWrapper>
                  );
                }

                return (
                  <GeneralWrapper width={972}>
                    <TripsReceiptContent {...booking} />
                  </GeneralWrapper>
                );
              }}
            </AppConsumer>
          );
        }}
      </Query>
    </TripsReceiptContainer>
  );
};

const TripsReceiptContent = (props: Booking): JSX.Element => {
  const { guestTxHash, host, listing } = props;
  const { createdAt, firstName, profilePicUrl } = host;
  const { city, country, state, title } = listing;
  return (
    <div className="trips-receipt-content">
      <h1>Receipt</h1>
      <Divider color="up" />
      <div className="trips-receipt-meta">
        <h2>{title}</h2>
        <h3>{city && `${city}, `}{state && `${state}, `}{country.toUpperCase()}</h3>
        <div className="trips-receipt-host-profile">
          <div className="trips-receipt-host-profile-image">
            <LazyImage src={profilePicUrl || "https://static.beenest.com/images/app/misc/profile.png"} transition />
          </div>
          <div className="trips-receipt-host-profile-meta">
            <h5>Hosted by: <span>{firstName}</span></h5>
            {createdAt && <h6>Member since {dateToYear(createdAt)}</h6>}
          </div>
        </div>
        <AppConsumer>
          {({ screenType }: AppConsumerProps) => {
            if (screenType < ScreenType.DESKTOP) {
              return (
                <TripsReceiptsMeta {...props} />
              );
            }

            return (
              <>
                {guestTxHash &&
                  <>
                    <h4 className="trips-receipt-transaction__secondary">Transaction Confirmation Number</h4>
                    <h4 className="trips-receipt-transaction__body">{guestTxHash}</h4>
                  </>
                }
                <TripsReceiptsMeta {...props} />
              </>
            );
          }}
        </AppConsumer>
      </div>
    </div>
  );
}

const TripsReceiptsMeta = (props: Booking): JSX.Element => {
  const { checkInDate, checkOutDate, listing, numberOfGuests } = props;
  const { addressLine1, addressLine2, city, country, lat, lng, postalCode, state } = listing;
  return (
    <AppConsumer>
      {({ screenType }: AppConsumerProps) => {
        return (
          <>
            <Divider color="up" />
            <div className="trips-receipt-booked">
              <ListItem
                font={screenType !== ScreenType.MOBILE ? 'medium' : 'small'}
                noHover
                prefixColor="secondary"
                start="tiniest"
                textColor="body">
                <Svg className="prefix" src="decorative/calendar" />
                <span>Booked on: {formatDateRange(checkInDate, checkOutDate)}</span>
              </ListItem>
              {screenType !== ScreenType.MOBILE &&
                <ListItem
                  font="small"
                  noHover
                  start="medium-large"
                  textColor="body">
                  <span>Guest: {numberOfGuests} Guests</span>
                </ListItem>
              }
            </div>
            <Divider color="up" />
            <div className="trips-receipt-paid">
              <TripsReceiptPriceQuote {...props} />
            </div>
            <Divider color="up" />
            <div className="trips-receipt-location">
              <ListItem
                font={screenType !== ScreenType.MOBILE ? 'medium' : 'small'}
                noFlex
                noHover
                prefixColor="secondary"
                start="tiniest"
                textColor="body"
                textTransform="capitalize">
                <Svg className="prefix" src="decorative/location" />
                  <span>
                    {addressLine1 && formatAddress(addressLine1, addressLine2, city, state, country, postalCode)}
                    {!addressLine1 && formatGeolocationAddress({ lat, lng, city, country })}
                  </span>
              </ListItem>
              <GoogleMaps lat={lat} lng={lng} showCircle />
            </div>
          </>
        );
      }}
    </AppConsumer>
  );
}

const TripsReceiptPriceQuote = (props: Booking): JSX.Element => {
  const { currency, guestTotalAmount, priceQuotes } = props;
  const priceQuote = (priceQuotes || []).find((quote) => quote.currency === currency);

  if (!priceQuote) {
    return (
      <AppConsumer>
        {({ screenType }: AppConsumerProps) => {
          return (
            <div className="trips-receipt-paid--line-items">
              <ListItem
                font={screenType !== ScreenType.MOBILE ? 'medium' : 'small'}
                noHover
                prefixColor="secondary"
                start="tiniest"
                textColor="body">
                <Svg className="prefix" src="decorative/wallet" />
                <span>Total Paid: {currency === 'USD' ? roundToUsdPrice(guestTotalAmount) : guestTotalAmount} {currency}</span>
              </ListItem>
            </div>
          )
        }}
      </AppConsumer>
    );
  }

  const { creditAmountApplied, pricePerNight, priceTotalNights, securityDeposit, transactionFee } = priceQuote;
  return (
    <AppConsumer>
      {({ screenType }: AppConsumerProps) => {
        return (
          <>
            <div className="trips-receipt-paid--line-items">
              <ListItem
                font={screenType !== ScreenType.MOBILE ? 'medium' : 'small'}
                noHover
                prefixColor="secondary"
                start="tiniest"
                textColor="body">
                <Svg className="prefix" src="decorative/wallet" />
                <span>Total Paid: {currency === 'USD' ? roundToUsdPrice(guestTotalAmount) : guestTotalAmount} {currency}</span>
              </ListItem>
              {(screenType !== ScreenType.MOBILE) &&
                <ListItem
                  font="tiny"
                  noHover
                  start="small"
                  textColor="upper">
                  <span>(Itemized List of Total)</span>
                </ListItem>
              }
            </div>
              <div className="trips-receipt-paid--line-items">
                <ListItem
                  font="small"
                  noHover
                  start="medium-large"
                  textColor="body">
                  <span>{pricePerNight} {currency} x {(priceTotalNights / pricePerNight)} {(priceTotalNights / pricePerNight) > 1 ? 'nights' : 'night'}</span>
                </ListItem>
                <ListItem
                  font="small-e"
                  noHover
                  start="medium-large"
                  textColor="body"
                  textAlign="right">
                  <span>{currency === 'USD' ? roundToUsdPrice(priceTotalNights) : priceTotalNights} {currency}</span>
                </ListItem>
              </div>
              <div className="trips-receipt-paid--line-items">
                <ListItem
                  font="small"
                  noHover
                  start="medium-large"
                  textColor="body">
                  <span>Security Deposit</span>
                </ListItem>
                <ListItem
                  font="small-e"
                  noHover
                  start="medium-large"
                  textColor="body"
                  textAlign="right">
                  <span>{securityDeposit || 0} {currency}</span>
                </ListItem>
              </div>
              <div className="trips-receipt-paid--line-items">
                <ListItem
                  font="small"
                  noHover
                  start="medium-large"
                  textColor="body">
                  <span>Transaction Fee</span>
                </ListItem>
                <ListItem
                  font="small-e"
                  noHover
                  start="medium-large"
                  textColor="body"
                  textAlign="right">
                  <span>{transactionFee} {currency}</span>
                </ListItem>
              </div>
              {creditAmountApplied !== 0 &&
                <div className="trips-receipt-paid--line-items">
                  <ListItem
                    font="small"
                    noHover
                    start="medium-large"
                    textColor="body">
                    <span>Credits Applied</span>
                  </ListItem>
                  <ListItem
                    font="small-e"
                    noHover
                    start="medium-large"
                    textColor="body"
                    textAlign="right">
                    <span>-{creditAmountApplied} {currency}</span>
                  </ListItem>
                </div>
              }
          </>
        );
      }}
    </AppConsumer>
  );
}

const roundToUsdPrice = (price: Number) => price.toFixed(2);

export default TripsReceipt;

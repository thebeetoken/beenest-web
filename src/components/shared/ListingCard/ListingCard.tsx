import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { ListingCardContainer, ListingCardPlaceholderContainer } from './ListingCard.container';

import { ListingShort } from 'networking/listings';
import BeeLink from 'shared/BeeLink';
import LazyImage from 'shared/LazyImage';
import { numberToLocaleString } from 'utils/numberToLocaleString';
import { Currency } from 'networking/bookings';
import { parseQueryString, stringifyQueryString } from 'utils/queryParams';
import { formatAddress } from 'utils/formatter';

interface Props extends ListingShort, RouterProps {
  className?: string;
  hover?: boolean;
  target?: string;
}

interface QueryObject {
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: string;
}

const enhancedListingCard = ({
  className,
  city,
  country,
  hover,
  idSlug,
  listingPicUrl,
  location,
  prices,
  pricePerNightUsd,
  state,
  target,
  title,
}: Props) => {
  const queryObject: QueryObject = parseQueryString(location.search);
  const { checkInDate, checkOutDate, numberOfGuests } = queryObject;
  const queryString = stringifyQueryString({
    checkInDate,
    checkOutDate,
    numberOfGuests,
  });
  const beePrice = prices.find(({ currency }) => currency === Currency.BEE);
  const queryParams = !!Object.keys(queryString).length ? `?${queryString}` : '';
  return (
    <BeeLink target={target} to={`/listings/${idSlug}${queryParams}`}>
      <ListingCardContainer className={`bee-listing-card ${className || ''}`.trim()} {...{ hover }}>
        <div className="listing-card--image">
          <LazyImage src={listingPicUrl} transition />
        </div>
        <div className="listing-card--meta">
          <div className="listing-card-price-container">
            <h2>
              {numberToLocaleString(pricePerNightUsd)} <span>USD per night</span>
            </h2>
            {beePrice && <h3>
              {numberToLocaleString(beePrice.pricePerNight, Currency.BEE)} <span>BEE</span>
            </h3>}
          </div>
          <h1>{title}</h1>
          <div className="bee-flex-div" />
          <h4>
            {formatAddress(city, state, country)}
          </h4>
        </div>
      </ListingCardContainer>
    </BeeLink>
  );
};

export const ListingCard = withRouter(enhancedListingCard);

export const ListingCardPlaceholder = () => (
  <ListingCardPlaceholderContainer className="listing-card-placeholder">
    <div className="listing-card--image-placeholder" />
    <div className="listing-card--meta-placeholder" />
  </ListingCardPlaceholderContainer>
);

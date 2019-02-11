import * as React from 'react';

import { HotelCardContainer, HotelCardPlaceholderContainer } from './HotelCard.container';

import { ListingShort } from 'networking/listings';
import BeeLink from 'shared/BeeLink'
import LazyImage from 'shared/LazyImage';
import Svg from 'shared/Svg';

interface Props extends ListingShort {
  className?: string;
  endDate?: string;
  hover?: boolean;
  startDate?: boolean;
}

export const HotelCard = (props: Props) => {
  const { endDate, hover, idSlug, listingPicUrl, pricePerNightUsd, sleepingArrangement, startDate, title } = props;
  const queryParams = (startDate && endDate) ? `?checkInDate=${startDate}&checkOutDate=${endDate}` : '';
  return (
    <BeeLink to={`/listings/${idSlug}${queryParams}`}>
      <HotelCardContainer
        className={`bee-hotel-card ${props.className || ''}`.trim()}
        {...{ hover }}>
        <div className="hotel-card--image">
          <LazyImage src={listingPicUrl} transition />
        </div>
        <div className="hotel-card--meta">
          <div className="hotel-card--heading-container">
            <h3>{`$${pricePerNightUsd}`}</h3>
            <h4>{sleepingArrangement}</h4>
          </div>
          <div className="hotel-card--title">
            <h3>{title}</h3>
          </div>
          <div className="hotel-card--purchase">
            <h4>PURCHASE PACKAGE</h4> <Svg src={"utils/arrow-right"} />
          </div>
        </div>
      </HotelCardContainer>
    </BeeLink>
  );
};

export const HotelCardPlaceholder = () => (
  <HotelCardPlaceholderContainer className="hotel-card-card-placeholder">
    <div className="hotel-card--image-placeholder" />
    <div className="hotel-card--meta-placeholder" />
  </HotelCardPlaceholderContainer>
);

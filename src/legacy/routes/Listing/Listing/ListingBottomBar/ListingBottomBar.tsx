import * as React from 'react';

import Button from 'legacy/shared/Button';
import ListingBottomBarContainer from './ListingBottomBar.container';
import { numberToLocaleString } from 'utils/numberToLocaleString';
import { Currency } from 'networking/bookings';
import { Price } from 'networking/listings';

interface Props {
  pricePerNightUsd: number;
  prices: Price[];
  showCard: boolean;
  toggleCard?: () => void;
}

const ListingBottomBar = ({ prices, pricePerNightUsd, showCard, toggleCard }: Props) => {
  const beePrice = prices.find(({ currency }) => currency === Currency.BEE);
  return (<ListingBottomBarContainer>
    <div className="pricing-container">
      <div className="pricing-container--primary">
        <h4>
          {numberToLocaleString(pricePerNightUsd)}
          <span>USD / night</span>
        </h4>
      </div>
      <div className="pricing-container--other-rates">
        { beePrice && <h5>
          {numberToLocaleString(beePrice.pricePerNight, Currency.BEE)}
          <span>BEE</span>
        </h5>}
      </div>
    </div>
    {!showCard && (
      <Button radius="4px" textStyle="small" onClick={toggleCard}>
        Request to Book
      </Button>
    )}
  </ListingBottomBarContainer>);
};

export default ListingBottomBar;

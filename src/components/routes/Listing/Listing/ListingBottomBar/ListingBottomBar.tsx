import * as React from 'react';

import Button from 'components/shared/Button';
import ListingBottomBarContainer from './ListingBottomBar.container';
import { numberToLocaleString } from 'utils/numberToLocaleString';
import { Currency } from 'networking/bookings';

interface Props {
  pricePerNight: number;
  pricePerNightUsd: number;
  showCard: boolean;
  toggleCard?: () => void;
}

const ListingBottomBar = ({ pricePerNight, pricePerNightUsd, showCard, toggleCard }: Props) => (
  <ListingBottomBarContainer>
    <div className="pricing-container">
      <div className="pricing-container--primary">
        <h4>
          {numberToLocaleString(pricePerNightUsd)}
          <span>USD / night</span>
        </h4>
      </div>
      <div className="pricing-container--other-rates">
        <h5>
          {numberToLocaleString(pricePerNight, Currency.BEE)}
          <span>BEE</span>
        </h5>
      </div>
    </div>
    {!showCard && (
      <Button radius="4px" textStyle="small" onClick={toggleCard}>
        Request to Book
      </Button>
    )}
  </ListingBottomBarContainer>
);

export default ListingBottomBar;

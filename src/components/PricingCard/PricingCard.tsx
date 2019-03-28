import * as React from 'react';
import PricingCardContainer from './PricingCard.container';

interface Price {
  amount: string | number;
  currency: string;
}

interface Props {
  prices: Price[];
}

class PricingCard extends React.Component<Props> {
  render() {
    const { prices, children } = this.props;
    const primaryPrice = prices[0];
    const otherPrices = prices.slice(1);

    return (
      <PricingCardContainer>
        <div className="pricing-card-wrapper">
          <div className="pricing-container">
            <div className="pricing-container--primary">
              <h4>{primaryPrice.amount}</h4><span>{primaryPrice.currency}</span>
            </div>
            <div className="pricing-container--other-rates">
              {otherPrices.map(({ amount, currency }) => (
                <h5 key={currency}>{amount}<span>{currency}</span></h5>
              ))}
            </div>
          </div>
          { children }
        </div>
      </PricingCardContainer>
    );
  }
}

export default PricingCard;

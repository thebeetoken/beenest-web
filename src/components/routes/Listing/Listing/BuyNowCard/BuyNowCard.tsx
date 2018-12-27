import * as React from 'react';
import { withRouter } from 'react-router';

import PricingCard from 'components/shared/PricingCard';
import Button from 'components/shared/Button';
import differenceInDays from 'date-fns/difference_in_days';

interface Props extends RouterProps {
  loggedIn: boolean;
  completedVerification: boolean;
  checkInDate: Date;
  checkOutDate: Date;
  listingId: number;
  pricePerNight: number;
  pricePerNightEth: number;
  pricePerNightUsd: number;
}

class BuyNowCard extends React.Component<Props> {
  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!this.props.loggedIn) {
      return this.props.history.push({
        pathname: '/login',
        state: { referrer: this.props.location }
      });
    }
    if (!this.props.completedVerification) {
      this.props.history.push(`/account/verification`);
      return;
    }
    this.props.history.push(`/listings/${this.props.listingId}/buy`);
  }

  render() {
    const {
      checkInDate,
      checkOutDate,
      pricePerNight,
      pricePerNightEth,
      pricePerNightUsd
    } = this.props;

    const nights = differenceInDays(checkOutDate, checkInDate);
    const priceBee = (nights * pricePerNight).toFixed(4);
    const priceUsd = (nights * pricePerNightUsd).toFixed(2);
    const priceEth = (nights * pricePerNightEth).toFixed(4);
    const prices = [
      { amount: priceUsd, currency: 'USD' },
      { amount: priceBee, currency: 'BEE' },
      { amount: priceEth, currency: 'ETH' }
    ];

    return (<PricingCard prices={prices}>
      <form onSubmit={this.handleSubmit}>
        <Button radius="4px" type="submit">
          Buy Now
        </Button>
      </form>
    </PricingCard>);
  };
}

export default withRouter(BuyNowCard);

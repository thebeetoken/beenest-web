import * as React from 'react';
import sanitizeHtml from 'sanitize-html';

import BuyNowQuoteContainer from './BuyNowQuote.container';

import Divider from 'shared/Divider';
import PricingCard from 'shared/PricingCard';

enum CurrencyPrecision {
  BEE = 0,
  USD = 2,
  ETH = 4,
}

const BuyNowQuote = ({ paymentInfo }: any) => {
  const hasInvalidPrices = paymentInfo.prices.some(({ amount }: any) => !amount && amount !== 0);
  if (hasInvalidPrices) {
    alert(`Invalid payment info`);
    return <></>;
  }
  const prices = paymentInfo.prices.map(({ amount, currency }: any) => ({
    amount: amount.toFixed(CurrencyPrecision[currency] || 0),
    currency,
  }));
  const { listing } = paymentInfo;
  return (
    <BuyNowQuoteContainer>
      <PricingCard prices={prices}>
        <h5>{listing.title}</h5>
        <Divider />
        <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(truncate(listing.description)) }}></p>
      </PricingCard>
    </BuyNowQuoteContainer>
  );
};

export default BuyNowQuote;


function truncate(phrase: string): string {
  return phrase.length <= 160 ? phrase : `${phrase.substring(0, 160)}...`;
}

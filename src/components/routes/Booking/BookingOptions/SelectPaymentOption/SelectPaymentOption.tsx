import * as React from 'react';

import { Booking, Currency } from 'networking/bookings';

import SelectPaymentOptionContainer from './SelectPaymentOption.container';
import BookingOptionsUSD from '../BookingOptionsUSD';
import BookingOptionsBTC from '../BookingOptionsBTC';
import BookingQuote from '../../BookingQuote';
import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import BookingOptionsCrypto from '../BookingOptionsCrypto';

import InputLabel from 'shared/InputLabel';
import SelectBoxWrapper from 'shared/SelectBoxWrapper';
import Svg from 'shared/Svg';
import { AppEnv, APP_ENV } from 'configs/settings';
import { loadWeb3, priceWithToken } from 'utils/web3';

interface Props {
  booking: Booking;
}

interface State {
  conversionRateFromBee?: number;
  currency: Currency | undefined;
  errorPricingToken: boolean;
}
class SelectPaymentOption extends React.Component<Props> {
  readonly state: State = {
    conversionRateFromBee: 0,
    currency: undefined,
    errorPricingToken: false
  };

  render() {
    const { currency, conversionRateFromBee, errorPricingToken } = this.state;
    const { booking } = this.props;
    const showBee = !!booking.host.walletAddress;
    const showEth = !!booking.host.walletAddress && APP_ENV !== AppEnv.PRODUCTION;
    const showBtc = booking.priceQuotes.some(({ currency }) => currency === Currency.BTC);
    // The 1.01 multiplier below accounts for fluctuating exchange rates etc.
    const fromBee = errorPricingToken ?
      (() => '--.--' ) :
      conversionRateFromBee ?
        ((value: number) => value * conversionRateFromBee * 1.01) :
        undefined;
    return (
      <SelectPaymentOptionContainer>
        <div className="select-payment-left">
          <div className="payment-options-container">
            <InputLabel htmlFor="paymentOptions">Select Method of Payment</InputLabel>
            <SelectBoxWrapper suffixSize="tiny">
              <select 
                id="paymentOptions"
                name="paymentOptions"
                value={currency}
                onChange={this.handleSelectedCurrencyOption}>
                <option value={undefined} disabled={currency !== undefined}>
                  Select Payment Type
                </option>
                {showBee && <option value={Currency.BEE}>BEE</option>}
                {showBee && <option value={Currency.DAI}>DAI</option>}
                {showEth && <option value={Currency.ETH}>ETH</option>}
                {showBtc && <option value={Currency.BTC}>BTC</option>}
                <option value={Currency.USD}>Credit Card</option>
              </select>
              <Svg className="suffix" src="utils/carat-down" />
            </SelectBoxWrapper>
          </div>
          <div>{currencyOptions(currency, booking, fromBee)}</div>
        </div>
        <AppConsumer>
          {({ screenType }: AppConsumerProps) =>
            screenType > ScreenType.TABLET && (
              <div className="select-payment-quote-desktop">
                <BookingQuote booking={booking} currency={currency || Currency.BEE} fromBee={fromBee} />
              </div>
            )
          }
        </AppConsumer>
      </SelectPaymentOptionContainer>
    );
  }

  handleSelectedCurrencyOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = event.target.value;
    this.setState({ currency, conversionRateFromBee: undefined });
    if (currency === Currency.DAI) {
      const web3 = loadWeb3();
      const beeQuote = this.props.booking.priceQuotes.find(q => q.currency === Currency.BEE);
      if (beeQuote) {
        const total = beeQuote.guestTotalAmount;
        priceWithToken(web3.eth, currency, total)
          .then(price => this.setState({ conversionRateFromBee: price / total }))
          .catch(() => this.setState({ errorPricingToken: true }));
      }
    }
  };
}

export default SelectPaymentOption;

function currencyOptions(currency: string | undefined, booking: Booking, fromBee?: (value: number) => (number | string)): React.ReactNode {
  switch (currency) {
    case Currency.BEE:
    case Currency.DAI:
    case Currency.ETH:
      return <BookingOptionsCrypto booking={booking} currency={currency} fromBee={fromBee} />;
    case Currency.USD:
      return <BookingOptionsUSD booking={booking} />;
    case Currency.BTC:
      return <BookingOptionsBTC booking={booking} />;
    default:
      return null;
  }
}

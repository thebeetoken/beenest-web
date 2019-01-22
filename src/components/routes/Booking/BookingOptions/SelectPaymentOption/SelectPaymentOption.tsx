import * as React from 'react';

import { Booking, Currency } from 'networking/bookings';

import SelectPaymentOptionContainer from './SelectPaymentOption.container';
import BookingOptionsUSD from '../BookingOptionsUSD';
import BookingQuote from '../../BookingQuote';
import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import BookingOptionsCrypto from '../BookingOptionsCrypto';

import InputLabel from 'shared/InputLabel';
import SelectBoxWrapper from 'shared/SelectBoxWrapper';
import Svg from 'shared/Svg';
import { AppEnv, APP_ENV } from 'configs/settings';

interface Props {
  booking: Booking;
}

interface State {
  currency: Currency | undefined;
}
class SelectPaymentOption extends React.Component<Props> {
  readonly state: State = {
    currency: undefined,
  };

  render() {
    const { currency } = this.state;
    const { booking } = this.props;
    const showBee = !!booking.host.walletAddress;
    const showEth = !!booking.host.walletAddress && APP_ENV !== AppEnv.PRODUCTION;
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
                {showEth && <option value={Currency.ETH}>ETH</option>}
                <option value={Currency.USD}>Credit Card</option>
              </select>
              <Svg className="suffix" src="utils/carat-down" />
            </SelectBoxWrapper>
          </div>
          <div>{currencyOptions(currency, booking)}</div>
        </div>
        <AppConsumer>
          {({ screenType }: AppConsumerProps) =>
            screenType > ScreenType.TABLET && (
              <div className="select-payment-quote-desktop">
                <BookingQuote booking={booking} currency={currency || Currency.BEE} />
              </div>
            )
          }
        </AppConsumer>
      </SelectPaymentOptionContainer>
    );
  }

  handleSelectedCurrencyOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ currency: event.target.value });
  };
}

export default SelectPaymentOption;

function currencyOptions(currency: string | undefined, booking: Booking): React.ReactNode {
  switch (currency) {
    case Currency.BEE:
      return <BookingOptionsCrypto booking={booking} currency={Currency.BEE} />;
    case Currency.ETH:
      return <BookingOptionsCrypto booking={booking} currency={Currency.ETH} />;
    case Currency.USD:
      return <BookingOptionsUSD booking={booking} />;
    default:
      return null;
  }
}

import * as React from 'react';

import { Booking, Currency } from 'networking/bookings';
import { Col, Fade, Row } from 'reactstrap';

import SelectPaymentOptionContainer from './SelectPaymentOption.container';
import BookingOptionsUSD from '../BookingOptionsUSD';
import BookingQuote from '../../BookingQuote';
import BookingOptionsCrypto from '../BookingOptionsCrypto';

import InputLabel from 'legacy/shared/InputLabel';
import SelectBoxWrapper from 'legacy/shared/SelectBoxWrapper';
import Svg from 'legacy/shared/Svg';
import { loadWeb3, priceWithEther, priceWithToken } from 'utils/web3';

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
    currency: Currency.USD,
    errorPricingToken: false
  };

  render() {
    const { currency, conversionRateFromBee, errorPricingToken } = this.state;
    const { booking } = this.props;
    const showBee = !!booking.host.walletAddress;
    // The 1.01 multiplier below accounts for fluctuating exchange rates etc.
    const fromBee = errorPricingToken ?
      (() => '--.--') :
      conversionRateFromBee ?
        ((value: number) => value * conversionRateFromBee * 1.01) :
        undefined;
    return (
      <Fade>
        <SelectPaymentOptionContainer className="container pb-8">
          <Row className="select-payment-left w-md-100 pb-8" noGutters>
            <Col md="12" lg="7" className="d-md-flex flex-column ">
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
                    <option value={Currency.USD}>Credit Card</option>
                  </select>
                  <Svg className="suffix" src="utils/carat-down" />
                </SelectBoxWrapper>
              </div>
              <div>{currencyOptions(currency, booking, fromBee)}</div>
            </Col>
          </Row>
          <div className="d-none d-lg-block select-payment-quote-desktop">
            <BookingQuote booking={booking} currency={currency || Currency.BEE} fromBee={fromBee} />
          </div>

        </SelectPaymentOptionContainer>
      </Fade>
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
    } else if (currency === Currency.ETH) {
      const web3 = loadWeb3();
      const beeQuote = this.props.booking.priceQuotes.find(q => q.currency === Currency.BEE);
      if (beeQuote) {
        const total = beeQuote.guestTotalAmount;
        priceWithEther(web3.eth, total)
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
      return <Fade><BookingOptionsCrypto booking={booking} currency={currency} fromBee={fromBee} /></Fade>;
    case Currency.USD:
      return <Fade><BookingOptionsUSD booking={booking} /></Fade>;
    default:
      return null;
  }
}

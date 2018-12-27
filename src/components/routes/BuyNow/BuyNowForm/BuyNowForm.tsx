import * as React from 'react';

import BuyNowFormContainer from './BuyNowForm.container';
import DetailsBar from '../DetailsBar';
import { PaymentOption } from '../BuyNowProcessor';

import { PaymentInfo } from 'networking/listings';
import { Currency } from 'networking/bookings';

import Divider from 'shared/Divider';
import InputLabel from 'shared/InputLabel';
import ListItem from 'shared/ListItem';
import Portal from 'shared/Portal';
import Svg from 'shared/Svg';
import CreatePaymentSourceModal from 'shared/Stripe/Modals/CreatePaymentSourceModal';
import { ToggleProvider, ToggleProviderRef } from 'shared/ToggleProvider';
import SelectBoxWrapper from 'components/shared/SelectBoxWrapper';

interface Props {
  options: PaymentOption[];
  paymentInfo: PaymentInfo;
  onSubmit: (option: PaymentOption) => void;
}

interface State {
  option?: PaymentOption;
}

class BuyNowForm extends React.Component<Props, State> {
  state: State = {};

  render() {
    const { options, paymentInfo } = this.props;
    const { option } = this.state;
    const showAddCard = !!option && option.currency === Currency.USD;
    const showMetaMaskPrompt = !!option && option.currency !== Currency.USD && option.placeholder;

    return (
      <BuyNowFormContainer>
        <header>
          <h2>Payment</h2>
          <Divider />
        </header>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <div className="select">
              <InputLabel className="label" htmlFor="select-payment">Select Method of Payment:</InputLabel>
              <SelectBoxWrapper>
                <select id="select-payment" name="select-payment" value={option && option.key} onChange={this.handleChange}>
                  <option>Select Payment Type</option>
                  {options.map(({ key, label }) => (
                    <option key={key} value={key}>{label}</option>
                    ))}
                </select>
                <Svg className="suffix" src="utils/carat-down" />
              </SelectBoxWrapper>
            </div>
            {showAddCard && <ToggleProvider>
              {({ show, toggle }: ToggleProviderRef) => (
                <>
                  <ListItem font="tiny" prefixColor="secondary" start="tiniest" textColor="secondary" onClick={toggle}>
                    <Svg className="prefix" src="utils/plus-circle" />
                    <span>Add new card</span>
                  </ListItem>
                  {show && (
                    <Portal color="up" opacity={0.9} onClick={toggle}>
                      <CreatePaymentSourceModal handleClose={toggle} />
                    </Portal>
                  )}
                </>
              )}
            </ToggleProvider>}
            {showMetaMaskPrompt && <p>
              Please log in to your wallet (e.g. MetaMask) and verify you have sufficient funds available.
            </p>}
          </div>
          <DetailsBar
            paymentInfo={paymentInfo}
            isDisabled={!option || !!option.placeholder} />
        </form>
      </BuyNowFormContainer>
    );
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value;
    const option = this.props.options.find(currentOption => currentOption.key === key);
    this.setState({ option });
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.option) {
      this.props.onSubmit(this.state.option);
    }
  }
}

export default BuyNowForm;

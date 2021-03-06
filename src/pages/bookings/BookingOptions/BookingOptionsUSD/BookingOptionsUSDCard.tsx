import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Booking, Currency } from 'networking/bookings';

import BookingOptionsUSDContainer from './BookingOptionsUSD.container';
import BookingOptionsBar from '../BookingOptionsBar';
import SelectPaymentButton from '../SelectPaymentButton';

import StripeWrapper from 'HOCs/StripeWrapper';
import Button from 'components/Button';
import ListItem from 'components/ListItem';
import Portal from 'components/Portal';
import SelectBoxWrapper from 'components/SelectBoxWrapper';
import CreatePaymentSourceModal from 'components/Stripe/Modals/CreatePaymentSourceModal';
import Svg from 'components/Svg';
import { ToggleProvider, ToggleProviderRef } from 'components/ToggleProvider';


interface Props extends RouterProps {
  booking: Booking;
  paymentSources: PaymentSource[];
}

interface State {
  paymentSourceId: string | undefined;
}

interface PaymentSource {
  id: string;
  stripeLast4: string;
}

class BookingOptionsUSDCard extends React.Component<Props, State> {
  readonly state = {
    paymentSourceId: this.props.paymentSources[this.props.paymentSources.length - 1] && this.props.paymentSources[this.props.paymentSources.length - 1].id,
  };

  // updates the selected credit card to the last element of the paymentSources array
  // if a new card is added at the beginning/middle, this will not select the newest card
  // also if the paymentSource length does not change but the array contents do (delete and add a card simultaneously), selection will not update.
  componentDidUpdate(prevProps: Props) {
    if (this.props.paymentSources.length !== prevProps.paymentSources.length) {
      this.setState({
        paymentSourceId: this.props.paymentSources[this.props.paymentSources.length - 1] && this.props.paymentSources[this.props.paymentSources.length - 1].id,
      })
    }
  }

  render() {
    const { paymentSourceId } = this.state;
    const { booking, paymentSources } = this.props;
    const isSelectButtonDisabled = !paymentSourceId;
    return (
      <BookingOptionsUSDContainer>
        <SelectBoxWrapper suffixSize="tiny">
          <select value={this.state.paymentSourceId} onChange={this.handleCardSelection}>
            <option value={undefined} disabled={paymentSourceId !== undefined}>
              Select Credit Card
            </option>
            {!!paymentSources.length &&
              paymentSources.map(({ id, stripeLast4 }: PaymentSource) => (
                <option key={id} id={id} value={id}>
                  Card ending in ...
                  {stripeLast4}
                </option>
              ))}
          </select>
          <Svg className="suffix" src="utils/carat-down" />
        </SelectBoxWrapper>
        <ToggleProvider>
          {({ show, toggle }: ToggleProviderRef) => (
            <>
              <ListItem onClick={toggle} prefixColor="secondary" start="tiny">
                <Svg className="prefix" src="utils/+-circle" />
                <span>Add a New Card</span>
              </ListItem>
              {show && (
                <Portal color="up" opacity={0.9} onClick={toggle}>
                  <StripeWrapper>
                    <CreatePaymentSourceModal handleClose={toggle} />
                  </StripeWrapper>
                </Portal>
              )}
            </>
          )}
        </ToggleProvider>

        <div className="d-lg-none booking-options-usd-bar">
          <BookingOptionsBar booking={booking} currency={Currency.USD} disabled={isSelectButtonDisabled} />
        </div>

        <div className="d-none d-lg-flex booking-options-button-container">
          <Button className="back-button" background="light" onClick={this.goBack}>
            Back
          </Button>
          <SelectPaymentButton
            booking={booking}
            disabled={isSelectButtonDisabled}
            currency={Currency.USD}
            onSuccess={this.handleSuccessPaymentOption}
            paymentSourceId={paymentSourceId}
          />
        </div>

      </BookingOptionsUSDContainer>
    );
  }

  handleCardSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ paymentSourceId: event.target.value });
  };

  goBack = () => this.props.history.push(`/listings/${this.props.booking.listingId}`);
  handleSuccessPaymentOption = () => this.props.history.push(`/bookings/${this.props.booking.id}/payment`);
}

export default withRouter(BookingOptionsUSDCard);

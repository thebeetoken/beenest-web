import * as React from 'react';

import CreatePaymentSourceModal from 'legacy/shared/Stripe/Modals/CreatePaymentSourceModal';
import PaymentSourcesContainer from './PaymentSources.container';
import PaymentSourcesRow from './PaymentSourcesRow';

import { PaymentSource } from 'networking/paymentSources';
import ListItem from 'legacy/shared/ListItem';
import Portal from 'legacy/shared/Portal';
import Svg from 'legacy/shared/Svg';

class PaymentSources extends React.Component<any, any> {
  readonly state: any = {
    isNewPaymentSourceShown: false,
  };

  render() {
    const { paymentSources } = this.props;
    const { isNewPaymentSourceShown } = this.state;
    const renderPaymentSources = paymentSources.map((paymentSource: PaymentSource) => (
      <PaymentSourcesRow key={paymentSource.id} paymentSource={paymentSource} />
    ));
    return (
      <PaymentSourcesContainer>
        <section>
          <h1>Credit Cards:</h1>
          <div>
            <div className="payment-sources-list">{renderPaymentSources}</div>
            <ListItem font="tiny" prefixColor="secondary" start="tiniest" textColor="secondary" onClick={this.toggleNewCardForm}>
              <Svg className="prefix" src="utils/plus-circle" />
              <span>Add new card</span>
            </ListItem>
          </div>
          {isNewPaymentSourceShown && (
            <Portal color="up" opacity={0.9} onClick={this.toggleNewCardForm}>
              <CreatePaymentSourceModal handleClose={this.toggleNewCardForm} />
            </Portal>
          )}
        </section>
      </PaymentSourcesContainer>
    );
  }

  toggleNewCardForm = () => {
    this.setState({
      isNewPaymentSourceShown: !this.state.isNewPaymentSourceShown
    });
  }
}

export default PaymentSources;

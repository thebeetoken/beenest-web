/**
 * The UpdatePaymentSource is being hidden from the user for the time being.
 *
 * Stripe only allows the billing address and card expiration date to be updated. (https://stripe.com/docs/api#update_card)
 *
 * We don't need the billing address (we don't collect when adding a payment source card),
 * and having an update form just for the expiration date is unnecessary, so we are
 * commenting out the update form for now. If a user needs to change their payment
 * information, they'll have to delete their current card on file and add a new card.
 * If we decide we do want/need the billing address, all we do is uncomment the update logic.
 */

import * as React from 'react';

// import UpdatePaymentSourceModal from 'legacy/shared/Stripe/Modals/UpdatePaymentSourceModal';
import DeletePaymentSourceModal from 'legacy/shared/Stripe/Modals/DeletePaymentSourceModal';

import Portal from 'legacy/shared/Portal';
import Svg from 'legacy/shared/Svg';
import { PaymentSource } from 'networking/paymentSources';

interface Props {
  paymentSource: PaymentSource;
}

class PaymentSourcesRow extends React.Component<Props> {
  readonly state = {
    // showUpdatePaymentSource: false,
    showDeletePaymentSource: false,
  };

  render() {
    const { paymentSource } = this.props;
    const { showDeletePaymentSource } = this.state;
    return (
      <div className="payment-sources--row">
        <div className="info">
          <h2>{paymentSource.stripeBrand}</h2>
          <h2>&nbsp;(...{paymentSource.stripeLast4})</h2>
        </div>
        <div className="payment-actions">
          {/* <div className="payment-action" onClick={this.toggleEditForm}>
            <Svg src="decorative/pencil" />
          </div> */}
          {/* <div className="payment-actions--divider"></div> */}
          <div className="payment-action" onClick={this.toggleDeleteForm}>
            <Svg src="decorative/trash" />
          </div>
        </div>
        {/* {showUpdatePaymentSource && (
          <Portal color="up" opacity={0.9} onClick={this.toggleEditForm}>
            <UpdatePaymentSourceModal
              handleClose={this.toggleEditForm}
              paymentSource={paymentSource} />
          </Portal>
        )} */}
        {showDeletePaymentSource && (
          <Portal color="up" opacity={0.9} onClick={this.toggleDeleteForm}>
            <DeletePaymentSourceModal handleClose={this.toggleDeleteForm} paymentSource={paymentSource} />
          </Portal>
        )}
      </div>
    );
  }

  // toggleEditForm = () => {
  //   this.setState({
  //     showUpdatePaymentSource: !this.state.showUpdatePaymentSource
  //   });
  // }

  toggleDeleteForm = () => {
    this.setState({
      showDeletePaymentSource: !this.state.showDeletePaymentSource
    });
  }
}

export default PaymentSourcesRow;

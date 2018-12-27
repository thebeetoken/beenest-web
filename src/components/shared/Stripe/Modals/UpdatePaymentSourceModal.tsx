import * as React from 'react';

import PaymentSourceModalContainer from './PaymentSourceModal.container';

import Svg from 'shared/Svg';
import UpdatePaymentSourceForm from 'shared/Stripe/UpdatePaymentSourceForm';
import { PaymentSource } from 'networking/paymentSources';

interface Props {
  paymentSource: PaymentSource;
  handleClose: () => void;
}

const UpdatePaymentSourceModal = ({ paymentSource, handleClose }: Props) => (
  <PaymentSourceModalContainer>
    <section className="payment-source-modal-content update">
      <div className="close" onClick={handleClose}>
        <Svg className="icon" src="utils/x" />
      </div>
      <h1>Update Credit Card Info</h1>
      <UpdatePaymentSourceForm
        onClose={handleClose}
        paymentSource={paymentSource} />
    </section>
  </PaymentSourceModalContainer>
);

export default UpdatePaymentSourceModal;

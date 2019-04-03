import * as React from 'react';

import PaymentSourceModalContainer from './PaymentSourceModal.container';

import CloseButton from 'components/CloseButton';
import StripeWrapper from 'HOCs/StripeWrapper';
import CreatePaymentSourceForm from 'components/Stripe/CreatePaymentSourceForm';

interface Props {
  handleClose: () => void;
}

const CreatePaymentSourceModal = ({ handleClose }: Props) => (
  <PaymentSourceModalContainer>
    <section className="payment-source-modal-content">
      <div className="close" onClick={handleClose}>
        <CloseButton onClose={handleClose}/>
      </div>
      <h1>Add New Card</h1>
      <StripeWrapper>
        <CreatePaymentSourceForm onClose={handleClose} />
      </StripeWrapper>
    </section>
  </PaymentSourceModalContainer>
);

export default CreatePaymentSourceModal;

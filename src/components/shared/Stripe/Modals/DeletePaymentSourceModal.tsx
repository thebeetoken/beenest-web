import * as React from 'react';
import { compose, graphql } from 'react-apollo';

import PaymentSourceModalContainer from './PaymentSourceModal.container';

import { DELETE_PAYMENT_SOURCE, GET_PAYMENT_SOURCES, PaymentSource } from 'networking/paymentSources';
import CloseButton from 'legacy/shared/CloseButton';
import Button from 'legacy/shared/Button';
import Divider from 'legacy/shared/Divider';

interface Props {
  paymentSource: PaymentSource;
  deletePaymentSource: (paymentSourceId: string) => void;
  handleClose: () => void;
}

const DeletePaymentSourceModal = ({ deletePaymentSource, paymentSource, handleClose }: Props) => {
  const handleDelete = () => deletePaymentSource(paymentSource.id);
  return (
    <PaymentSourceModalContainer>
      <section className="payment-source-modal-content">
        <CloseButton onClose={handleClose}/>
        <h1>Delete Card</h1>
        <div>
          <p>
            Are you sure you want to remove the card shown?
          </p>
          <h5>
            {paymentSource.stripeBrand} XXXX-XXXX-XXXX-{paymentSource.stripeLast4}
          </h5>
        </div>
        <div className="bottom">
          <Divider />
          <div className="row delete-actions">
            <Button type="button" className="cancel" background="light" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="button" className="submit" background="style" onClick={handleDelete}>
              Delete Card
            </Button>
          </div>
        </div>
      </section>
    </PaymentSourceModalContainer>
  );
};

export default compose(
  graphql(DELETE_PAYMENT_SOURCE, {
    props: ({ mutate }: any) => ({
      deletePaymentSource: (paymentSourceId: string): Promise<any> => {
        return mutate({
          variables: { paymentSourceId },
          refetchQueries: [{ query: GET_PAYMENT_SOURCES }],
          update: (store: any, { data: { deletePaymentSource } }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.getPaymentSources) {
              return;
            }

            const { getPaymentSources } = store.readQuery({ query: GET_PAYMENT_SOURCES });
            const paymentSources = getPaymentSources.filter((paymentSource: PaymentSource) => paymentSource.id !== deletePaymentSource.id);
            store.writeQuery({ query: GET_PAYMENT_SOURCES,
              data: {
                getPaymentSources: paymentSources
              }
            });
          }
        });
      }
    })
  })
)(DeletePaymentSourceModal);

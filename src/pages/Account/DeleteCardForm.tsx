import * as React from 'react';
import { compose, graphql } from 'react-apollo';

import { DELETE_PAYMENT_SOURCE, GET_PAYMENT_SOURCES, PaymentSource } from 'networking/paymentSources';
import { Button, Row, Col } from 'reactstrap';
import { AlertProperties } from 'components/work/Alert/Alert';

interface Props {
  paymentSource: PaymentSource;
  deletePaymentSource: (paymentSourceId: string) => Promise<any>;
  handleModal: () => void;
  setAlert: (alert: AlertProperties) => void;
}

const DeleteCardForm = ({ deletePaymentSource, handleModal, paymentSource, setAlert }: Props) => {
  const handleDelete = () => {
    return deletePaymentSource(paymentSource.id)
      .then(() => {
        handleModal();
        setAlert({
          color: 'success',
          msg: `Your card ${paymentSource.stripeBrand} ending in ${paymentSource.stripeLast4} has been deleted.`,
          show: true,
        });
      })
      .catch((error: any) =>
        setAlert({
          color: 'danger',
          msg: 'Oops! Something went wrong:\n\n' + error,
          show: true,
        })
      );
  }

  return (
    <>
      <p>
        Are you sure you want to remove the card shown?
      </p>
      <p>
        {paymentSource.stripeBrand} XXXX-XXXX-XXXX-{paymentSource.stripeLast4}
      </p>
      <hr />

      <Row>
        <Col className="text-right">
          <Button color="secondary" onClick={() => handleModal()}>Cancel</Button>{' '}
          <Button color="primary" onClick={() => handleDelete()}>Delete Card</Button>
        </Col>
      </Row>
    </>
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
)(DeleteCardForm);

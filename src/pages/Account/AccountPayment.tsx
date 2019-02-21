import * as React from 'react';
import { ListGroup, ListGroupItem, Row, Col, Modal, ModalHeader, ModalBody, Alert, Button, UncontrolledAlert } from 'reactstrap';
import { Query } from 'react-apollo';
import { GET_PAYMENT_SOURCES, PaymentSource } from 'networking/paymentSources';
import { CreditBalance } from 'networking/users';

import AudioLoading from 'shared/loading/AudioLoading';

import NewCardForm from './NewCardForm';
import DeleteCardForm from './DeleteCardForm';
import { AlertProperties } from 'components/work/Alert/Alert';

interface Props extends RouterProps {
  creditBalance: CreditBalance;
}

enum ModalType {
  ADD_NEW_CARD = 'ADD_NEW_CARD',
  DELETE_CARD = 'DELETE_CARD',
}

const AccountPayment = ({ creditBalance }: Props) => {
  const [modal, setModal] = React.useState<ModalType | undefined>(undefined);
  const [alert, setAlert] = React.useState<AlertProperties>({ msg: '', color: '', show: false });
  const [paymentSource, setPaymentSource] = React.useState<PaymentSource | undefined>(undefined);
  
  return (
    <Query query={GET_PAYMENT_SOURCES}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AudioLoading height={48} width={96} />;
        }
        if (error || !data) {
          return (
            <UncontrolledAlert color="danger">
              {error ? error.message : 'Error / No Data'}
            </UncontrolledAlert>
          )
        }
        const paymentSources = data.getPaymentSources;
        const renderPaymentSources = paymentSources.map((paymentSource: PaymentSource) => (
          <ListGroupItem
            className="w-100 d-flex justify-content-between align-items-center"
            id={paymentSource.id}
            key={paymentSource.id}>
            <h6 className="mb-0">
              {paymentSource.stripeBrand}&nbsp;(...{paymentSource.stripeLast4})
            </h6>
            <Button
              className="btn-icon btn-light"
              onClick={() => handleModalAction(ModalType.DELETE_CARD, paymentSource)}>
              <span className="fas fa-trash-alt btn-icon__inner"></span>
            </Button>
          </ListGroupItem>
        ));

        return (
          <section>
            <Alert color={alert.color} isOpen={!!alert.show} toggle={() => setAlert({ ...alert, show: !alert.show })}>{alert.msg}</Alert>

            <Row>
              <Col xs="12">
                <p>Credit Balance: {creditBalance.amountUsd}</p>
              </Col>
            </Row>
            <h4>Credit Cards:</h4>
            <ListGroup className="mb-2 d-flex flex-column">{renderPaymentSources}</ListGroup>

            <Row>
              <Col xs="12">
                <Button
                  color="primary"
                  onClick={() => handleModalAction(ModalType.ADD_NEW_CARD)}>
                  <span className="fas fa-plus-circle pull-left mr-2"></span>
                  Add New Card
                </Button>
              </Col>
            </Row>

            {modal === ModalType.ADD_NEW_CARD &&
              <Modal isOpen toggle={handleModalAction}>
                <ModalHeader>Add New Card</ModalHeader>
                <ModalBody>
                  <NewCardForm handleModalAction={handleModalAction} setAlert={setAlert} />
                </ModalBody>
              </Modal>
            }

            {modal === ModalType.DELETE_CARD &&
              <Modal isOpen toggle={handleModalAction}>
                <ModalHeader>Delete Card</ModalHeader>
                <ModalBody>
                  <DeleteCardForm handleModalAction={handleModalAction} paymentSource={paymentSource} setAlert={setAlert} />
                </ModalBody>
              </Modal>
            }
          </section>
        );
      }}
    </Query>
  );

  function handleModalAction(modal?: ModalType, paymentSource?: PaymentSource) {
    setModal(modal);
    setPaymentSource(paymentSource);
  }
};

export default AccountPayment;

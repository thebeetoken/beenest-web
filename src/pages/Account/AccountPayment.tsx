import * as React from 'react';
import { ListGroup, ListGroupItem, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Query } from 'react-apollo';
import { GET_PAYMENT_SOURCES, PaymentSource } from 'networking/paymentSources';
import AudioLoading from 'shared/loading/AudioLoading';
import { CreditBalance } from 'networking/users';

interface Props extends RouterProps {
  creditBalance: CreditBalance;
}

type ModalType = 'ADD_NEW_CARD' | 'DELETE_CARD' | '';

const AccountPayment = ({ creditBalance }: Props) => {
  const [modal, setModal] = React.useState<ModalType>('');

  return (
    <Query query={GET_PAYMENT_SOURCES}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AudioLoading height={48} width={96} />;
        }
        if (error || !data) {
          return <h4>{error ? error.message : 'Error / No Data'}</h4>;
        }
        const paymentSources = data.getPaymentSources;
        const renderPaymentSources = paymentSources.map((paymentSource: PaymentSource) => (
          <ListGroupItem key={paymentSource.id} className="w-100 d-flex justify-content-between align-items-center">
            <h6 className="mb-0">{paymentSource.stripeBrand}&nbsp;(...{paymentSource.stripeLast4})</h6>
            <i onClick={() => handleModal('DELETE_CARD')} className="fas fa-trash-alt" />
          </ListGroupItem>
        ));
        
        return (
          <section>
            <Row>
              <Col xs="12">
                <p>Credit Balance: {creditBalance.amountUsd}</p>
              </Col>
            </Row>
            <h4>Credit Cards:</h4>
            <ListGroup className="mb-2 d-flex flex-column">
              {renderPaymentSources}
            </ListGroup>
            
            <Row>
              <Col xs="12">
                <div onClick={() => handleModal('ADD_NEW_CARD')} className="w-auto d-inline-block align-items-center">
                  <i className="fas fa-plus-circle" />
                  <h6 className="ml-2 mb-0 d-inline-block">Add New Card</h6>
                </div>
              </Col>
            </Row>

            <Modal isOpen={modal === 'ADD_NEW_CARD'} toggle={() => handleModal('ADD_NEW_CARD')}>
              <ModalHeader toggle={handleModal}>Add New Card</ModalHeader>
              <ModalBody>
                <NewCardForm />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => handleModal()}>Cancel</Button>{' '}
                <Button color="primary" onClick={() => handleModal()}>Add Card</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={modal === 'DELETE_CARD'} toggle={handleModal}>
              <ModalHeader toggle={handleModal}>Delete Card</ModalHeader>
              <ModalBody>
                Delete Card Form Goes Here
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => handleModal()}>Cancel</Button>{' '}
                <Button color="primary" onClick={() => handleModal()}>Delete Card</Button>
              </ModalFooter>
            </Modal>
          </section>
        );
      }}
    </Query>
  );

  function handleModal(modal: ModalType = '') {
    setModal(modal);
  }
}

export default AccountPayment;

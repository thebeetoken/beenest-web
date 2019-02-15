import * as React from 'react';
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import { Query } from 'react-apollo';
import { GET_PAYMENT_SOURCES, PaymentSource } from 'networking/paymentSources';
import AudioLoading from 'shared/loading/AudioLoading';
import { CreditBalance } from 'networking/users';

interface Props extends RouterProps {
  creditBalance: CreditBalance;
}

const AccountPayment = ({ creditBalance }: Props) => {
  console.log('creditBalance:', creditBalance);
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
            <i className="fas fa-trash-alt" />
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
              <Col xs="12" className="d-flex align-items-center">
                <i className="fas fa-plus-circle" />
                <h6 className="ml-1 mb-0">Add New Card</h6>
              </Col>
            </Row>
          </section>
        );
      }}
    </Query>
  );
}

export default AccountPayment;

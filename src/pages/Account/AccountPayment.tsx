import * as React from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { Query } from 'react-apollo';
import { GET_PAYMENT_SOURCES, GET_CREDIT_BALANCE, PaymentSource } from 'networking/paymentSources';
import AudioLoading from 'shared/loading/AudioLoading';

class AccountPayment extends React.Component<any> {
  render() {
    return (
      <Container>
        <Query query={GET_CREDIT_BALANCE}>
          {({ loading, error, data }) => {
            if (loading) {
              return <AudioLoading height={48} width={96} />;
            }
            if (error || !data) {
              return <h4>{error ? error.message : 'Error / No Data'}</h4>;
            }
            const { creditBalance } = data;
            return (
              <div>
                <h4>Credit Balance:</h4>
                <p>{creditBalance.amountUsd} USD</p>
              </div>
            );
          }}
        </Query>
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
              <ListGroupItem key={paymentSource.id}>
                {/* {JSON.stringify(paymentSource)} */}
                <h2>{paymentSource.stripeBrand}</h2>
                <h2>&nbsp;(...{paymentSource.stripeLast4})</h2>
              </ListGroupItem>
            ));
            return (
              <section>
                <h4>Credit Cards:</h4>
                <ListGroup>
                  {renderPaymentSources}
                </ListGroup>
              </section>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default AccountPayment;

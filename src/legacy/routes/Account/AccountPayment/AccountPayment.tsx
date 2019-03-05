import * as React from 'react';
import { Query } from 'react-apollo';

import AccountPaymentContainer from './AccountPayment.container';
import PaymentSources from './PaymentSources';

import { GET_PAYMENT_SOURCES } from 'networking/paymentSources';
import { CreditBalance } from 'networking/users';
import AudioLoading from 'legacy/shared/loading/AudioLoading';

interface Props {
  creditBalance: CreditBalance;
}

const AccountPayment = ({ creditBalance }: Props) => (
  <AccountPaymentContainer>
    <Query query={GET_PAYMENT_SOURCES}>
      {({ loading, error, data }) => {
        if (loading) {
          return <AudioLoading height={48} width={96} />;
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }
        const paymentSources = data.getPaymentSources;
        return (
          <>
            <div className="credit-balance-container">
              <h1>Credit Balance:</h1>
              <p>{creditBalance.amountUsd} USD</p>
            </div>
            <PaymentSources paymentSources={paymentSources} />
          </>
        );
      }}
    </Query>
  </AccountPaymentContainer>
);

export default AccountPayment;

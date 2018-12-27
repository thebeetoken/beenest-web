import * as React from 'react';
import { Query } from 'react-apollo';
import { GET_PAYMENT_INFO } from 'networking/listings';

import BuyNowContainer from './BuyNow.container';
import BuyNowPayment from './BuyNowPayment';
import AudioLoading from 'shared/loading/AudioLoading';

const BuyNow = (props: RouterProps) => {
  const { match } = props;
  const { id } = match.params;
  return (
    <BuyNowContainer className="conference-payment">
      <Query query={GET_PAYMENT_INFO} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <AudioLoading height={48} width={96} />;
          }
          if (error || !data) {
            return <h1>{error ? error.message : 'Error / No Data'}</h1>;
          }
          return <BuyNowPayment paymentInfo={data.paymentInfo} {...props} />;
        }}
      </Query>
    </BuyNowContainer>
  );
};

export default BuyNow;

import * as React from 'react';
import { Query } from 'react-apollo';

import BuyNowReceiptContainer from './BuyNowReceipt.container';
import DetailsReceiptBar from '../DetailsBar/DetailsReceiptBar';

import { GET_BOOKING } from 'networking/bookings';
import AudioLoading from 'shared/loading/AudioLoading';
import BeeLink from 'shared/BeeLink';
import Divider from 'shared/Divider';


const BuyNowReceipt = (props: RouterProps) => {
  const { match } = props;
  const { id } = match.params;
  return (
    <BuyNowReceiptContainer className="conference-payment">
      <Query query={GET_BOOKING} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <AudioLoading />;
          }
          if (error || !data) {
            return <h1>{error ? error.message : 'Error / No Data'}</h1>;
          }
          const { booking } = data;
          return (
            <div className="buy-now-receipt--wrapper">
              <div className="buy-now-receipt--content">
                <header>
                  <h2>Payment</h2>
                  <Divider/>
                </header>
                <h3>Payment confirmed.</h3>
                <p>Thank you for your booking. We have sent a confirmation via e-mail.</p>
                <p>Please contact us at <BeeLink href="mailto:support@beetoken.com">support@beetoken.com</BeeLink> if you have any questions.</p>
                <dl>
                  <dt>Total Paid:</dt>
                  <dd>
                    {booking.guestTotalAmount} {booking.currency}
                  </dd>
                </dl>
                <dl className="transaction-container">
                  <dt>Transaction Confirmation</dt>
                  <dd>{booking.id}</dd>
                </dl>
              </div>
              <footer>
                <DetailsReceiptBar/>
              </footer>
            </div>
          );
        }}
      </Query>
    </BuyNowReceiptContainer>
  );
};

export default BuyNowReceipt;

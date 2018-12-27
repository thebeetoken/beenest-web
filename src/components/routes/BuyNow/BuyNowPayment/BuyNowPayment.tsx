import { Web3Provider, Web3Consumer } from 'HOCs/Web3Provider';
import { BUY_NOW, BuyNowInput } from 'networking/bookings';
import { PaymentInfo } from 'networking/listings';
import { GET_PAYMENT_SOURCES, PaymentSource } from 'networking/paymentSources';
import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import { Web3Data, loadWeb3 } from 'utils/web3';

import BuyNowContainer from './BuyNowPayment.container';
import BuyNowForm from '../BuyNowForm';
import BuyNowQuote from '../BuyNowQuote';
import { PaymentOption, BuyNowProcessor } from '../BuyNowProcessor';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import AudioLoading from 'shared/loading/AudioLoading';

interface Props extends RouterProps {
  data: {
    getPaymentSources: PaymentSource[];
    loading: boolean;
    error: Error;
  };
  mutate: (options: { variables: { input: BuyNowInput } }) => Promise<any>;
  paymentInfo: PaymentInfo;
}

interface State {
  processingPayment: boolean;
  option?: string;
}

class BuyNowPayment extends React.Component<Props, State> {
  readonly state: State = { processingPayment: false };
  readonly web3 = loadWeb3();
  readonly processor = new BuyNowProcessor(this.props.paymentInfo, this.web3);

  render() {
    const { error, loading } = this.props.data;
    if (loading || this.state.processingPayment) {
      return <AudioLoading />;
    }
    if (error) {
      return <h1>{error ? error.message : 'Error / No Data'}</h1>;
    }
    return (
      <Web3Provider>
        <Web3Consumer>
          {(web3Data: Web3Data) => {
            const paymentSources = this.props.data.getPaymentSources;
            const options = this.processor.options(paymentSources, web3Data);
            const { paymentInfo } = this.props;
            return (
              <BuyNowContainer>
                <div className="buy-now-payment--row">
                  <BuyNowForm paymentInfo={paymentInfo} options={options} onSubmit={this.handleSubmit} />
                  <AppConsumer>
                    {({ screenType }: AppConsumerProps) => {
                      if (screenType > ScreenType.TABLET) {
                        return (
                          <BuyNowQuote paymentInfo={paymentInfo} />
                        );
                      }
                      return <></>;
                    }}
                  </AppConsumer>
                </div>
              </BuyNowContainer>
            );
          }}
        </Web3Consumer>
      </Web3Provider>
    );
  }

  handleSubmit = (option: PaymentOption) => {
    const { mutate, history } = this.props;
    this.setState({ processingPayment: true });
    this.processor
      .process(option)
      .then((input: BuyNowInput) => mutate({ variables: { input } }))
      .then(({ data }) => history.push(`/bookings/${data.buyNow.id}/buy/receipt`))
      .catch(error => {
        alert('There is an issue with your booking. Please contact us as support@beetoken.com!');
        console.error(error);
        history.push('/');
      });
  };
}

export default compose(
  graphql(GET_PAYMENT_SOURCES),
  graphql(BUY_NOW)
)(BuyNowPayment);

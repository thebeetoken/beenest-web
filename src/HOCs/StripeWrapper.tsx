import * as React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { SETTINGS } from 'configs/settings';
const { STRIPE_CLIENT_KEY } = SETTINGS;

interface Props {
  children: React.ReactNode;
}

interface State {
  stripe: Window['Stripe'] | null;
}

class StripeWrapper extends React.Component<Props, State> {
  readonly state: State = { stripe: null };

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(STRIPE_CLIENT_KEY)
      });
    } else {
      const stripeElement = document.querySelector("#stripe-js");
      if (stripeElement) {
        stripeElement.addEventListener("load", () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({
            stripe: window.Stripe(STRIPE_CLIENT_KEY)
          });
        });
      }
    }
  }

  render() {
    return (
      <StripeProvider apiKey={STRIPE_CLIENT_KEY}>
        <Elements>
          {this.props.children}
        </Elements>
      </StripeProvider>
    );
  }
}

export default StripeWrapper;

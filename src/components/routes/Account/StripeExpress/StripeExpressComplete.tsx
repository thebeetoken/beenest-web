import * as React from 'react';

import { parseQueryString } from 'utils/queryParams';
import { SETTINGS } from 'configs/settings';
const { BEENEST_HOST_API } = SETTINGS;

import StripeExpressCompleteContainer from './StripeExpressComplete.container';

import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import GeneralWrapper from 'shared/GeneralWrapper';

interface State {
  isSubmitting: boolean;
  completed: boolean;
  hasError: boolean;
  errorMessage: string;
}

interface QueryParams {
  code?: string;
}

/**
 * The user would come to this page via StripeExpressNew which sends the redirect to setup stripe account.
 * see https://stripe.com/docs/connect/express-accounts for workflow
 **/
export class StripeExpressComplete extends React.Component<RouterProps> {
  readonly state: State = {
    isSubmitting: true,
    completed: false,
    hasError: false,
    errorMessage: ''
  };

  componentDidMount() {
    const queryParams: QueryParams = parseQueryString(this.props.location.search);
    const { code } = queryParams;
    if (!code) {
      alert('Error, no code defined.');
      return;
    }

    const data = { code };
    const url = `${BEENEST_HOST_API}/beenest/v2/stripe_express_accounts`;

    fetch(url, {
       method: 'POST',
       body: JSON.stringify(data),
       headers:{ 'Content-Type': 'application/json' }
     })
      .then(response => {
        return Promise.all([response, response.json()]);
      })
      .then(([response, json]) => {
        if (response.status !== 200) {
          throw new Error(json.msg || 'Internal Server Error');
        }
        this.setState({ hasError: false, completed: true });
      })
      .catch(error => {
        this.setState({ hasError: true, errorMessage: error.message });
        console.error('Error:', error);
      });
  }

  render() {
    const { hasError } = this.state;

    const renderBody = !hasError ?
          <>
            <h1 >You are all set and ready to get paid!</h1>
            <p >
              For any Stripe account changes or updates please follow the email confirmation link to access your Stripe account.
            </p>

            <BeeLink to="/">
              <Button>Finished!</Button>
            </BeeLink>
          </>
          :
          <>
            <h1 >There was an error.</h1>
            <p>{this.state.errorMessage}</p>
            <p>
              There was an error processing your information. Please restart the sign up process by clicking the link from your email. 
            </p>
            <p>
              <BeeLink href="mailto:support@beetoken.com">
                <Button>Contact us for further help.</Button>
              </BeeLink>
            </p>
          </>;

    return (
      <StripeExpressCompleteContainer>
        <GeneralWrapper width={976}>
          <div className="complete">
            {renderBody}
          </div>
        </GeneralWrapper>
      </StripeExpressCompleteContainer>
    );
  }
};


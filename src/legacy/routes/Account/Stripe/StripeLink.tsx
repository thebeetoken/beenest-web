import * as React from 'react';
import LoadingTakeover from 'legacy/shared/loading/LoadingTakeover';

import { SETTINGS } from 'configs/settings';

const { BEENEST_HOST, STRIPE_CLIENT_ID } = SETTINGS;

const REDIRECT_URL = `${BEENEST_HOST}/account/stripe/complete`;
const STRIPE_REDIRECT = `https://connect.stripe.com/oauth/authorize?redirect_uri=${REDIRECT_URL}&response_type=code&client_id=${STRIPE_CLIENT_ID}&scope=read_write`;

/**
 * Used as a friendly redirect url on our domains to setup stripe express account for hosts.
 * Ie, via emails.
 * see https://stripe.com/docs/connect/standard-accounts#integrating-oauth for workflow
 **/
export const StripeLink = () => {
  window.location.assign(STRIPE_REDIRECT);
  return <LoadingTakeover />;
};


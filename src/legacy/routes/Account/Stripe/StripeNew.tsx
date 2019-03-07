import * as React from 'react';
import AudioLoading from 'legacy/shared/loading/AudioLoading';

import { SETTINGS } from 'configs/settings';
const { BEENEST_HOST, STRIPE_CLIENT_ID } = SETTINGS;

const REDIRECT_URL = `${BEENEST_HOST}/account/stripe/complete`;
const STRIPE_REDIRECT = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${REDIRECT_URL}&client_id=${STRIPE_CLIENT_ID}`;

/**
 * This can be used as a link for other components needing the raw
 * access to the url.
 **/
export const getStripeRedirectUrl = () => {
  return STRIPE_REDIRECT;
}

/**
 * Used as a friendly redirect url on our domains to setup stripe express account for hosts.
 * Ie, via emails.
 * see https://stripe.com/docs/connect/express-accounts for workflow
 **/
export const StripeNew = () => {
  window.location.assign(getStripeRedirectUrl());
  return <AudioLoading height={150} width={150} />;
};


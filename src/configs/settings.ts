/**
 * Script deconstructs and exports the injected
 * node environment variables APP_ENV, SETTINGS
 *
 * @author @tommy, @andy, @kevin
 **/

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export enum AppEnv {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TESTNET = 'testnet',
}

interface Setting {
  BEENEST_HOST: string;
  BEENEST_HOST_API: string;
  BEETOKEN_ADDRESS: string;
  BEETOKEN_PAYMENT_ADDRESS: string;
  FACEBOOK_APP_ID: string;
  FIREBASE_CONFIG: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    messagingSenderId: string;
    projectId: string;
    storageBucket: string;
  };
  GOOGLE_MAPS_KEY: string;
  STRIPE_CLIENT_KEY: string;
  STRIPE_CLIENT_ID: string;
  SENTRY_CLIENT_DSN: string;
  ERC20_ADDRESSES: { [key: string]: string; };
  UNIPAY_ADDRESS: string;
}

declare const process: {
  env: {
    readonly NODE_ENV: NodeEnv;
    readonly APP_ENV: AppEnv;
    readonly SETTINGS: Setting;
  };
};

export const { APP_ENV, SETTINGS } = process.env;

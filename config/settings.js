/**
 * This script contains settings api,
 * that will be injected to the node environment.
 *
 * development/testnet are on ROPSTEN
 *
 * @author @andy
 **/

module.exports = {
  development: {
    BEENEST_HOST: 'http://localhost:4200',
    BEENEST_HOST_API: 'http://localhost:3000',
    BEETOKEN_ADDRESS: '0x7fffac23d59d287560dfeca7680b5393426cf503',
    BEETOKEN_PAYMENT_ADDRESS: '0x3a5ad6a52582c18dad0a7d300f3a2beac3e762e4',
    FIREBASE_CONFIG: {
      apiKey: 'AIzaSyBVVBElrARlNDNLeTAHYuD6dvvAIXdU93E',
      authDomain: 'the-bee-token-firebae-dev.firebaseapp.com',
      databaseURL: 'https://the-bee-token-firebae-dev.firebaseio.com',
      messagingSenderId: '669922704471',
      projectId: 'the-bee-token-firebae-dev',
      storageBucket: 'the-bee-token-firebae-dev.appspot.com',
    },
    GOOGLE_MAPS_KEY: 'AIzaSyB7DfwQwnhYjPzx8UIF0JHlgVeNwSDnZkY',
    STRIPE_CLIENT_KEY: 'pk_test_7GNkTJHiPbROv4gPDuQNvThc',
    STRIPE_CLIENT_ID: 'ca_CmC1grl4bBfjYWWwKg548UPazsb6USUW',
    SENTRY_CLIENT_DSN: 'https://ee59845fce1746e4a2d6d664fd7a441b@sentry.io/1193097',
    ERC20_ADDRESSES: {
      DAI: '0x909E4dbdef114c9B39078Df314177780b89d8062'
    },
    UNIPAY_ADDRESS: '0xd660c8a75cf57d8314857ee5e92df58e28b2a3e0'
  },
  testnet: {
    BEENEST_HOST: 'https://testnet.beenest.io',
    BEENEST_HOST_API: 'https://api-testnet.beetoken.com',
    BEETOKEN_ADDRESS: '0x7fffac23d59d287560dfeca7680b5393426cf503',
    BEETOKEN_PAYMENT_ADDRESS: '0x3a5ad6a52582c18dad0a7d300f3a2beac3e762e4',
    FIREBASE_CONFIG: {
      apiKey: 'AIzaSyBVVBElrARlNDNLeTAHYuD6dvvAIXdU93E',
      authDomain: 'the-bee-token-firebae-dev.firebaseapp.com',
      databaseURL: 'https://the-bee-token-firebae-dev.firebaseio.com',
      messagingSenderId: '669922704471',
      projectId: 'the-bee-token-firebae-dev',
      storageBucket: 'the-bee-token-firebae-dev.appspot.com',
    },
    GOOGLE_MAPS_KEY: 'AIzaSyB7DfwQwnhYjPzx8UIF0JHlgVeNwSDnZkY',
    STRIPE_CLIENT_KEY: 'pk_test_7GNkTJHiPbROv4gPDuQNvThc',
    STRIPE_CLIENT_ID: 'ca_CmC1grl4bBfjYWWwKg548UPazsb6USUW',
    SENTRY_CLIENT_DSN: 'https://ee59845fce1746e4a2d6d664fd7a441b@sentry.io/1193097',
    ERC20_ADDRESSES: {
      DAI: '0x909E4dbdef114c9B39078Df314177780b89d8062'
    },
    UNIPAY_ADDRESS: '0xd660c8a75cf57d8314857ee5e92df58e28b2a3e0'
  },
  staging: {
    BEENEST_HOST: 'https://staging.beenest.io',
    BEENEST_HOST_API: 'https://api-staging.beetoken.com',
    BEETOKEN_ADDRESS: '0x4D8fc1453a0F359e99c9675954e656D80d996FbF',
    BEETOKEN_PAYMENT_ADDRESS: '0xb3C348c4a6D95fee050bF8A770fC91EC60aa4ab2',
    FIREBASE_CONFIG: {
      apiKey: 'AIzaSyAv9jUUQcob4SjtUIMOylkImD8UogfaqNo',
      authDomain: 'beetoken-staging.firebaseapp.com',
      databaseURL: 'https://beetoken-staging.firebaseio.com',
      projectId: 'beetoken-staging',
      storageBucket: 'beetoken-staging.appspot.com',
      messagingSenderId: '279443810461'
    },
    GOOGLE_MAPS_KEY: 'AIzaSyB7DfwQwnhYjPzx8UIF0JHlgVeNwSDnZkY',
    STRIPE_CLIENT_KEY: 'pk_test_7GNkTJHiPbROv4gPDuQNvThc',
    STRIPE_CLIENT_ID: 'ca_CmC1grl4bBfjYWWwKg548UPazsb6USUW',
    SENTRY_CLIENT_DSN: 'https://ee59845fce1746e4a2d6d664fd7a441b@sentry.io/1193097',
    ERC20_ADDRESSES: {
      DAI: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'
    },
    UNIPAY_ADDRESS: '0x21e1c35410cf17d8b71d1536e5cd9d8851e3a7fd'
  },
  production: {
    BEENEST_HOST: 'https://www.beenest.com',
    BEENEST_HOST_API: 'https://api.beetoken.com',
    BEETOKEN_ADDRESS: '0x4D8fc1453a0F359e99c9675954e656D80d996FbF',
    BEETOKEN_PAYMENT_ADDRESS: '0xb3C348c4a6D95fee050bF8A770fC91EC60aa4ab2',
    FIREBASE_CONFIG: {
      apiKey: 'AIzaSyDS9QPfvghy3gX0pLIayXLnpOCTV2rJwe0',
      authDomain: 'beetoken-prod.firebaseapp.com',
      databaseURL: 'https://beetoken-prod.firebaseio.com',
      projectId: 'beetoken-prod',
      storageBucket: 'beetoken-prod.appspot.com',
      messagingSenderId: '431031134007'
    },
    GOOGLE_MAPS_KEY: 'AIzaSyB7DfwQwnhYjPzx8UIF0JHlgVeNwSDnZkY',
    STRIPE_CLIENT_KEY: 'pk_live_OyGfyNWsZZ7oDnPvNfo9hgR9',
    STRIPE_CLIENT_ID: 'ca_CmC1a1XXC4miwI2C3TrFrgLVK6aDw7cj',
    SENTRY_CLIENT_DSN: 'https://ee59845fce1746e4a2d6d664fd7a441b@sentry.io/1193097',
    ERC20_ADDRESSES: {
      DAI: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'
    },
    UNIPAY_ADDRESS: '0x21e1c35410cf17d8b71d1536e5cd9d8851e3a7fd'
  },
};

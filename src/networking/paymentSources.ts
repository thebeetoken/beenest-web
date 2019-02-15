import gql from 'graphql-tag';

export interface PaymentSource {
  id: string;
  provider: string;
  stripeBrand: string;
  stripeLast4: string;
  stripeObject: string;
  stripeSourceId: string;
  stripeCustomerId: string;
  stripeFingerprint: string;
  userId: string;
}

export interface PaymentSourceInput {
  stripeToken: string;
}

export interface UpdatePaymentSourceInput {
  addressCity: string;
  addressLine1: string;
  addressZip: string;
  addressState: string;
  expMonth: string;
  expYear: string;
  id: string;
}


// Queries

export const GET_PAYMENT_SOURCES = gql`
  query {
    getPaymentSources {
      id
      provider
      stripeBrand
      stripeLast4
      stripeObject
      stripeSourceId
      stripeCustomerId
      stripeFingerprint
      userId
    }
  }
`;

export const GET_CREDIT_BALANCE = gql`
  query creditBalance {
    creditBalance {
      amountUsd
    }
  }
`;

// Mutations

export const CREATE_PAYMENT_SOURCE = gql`
  mutation createPaymentSource($stripeToken: ID!) {
    createPaymentSource(stripeToken: $stripeToken) {
      id
      provider
      stripeBrand
      stripeLast4
      stripeObject
      stripeSourceId
      stripeCustomerId
      stripeFingerprint
      userId
    }
  }
`;

export const DELETE_PAYMENT_SOURCE = gql`
  mutation deletePaymentSource($paymentSourceId: ID!) {
    deletePaymentSource(paymentSourceId: $paymentSourceId) {
      id
    }
  }
`;

export const UPDATE_PAYMENT_SOURCE = gql`
  mutation updatePaymentSource($input: UpdatePaymentSourceInput!) {
    updatePaymentSource(input: $input) {
      id
      provider
      stripeBrand
      stripeLast4
      stripeObject
      stripeSourceId
      stripeCustomerId
      stripeFingerprint
      userId
    }
  }
`;

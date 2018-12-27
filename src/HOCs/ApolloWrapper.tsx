import * as React from 'react';

// Apollo for GraphQL Client communication and State Management
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';

import { SETTINGS } from 'configs/settings';
const { BEENEST_HOST_API } = SETTINGS;

import { getTokenFromFirebase } from 'utils/firebase';

// Declare Apollo Client settings, default state management
const authHeaderLink = setContext(async () => {
  const token = await getTokenFromFirebase();
  if (!token) {
    return null;
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
});
const cache = new InMemoryCache();
const stateLink = withClientState({ cache, defaults: null, resolvers: null });
const graphqlLink = createHttpLink({ uri: `${BEENEST_HOST_API}/graphql` });
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authHeaderLink, stateLink, graphqlLink]),
});

interface Props {
  children: React.ReactNode;
}

const ApolloWrapper = ({ children }: Props) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default ApolloWrapper;

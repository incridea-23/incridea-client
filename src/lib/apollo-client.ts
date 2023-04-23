import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { WebSocket } from 'isomorphic-ws';

// WebsocketLink for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.BACKEND_URL || 'wss://incridea.onrender.com/graphql',
    webSocketImpl: typeof window === 'undefined' ? WebSocket : undefined,
    connectionParams: async () => {
      const session = await getSession();
      const token = session?.accessToken;

      return {
        authorization: token ? `Bearer ${token}` : '',
      };
    },
  })
);

// HttpLink for queries and mutations
const httpLink = createHttpLink({
  uri: process.env.BACKEND_URL || 'https://incridea.onrender.com/graphql',
});

// AuthLink for adding the JWT token to the headers
const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const token = session?.accessToken;

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      ...headers,
    },
  };
});

// SplitLink - decide whether to use the WebsocketLink or the HttpLink
const splitLink =
  typeof window === 'undefined'
    ? httpLink
    : split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        authLink.concat(httpLink)
      );

function createApolloClient() {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;

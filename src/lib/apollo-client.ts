import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';
import { YogaLink } from '@graphql-yoga/apollo-link';

// const authLink = setContext(async (_, { headers }) => {
//   const session = await getSession();
//   const token = session?.accessToken;

//   return {
//     headers: {
//       authorization: token ? `Bearer ${token}` : '',
//       ...headers,
//     },
//   };
// });

const getHeaders = async () => {
  const session = await getSession();
  const token = session?.accessToken;

  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

const link = new YogaLink({
  endpoint: process.env.BACKEND_URL || 'https://incridea.onrender.com/graphql',
  headers: {
    Authorization: 'Bearer hard-coded-token',
  },
});

function createApolloClient() {
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;

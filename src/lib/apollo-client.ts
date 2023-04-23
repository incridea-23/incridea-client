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
  endpoint: process.env.BACKEND_URL || 'http://localhost:4000/graphql',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJpYXQiOjE2ODIyNTM1NTIsImV4cCI6MTY4MjI2MDc1Mn0.iF8BCayveK7_uUoKtOkfdg1d_R9AOKX1r3elyjtNfQo',
  },
});

function createApolloClient() {
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri:
    process.env.BACKEND_URL || 'https://incridea-test.up.railway.app/graphql',
  credentials: 'include',
});

// const authLink = setContext(async (_, { headers }) => {
//   const token = // get the token from cookie

//   return {
//     headers: {
//       authorization: token ? `Bearer ${token}` : '',
//       ...headers,
//     },
//   };
// });

function createApolloClient() {
  return new ApolloClient({
    // link: authLink.concat(httpLink),
    link: httpLink,
    cache: new InMemoryCache(),
  });
}
export default createApolloClient;

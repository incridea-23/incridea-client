import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cookie from 'cookie';

const httpLink = createHttpLink({
  uri:
    process.env.BACKEND_URL || 'https://incridea-test.up.railway.app/graphql',
  credentials: 'include',
});

// const authLink = setContext(async (_, { headers }) => {
//   const token = cookie.parse(document.cookie).access_token;

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

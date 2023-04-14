import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: process.env.BACKEND_URL || "https://f5c6-223-186-198-147.ngrok-free.app/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const token = session?.accessToken;

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      ...headers,
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
export default createApolloClient;

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { getSession } from "next-auth/react";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext(async (_) => {
  const session = await getSession();
  const modifiedHeader = {
    headers: {
      authorization: session?.accessToken
        ? `Bearer ${session.accessToken}`
        : "",
    },
  };
  return modifiedHeader;
});

const httpLink = new HttpLink({
  uri: "https://incridea-test.onrender.com/graphql",
  credentials: "include",
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([httpLink, authLink]),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;

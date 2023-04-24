import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getSession } from "next-auth/react";
import { YogaLink } from "@graphql-yoga/apollo-link";

const getHeaders = async () => {
  const session = await getSession();
  const token = session?.accessToken;

  return {
    authorization: token ? `Bearer ${token}` : "",
  };
};

const link = new YogaLink({
  endpoint:
    process.env.BACKEND_URL || "http://localhost:4000/graphql",

  fetch: async (uri, options) => {
    const headers = await getHeaders();
    options = {
      ...options,

      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };
    return fetch(uri, options);
  },
});

function createApolloClient() {
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;

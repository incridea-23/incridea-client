import {
  ApolloLink,
  Operation,
  FetchResult,
  Observable,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client/core";
import { split } from "@apollo/client/link/core";
import { HttpLink } from "@apollo/client/link/http";
import { print, getOperationAST } from "graphql";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
type SSELinkOptions = EventSourceInit & { uri: string };

class SSELink extends ApolloLink {
  constructor(private options: SSELinkOptions) {
    super();
  }

  request(operation: Operation): Observable<FetchResult> {
    const url = new URL(this.options.uri);
    url.searchParams.append("query", print(operation.query));
    if (operation.operationName) {
      url.searchParams.append("operationName", operation.operationName);
    }
    if (operation.variables) {
      url.searchParams.append("variables", JSON.stringify(operation.variables));
    }
    if (operation.extensions) {
      url.searchParams.append(
        "extensions",
        JSON.stringify(operation.extensions)
      );
    }

    return new Observable((sink) => {
      const eventsource = new EventSource(url.toString(), this.options);
      eventsource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        sink.next(data);
        if (eventsource.readyState === 2) {
          sink.complete();
        }
      };
      eventsource.onerror = function (error) {
        sink.error(error);
      };
      eventsource.addEventListener("complete", () => {
        eventsource.close(); // If operation ends, close the connection and prevent the client from reconnecting
      });
      return () => eventsource.close();
    });
  }
}

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

const uri = "https://incridea-test.onrender.com/graphql";
const sseLink = new SSELink({ uri });
const httpLink = new HttpLink({ uri });

const link = split(
  ({ query, operationName }) => {
    const definition = getOperationAST(query, operationName);

    return (
      definition?.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  sseLink,
  authLink.concat(httpLink)
);

export default function createApolloClient() {
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
}

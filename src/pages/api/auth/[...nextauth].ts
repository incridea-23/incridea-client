import { isJwtExpired } from "@/src/utils/isJwtExpired";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const graphqlServer = "https://incridea-test.onrender.com/graphql";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
  }

  interface User {
    data: {
      email: string;
      id: string;
      isVerified: boolean;
      name: string;
      role: string;
    };

    login: {
      data: {
        accessToken: string;
        refreshToken: string;
      };
    };

    accessToken: string;
  }

  interface AdapterUser {
    data: {
      access: string;
      refresh: string;
    };
    accessToken: string;
  }

  interface JWT {
    iat: number;
    exp: number;
    accessToken: string;
  }

  interface Session {
    user: {
      data: {
        email: string;
        id: string;
        isVerified: boolean;
        name: string;
        role: string;
      };
    };
    accessToken: string;
  }
}

export const refreshToken = async function (refreshToken: string) {
  try {
    const query = JSON.stringify({
      query: `#graphql
      mutation {
        refreshToken(refreshToken: "${refreshToken}") {
          ... on Error {
            __typename
            message
          }
          ... on MutationRefreshTokenSuccess {
            __typename
            data {
              accessToken
              refreshToken
            }
          }
        }
      }
      `,
    });

    const response = await fetch(`${graphqlServer}`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: query,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });

    const { access, refresh } = response.data;
    // still within this block, return true
    return [access, refresh];
  } catch {
    return [null, null];
  }
};

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {},
      async authorize(credentials: any, _req): Promise<any> {
        const { email, password } = credentials;
        const query = JSON.stringify({
          query: `#graphql
          mutation {
            login(data: { email: "${email}", password: "${password}" }) {
              __typename
              ... on Error {
                message
              }
              ... on MutationLoginSuccess {
                __typename
                data {
                  accessToken
                  refreshToken
                }
              }
            }
          }
          `,
        });

        const response = await fetch(`${graphqlServer}`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: query,
        });

        const data = await response.json();

        if (data.data.login.__typename === "MutationLoginSuccess") {
          return data.data;
        }

        throw new Error(data.data.login.message);
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async jwt({ token, user }): Promise<any> {
      // user just signed in
      if (user) {
        const { accessToken, refreshToken } = user.login.data;
        token = {
          ...token,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        return token;
      }

      // user was signed in previously, we want to check if the token needs refreshing
      // token has been invalidated, try refreshing it
      if (isJwtExpired(String(token.accessToken))) {
        const [newAccessToken, newRefreshToken] = await refreshToken(
          String(token.refreshToken)
        );

        if (newAccessToken && newRefreshToken) {
          token = {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
          };

          return token;
        }

        // unable to refresh tokens from backend, invalidate the token
        return {
          ...token,
          exp: 0,
        };
      }

      const query = JSON.stringify({
        query: `
        query {
          me {
            ... on Error {
              __typename
              message
            }
            ... on QueryMeSuccess {
              __typename
              data {
                email
                id
                isVerified
                name
                role
              }
            }
          }
        }
        `,
      });

      const response = await fetch(`${graphqlServer}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
        method: "POST",
        body: query,
      });

      const data = await response.json();
      token.data = data.data.me.data;
      return token;
    },

    async session({ session, token, user }) {
      const userOrToken = user || token;
      session.accessToken = userOrToken.accessToken;
      session.user.data = userOrToken.data;
      return session;
    },
  },
});

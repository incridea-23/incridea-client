import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform login logic
        // find out user from db

        // if everything is fine
        return {
          id: '1234',
          name: 'John Doe',
          email: 'john@gmail.com',
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/signup',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = account?.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      // token.accessToken = session.accessToken;
      const config = {
        headers: { Authorization: `Bearer ${token.accessToken}` },
      };
      // queryMe from graphql endpoint and add it to session

      return session;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default NextAuth(authOptions);

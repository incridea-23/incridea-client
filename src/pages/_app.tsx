import { useApollo } from '@/src/lib/apollo';
import '@/src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import HeadComponent from '../components/head';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <HeadComponent
        title="Incridea"
        description="Official Website of Incridea 2023, National level techno-cultural fest, NMAMIT, Nitte. Innovate. Create. Ideate."
      />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

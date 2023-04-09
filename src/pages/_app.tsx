import { useApollo } from '@/src/lib/apollo';
import '@/src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import HeadComponent from '../components/head';
import { bodyFont } from '../utils/fonts';
import { useState } from 'react';
import Footer from '../components/footer';
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('../components/navbar'), { ssr: false });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [isLoading, setLoading] = useState(true);

  return (
    <ApolloProvider client={apolloClient}>
      <HeadComponent
        title="Incridea"
        description="Official Website of Incridea 2023, National level techno-cultural fest, NMAMIT, Nitte. Innovate. Create. Ideate."
      />
      <main className={`${bodyFont.className}`}>
        <Navbar />
        <Component setLoading={setLoading} {...pageProps} />
        <Footer />
      </main>
    </ApolloProvider>
  );
}

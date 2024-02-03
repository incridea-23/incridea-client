import { useApollo } from "@/src/lib/apollo";
import "@/src/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
const Navbar = dynamic(() => import("../components/navbar"), { ssr: false });
import HeadComponent from "../components/head";
import Footer from "../components/footer";
import localFont from "@next/font/local";
import { Press_Start_2P } from "@next/font/google";

export const VikingHell = localFont({
  src: "../font/Viking Hell.otf",
  variable: "--font-viking-hell",
});

export const pressStart = Press_Start_2P({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  variable: "--font-Press_Start_2P",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  if (
    router.pathname === "/theme" ||
    router.pathname === "/test" ||
    router.pathname === "/" ||
    router.pathname.startsWith("/explore")
  )
    return (
      <ApolloProvider client={apolloClient}>
        <HeadComponent
          title="Incridea"
          description="Official Website of Incridea 2024, National level techno-cultural fest, NMAMIT, Nitte. Innovate. Create. Ideate."
        />
        <div
          className={`min-h-screen ${VikingHell.variable} ${pressStart.variable}`}
        >
          <Component {...pageProps} />
          <Toaster />
        </div>
      </ApolloProvider>
    );
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <HeadComponent
          title="Incridea"
          description="Official Website of Incridea 2024, National level techno-cultural fest, NMAMIT, Nitte. Innovate. Create. Ideate."
        />
        <Toaster />
        <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
        <div
          className={`min-h-screen ${VikingHell.variable} ${pressStart.variable}`}
        >
          {!isLoading && <Navbar />}
          <Component setLoading={setLoading} {...pageProps} />
          <Footer />
        </div>
      </ApolloProvider>
      <Analytics />
    </>
  );
}

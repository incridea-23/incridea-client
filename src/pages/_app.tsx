import { useApollo } from "@/src/lib/apollo";
import "@/src/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
const Navbar = dynamic(() => import("../components/navbar"), { ssr: false });
import HeadComponent from "../components/head";
import Footer from "../components/footer";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const variants = {
    initialState: {
      opacity: 0,
      translateY: "100px",
    },
    animateState: {
      opacity: 1,
      translateY: "0%",
    },
    exitState: {
      opacity: 0,
      translateY: "-100px",
    },
  };

  if (
    router.pathname === "/theme" ||
    router.pathname === "/test" ||
    router.pathname === "/" ||
    router.pathname.startsWith("/explore")
  )
    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  return (
    <ApolloProvider client={apolloClient}>
      <HeadComponent
        title="Incridea"
        description="Official Website of Incridea 2023, National level techno-cultural fest, NMAMIT, Nitte. Innovate. Create. Ideate."
      />
      <Toaster />
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
      <div className=" ">
        {!isLoading && <Navbar />}
        <Component setLoading={setLoading} {...pageProps} />
        <Footer />
      </div>
      {/* <Analytics /> */}
    </ApolloProvider>
  );
}

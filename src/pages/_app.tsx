import { useApollo } from "@/src/lib/apollo";
import "@/src/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import HeadComponent from "../components/head";
import { bodyFont } from "../utils/fonts";
import { useState } from "react";
import Footer from "../components/footer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AnimatePresence,motion } from "framer-motion";
import Image from "next/image";

const Navbar = dynamic(() => import("../components/navbar"), { ssr: false });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const variants = {
    initialState : {
      opacity:0,
      translateY:"100%",
    },
    animateState : {
      opacity:1,
      translateY:"0%",
    },
    exitState : {
      opacity:0,
      translateY:"-100%"
    }
  }

  return (
    <ApolloProvider client={apolloClient}>
      <HeadComponent
        title="Incridea"
        description="Official Website of Incridea 2023, National level techno-cultural fest, NMAMIT, Nitte. Innovate. Create. Ideate."
      />
      <div className="bg-gradient-to-bl  from-[#41acc9]  via-[#075985] to-[#2d6aa6]">
        <Image src={'/assets/png/logo.png'} alt="loader" width={300} height={300} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
        <AnimatePresence mode="wait">
          <motion.main 
          key={router.route}
          initial="intialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration:2,
          }}
          variants={variants}
          className={`${bodyFont.className}`}
          >
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:2}}
            >
              <Navbar />
              <Component setLoading={setLoading} {...pageProps} />
              <Footer />
            </motion.div>
          </motion.main>
        </AnimatePresence>
      </div>
    </ApolloProvider>
  );
}

import { useApollo } from '@/src/lib/apollo';
import '@/src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import HeadComponent from '../components/head';
import { useEffect, useState } from 'react';
import Footer from '../components/footer';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Loader from '../components/Loader';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
const Navbar = dynamic(() => import('../components/navbar'), { ssr: false });

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
      translateY: '100px',
    },
    animateState: {
      opacity: 1,
      translateY: '0%',
    },
    exitState: {
      opacity: 0,
      translateY: '-100px',
    },
  };

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => setLoading(false), 0);
  // }, []);

  if (router.pathname === '/theme') return <Component {...pageProps} />;
  return (
    <>
      <HeadComponent
        title="Incridea"
        description="Official Website of Incridea 2023, National level techno-cultural fest, NMAMIT, Nitte. Innovate. Create. Ideate."
      />
      <div className="h-screen bg-gradient-to-b from-[rgb(0,1,45)] to-[#1c0066] overflow-y-hidden">
        <div className="absolute top-0 flex justify-between items-center w-full sm:p-8 p-4">
          <motion.a href="/" initial={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
            <Image
              height={100}
              width={100}
              alt="IncrideaLogo"
              src="/assets/png/logo.png"
              className="md:w-32 w-24"
            />
          </motion.a>
          <motion.a
            href="https://nmamit.nitte.edu.in/"
            target="_blank"
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src="/assets/png/nitteLogoWhite.png"
              className="md:w-72 w-48"
              width={300}
              height={100}
              alt="nitteLogo"
            />
          </motion.a>
        </div>
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="xl:text-[9rem] lg:text-[8rem] z-20 md:text-[7rem] sm:text-[6rem] text-[3rem] leading-none pressStart text-center text-transparent">
            <span className="bg-gradient-to-b from-[#43f6fc] via-[#1e0573] to-[#f105f7] bg-clip-text">
              Coming
            </span>
            <br />
            <span className="bg-gradient-to-b from-[#43f6fc] via-[#1e0573] to-[#f105f7] bg-clip-text border-white ">
              Soon
            </span>
          </h1>

          <div className="lg:flex absolute hidden flex-col 2xl:right-[12%] xl:right-[6%] lg:right-0 gap-16 z-10">
            <div>
              <Image
                height={100}
                width={300}
                src="/assets/comingSoon/dots.svg"
                alt="dots"
                className=" md:w-[30rem] w-[10rem] absolute opacity-20"
              />

              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={{ y: 20 }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src="/assets/comingSoon/joystick.svg"
                  alt="joystick"
                  className="w-44"
                  width={100}
                  height={300}
                />
              </motion.div>
            </div>
          </div>

          <div className="lg:flex absolute hidden flex-col 2xl:left-[12%] xl:left-[6%] lg:left-0 gap-20 z-10">
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1.5 }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 1,
              }}
            >
              <Image
                src="/assets/comingSoon/star.svg"
                alt="star"
                className="w-20 translate-x-20 rotate-45"
                width={100}
                height={100}
              />
            </motion.div>
            {/* <img src="/assets/comingSoon/ring.svg" alt="" className="w-24" /> */}
            <motion.img />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -10 }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/assets/comingSoon/controller.svg"
                alt="controller"
                className="w-56 "
                width={300}
                height={100}
              />
            </motion.div>

            <motion.div
              drag
              dragConstraints={{
                top: 100,
                left: 0,
                right: 100,
                bottom: 50,
              }}
            >
              <Image
                src="/assets/comingSoon/yBlock1.svg"
                alt="block1"
                className="w-28 translate-x-20"
                width={100}
                height={100}
              />
            </motion.div>
          </div>

          <div className="lg:hidden flex absolute top-1/4 gap-6">
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1.5 }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 1,
              }}
            >
              <Image
                src="/assets/comingSoon/star.svg"
                alt="star"
                className="w-16 translate-y-16 "
                width={100}
                height={100}
              />
            </motion.div>
            <a
              href="https://youtu.be/GdmrDe-VIlo?si=NMsqcKajgdB5e9xf"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                height={100}
                width={100}
                src="/assets/comingSoon/ring.svg"
                alt="ring"
                className="w-16"
              />
            </a>
            <motion.div
              drag
              dragConstraints={{
                top: -100,
                right: 20,
                bottom: 50,
                left: -100,
              }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              dragElastic={0.5}
              whileTap={{ cursor: 'grabbing' }}
            >
              <Image
                src="/assets/comingSoon/yblock2.svg"
                alt="block2"
                className="w-16 translate-y-12"
                width={100}
                height={100}
              />
            </motion.div>
          </div>

          <div className="lg:hidden absolute flex flex-col bottom-16 z-10">
            <motion.div
              initial={{ x: 0, y: 0 }}
              animate={{ y: 20 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/assets/comingSoon/joystick.svg"
                alt="joystick"
                className="w-28 ml-24"
                height={300}
                width={100}
              />
            </motion.div>

            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -10 }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/assets/comingSoon/controller.svg"
                alt="controller"
                height={100}
                width={300}
                className="w-28 rotate-[50deg] -translate-y-12"
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-32 lg:flex hidden left-[40%] gap-16 z-10">
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1.5 }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 1,
            }}
          >
            <Image
              src="/assets/comingSoon/star.svg"
              alt="star"
              className="w-20 -translate-y-10 "
              width={100}
              height={100}
            />
          </motion.div>
          <a
            href="https://youtu.be/GdmrDe-VIlo?si=NMsqcKajgdB5e9xf"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="/assets/comingSoon/ring.svg"
              alt="ring"
              className="w-24 translate-y-10"
            />
          </a>

          <motion.div
            drag
            dragConstraints={{
              top: 100,
              left: 0,
              right: 100,
              bottom: 50,
            }}
          >
            <Image
              src="/assets/comingSoon/yblock2.svg"
              alt="block1"
              className="w-28 -translate-y-10"
              width={100}
              height={100}
            />
          </motion.div>
        </div>

        <div className="z-0 absolute bottom-0 flex justify-between w-full">
          <Image
            height="100"
            width="100"
            src={'assets/comingSoon/bottomLeft.svg'}
            alt="bottomLeft"
            className="w-[40%]"
          />
          <Image
            height="100"
            width="100"
            src="/assets/comingSoon/dots.svg"
            alt="dots"
            className=" lg:w-[30rem] w-[10rem] absolute bottom-16 left-[10%] opacity-20"
          />

          <Image
            height="500"
            width="500"
            src={'assets/comingSoon/bottomRight.svg'}
            alt="bottomRight"
            className="w-[40%]"
          />
        </div>
      </div>
    </>
    // <div className="w-screen bg-black h-screen text-white">Coming soon..</div>
    // <ApolloProvider client={apolloClient}>
    //   <HeadComponent
    //     title="Incridea"
    //     description="Official Website of Incridea 2023, National level techno-cultural fest, NMAMIT, Nitte. Innovate. Create. Ideate."
    //   />
    //   <Toaster />
    //   <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
    //   <div className="bg-gradient-to-bl  from-[#41acc9]  via-[#075985] to-[#2d6aa6]">
    //     {
    //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
    //         <Image
    //           src={"/assets/png/logo.png"}
    //           alt="loader"
    //           width={300}
    //           height={300}
    //           priority
    //         />
    //         <h1 className={`titleFont text-xl md:text-3xl text-center`}>
    //           Tides of Change
    //         </h1>
    //       </div>
    //     }
    //     {!isLoading && <Navbar />}
    //     <AnimatePresence mode="wait">
    //       <motion.main
    //         key={router.route}
    //         initial="intialState"
    //         animate="animateState"
    //         exit="exitState"
    //         transition={{ duration: 0.8 }}
    //         variants={variants}
    //       >
    //         <motion.div
    //           initial={{ opacity: 0 }}
    //           animate={{ opacity: 1 }}
    //           transition={{ duration: 0.8 }}
    //           className="min-h-screen"
    //         >
    //           <Component setLoading={setLoading} {...pageProps} />
    //         </motion.div>
    //       </motion.main>
    //     </AnimatePresence>
    //     <Footer />
    //   </div>
    //   <Analytics />
    // </ApolloProvider>
  );
}

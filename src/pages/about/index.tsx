import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Banner from "../../components/AboutUs/Banner";
import gsap from "gsap";
import { motion, useInView, useAnimation } from "framer-motion";

const About = () => {
  // const aboutcontainer = useRef(null);
  // const aboutcontaine = useRef(null);

  // gsap.fromTo(
  //   aboutcontainer.current,
  //   { x: -200 },
  //   {
  //     duration: 3,
  //     x: 200,
  //     ease: "power2.inOut",
  //     yoyo: true,
  //     repeat: 1,
  //     onComplete: () => {
  //       if (typeof window !== "undefined") {
  //         const screenWidth = window.innerWidth;
  //         const newX = screenWidth >= 1024 ? -5 : 10;
  //         gsap.set(aboutcontainer.current, { x: newX });
  //       }
  //     },
  //   }
  // );

  // gsap.fromTo(
  //   aboutcontaine.current,
  //   { x: -200 },
  //   {
  //     duration: 3,
  //     x: 200,
  //     ease: "power2.inOut",
  //     yoyo: true,
  //     repeat: 1,
  //     onComplete: () => {
  //       if (typeof window !== "undefined") {
  //         const screenWidth = window.innerWidth;
  //         const newX = screenWidth >= 1024 ? -5 : 10;
  //         gsap.set(aboutcontaine.current, { x: newX });
  //       }
  //     },
  //   }
  // );

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();
  const ref1 = useRef(null);
  const isInView1 = useInView(ref1, { once: true });
  const control1 = useAnimation();

  useEffect(() => {
    isInView && control.start("visible").catch((err) => console.log(err));
  }, [isInView]);

  useEffect(() => {
    isInView1 && control1.start("visible").catch((err) => console.log(err));
  }, [isInView1]);

  return (
    <section className="flex flex-col gap-2 justify-center items-center bg-[#211a5f]">
      <div className="flex flex-col h-screen min-h-min justify-around gap-1 items-center">
        <Banner video={"https://vimeo.com/883551016?share=copy"} text="" />
        <div className="mx-4 sm:mx-8 lg:mx-32 flex flex-col md:flex-row gap-10 justify-center items-center max-w-7xl">
          <span className="w-full md:w-1/3">
            <Image
              src="https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/about/nitteLogo.png"
              alt="image"
              loading="lazy"
              className="object-contain h-full w-full object-center top-0"
              height={500}
              width={500}
            />
          </span>
          <div className="w-full md:w-2/3 flex flex-col text-center md:text-left gap-7 md:gap-5">
            <span className="">
              <h2 className="font-VikingHell text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl text-secondary-100">
                About <span className="text-secondary-100">NMAMIT</span>
              </h2>
            </span>
            <div className="flex flex-col gap-3">
              <div className="">
                <span className="text-base md:text-lg xl:text-xl text-secondary-100">
                  <div ref={ref} style={{ position: "relative" }}>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 75 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      initial="hidden"
                      animate={control}
                      transition={{
                        duration: 0.8,
                        delay: 0.45,
                      }}
                    >
                      Nitte Mahalinga Adyantaya Memorial Institute of Technology
                      (NMAMIT), Nitte, established in 1986 and recognized by the
                      All India Council for Technical Education, New Delhi, has
                      been a constituent college of Nitte University, Mangaluru,
                      since June 2022.
                    </motion.div>
                  </div>
                </span>
              </div>
              <div className="">
                <span className="text-base md:text-lg xl:text-xl text-secondary-100">
                  <div ref={ref} style={{ position: "relative" }}>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -75 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      initial="hidden"
                      animate={control}
                      transition={{
                        duration: 0.85,
                        delay: 0.7,
                      }}
                    >
                      Ranked 175 in the National Institutional Ranking Framework
                      (NIRF) 2022 by MHRD, GoI among the engineering colleges in
                      India, the College has been placed under the{" "}
                      <q>Platinum</q> category for having high industry linkages
                      by the AICTE-CII Survey of Industry-Linked Technical
                      Institutes 2020. For details, visit
                      www.nmamit.nitte.edu.in
                    </motion.div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen min-h-min justify-around gap-8 items-center animate-fadeIn">
        <Banner
          video={"https://vimeo.com/883551016?share=copy"}
          text=""
          credits="Video: Glen Rebello"
        />
        <div className="mx-4 sm:mx-8 lg:mx-32 flex flex-col md:flex-row gap-10 justify-center items-center max-w-7xl">
          <span className="w-full md:w-1/3 flex justify-center items-center">
            <Image
              src="https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/about/nitteLogo.png"
              alt="image"
              loading="lazy"
              className="object-contain h-full md:w-full object-center w-48 max-w-[16rem]"
              height={500}
              width={500}
            />
          </span>
          <div className="w-full md:w-2/3 flex flex-col text-center md:text-left gap-7 md:gap-5 mb-12">
            <span className="">
              <h2 className="font-VikingHell text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl  text-secondary-100">
                About <span className="text-secondary-100">Incridea</span>
              </h2>
            </span>
            <div className="">
              <span className="text-base md:text-lg xl:text-xl text-secondary-100">
                <div ref={ref1} style={{ position: "relative" }}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 75 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate={control1}
                    transition={{
                      duration: 0.65,
                      delay: 0.25,
                    }}
                  >
                    Incridea, the annual college festival of NMAM Institute of
                    Technology, Nitte, has rapidly grown into one of the most
                    awaited cultural events in the region within a short span of
                    time. The festival has become a symbol of creativity,
                    innovation, and fun, attracting students from various
                    colleges across the country.
                  </motion.div>
                </div>
              </span>
            </div>
            <div className="">
              <span className="text-base md:text-lg xl:text-xl text-secondary-100">
                <div ref={ref1} style={{ position: "relative" }}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -75 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate={control1}
                    transition={{
                      duration: 0.65,
                      delay: 0.25,
                    }}
                  >
                    Incridea is an entertainment hub that offers an array of 60+
                    events, including pronites, fashion shows, music, drama,
                    sports, robotics, and coding competitions, with some being
                    our flagship events. These events attract several thousand
                    attendees and provide a platform for students to showcase
                    their talents while connecting with peers from all over the
                    country.
                  </motion.div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

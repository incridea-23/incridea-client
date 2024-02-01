import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../components/button";
import Link from "next/link";
import { BsFillSuitHeartFill } from "react-icons/bs";
import Parallax from "parallax-js";

export default function Landing() {
  const landingContainer = useRef(null);
  const Logo = useRef(null);
  const [pageLoader, setPageLoader] = useState<boolean>(true);

  useGSAP(
    () => {
      gsap.to(landingContainer.current, {
        scale: 13,
        translateY: 500,
        translateX: 150,
        duration: 2.0,
        delay: 0.5,
        ease: "power4.in",
        onComplete() {
          gsap.to(landingContainer.current, { opacity: 0, duration: 1 });
          setTimeout(() => {
            setPageLoader(false);
          }, 1000);
          gsap.from(Logo.current, {
            delay: 0.2,
            duration: 2,
            scale: 2,
            opacity: 0.6,
          });
        },
      });
    },
    { scope: landingContainer }
  );

  return (
    <main className="h-screen overflow-hidden">
      {/* {
                pageLoader && <section ref={landingContainer} className="flex min-h-screen w-full bg-black z-[999] absolute top-0 left-0">
                    <Image src={'/assets/landing/landing@2x.png'} alt="UI Incridea 2024" width={1920 * 2} height={1080 * 2} className='image w-full h-full object-cover object-center absolute top-0 left-0' />
                </section>
            }
            <div ref={Logo} className='flex w-[320px] md:w-[480px] lg:w-[640px] h-fit z-50 mt-16 md:mt-28'>
                <Image src={'/assets/home/DoD.png'} width={640} height={640} alt='Dice of Destiny' className='object-center object-contain' />
            </div> */}
      <HomeUi />
      <Menu />
      <HomeFooter />
    </main>
  );
}

const HomeFooter = () => {
  return (
    <footer className="absolute w-full text-gray-200 bottom-0">
      <p className="text-center p-5 text-sm">
        <Link
          className="flex justify-center items-center tracking-normal transition-all hover:tracking-widest hover:text-gray-300"
          href="/team"
        >
          Made with <BsFillSuitHeartFill className="mx-2" /> by Technical Team
        </Link>
        © Incridea 2023
      </p>
    </footer>
  );
};

const Menu = () => {
  const navItems = [
    { href: "/events", target: "Events" },
    { href: "/pronite", target: "Pronite" },
    { href: "/gallery", target: "Gallery" },
    { href: "/contact-us", target: "Contact Us" },
  ];

  return (
    <div className="w-screen overflow-x-hidden flex flex-col absolute bottom-0 left-0 h-full justify-center items-center">
      <div className="flex flex-col items-center sm:flex-row w-full md:gap-10 my-24 gap-3 max-w-xs sm:max-md">
        <Button
          intent={"primary"}
          className="h-fit w-52  px-4 sm:px-12"
          size={"xlarge"}
        >
          Register
        </Button>
        <Button
          intent={"ghost"}
          className="h-fit w-52 px-4 sm:px-12"
          size={"xlarge"}
        >
          Explore
        </Button>
      </div>
      <div className="flex flex-col w-fit h-fit static md:absolute bottom-48 xl:bottom-32 -right-8">
        <h3 className="text-2xl sm:text-4xl hidden sm:block text-white font-VikingHell text-center mb-0 sm:mb-4">
          Menu
        </h3>
        {navItems.map((e, i) => (
          <Link key={i} href={e.href}>
            <Button
              className="my-2 md:my-4 w-52 md:w-80 justify-center md:justify-end px-12 md:px-16"
              size={"xlarge"}
            >
              {e.target}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

const HomeUi = () => {
  useLayoutEffect(() => {
    const scene = document.getElementById("scene") as HTMLElement;

    let parallaxInstance = new Parallax(scene, {
      relativeInput: true,
      clipRelativeInput: true,
    });
  });

  return (
    <section
      id="scene"
      className="relative bg-gradient-to-b min-h-screen from-[#00002a] via-[#1c23bb] to-pink-800/50"
    >
      {/* backgrounds */}
      {/* <Image
        src={"/assets/home/bg.png"}
        alt="Gradient"
        width={1920}
        height={1080}
        className="w-screen h-full object-center object-cover absolute "
      /> */}
      <div className="h-screen w-screen absolute">
        <div id="foglayer_01" className="fog">
          <div className="image01"></div>
          <div className="image02"></div>
        </div>
        <div id="foglayer_02" className="fog">
          <div className="image01"></div>
          <div className="image02"></div>
        </div>
        <div id="foglayer_03" className="fog">
          <div className="image01"></div>
          <div className="image02"></div>
        </div>
      </div>
      <div data-depth="0.5" className="absolute  h-screen w-screen ">
        <div className="opacity-50 translate-y-16 h-[75vh] md:h-full absolute bottom-0 left-[50%] -translate-x-1/2 md:left-0 md:translate-x-0 md:w-full aspect-video  ">
          <Image
            src={"/assets/home/moon.png"}
            alt="Gradient"
            width={1920}
            height={1080}
            className="object-bottom  h-full w-full object-contain"
          />
        </div>
      </div>
      <div data-depth="0.4" className="h-screen w-screen absolute">
        <Image
          src={"/assets/home/stars.png"}
          alt="Gradient"
          width={1920}
          height={1080}
          className="w-full h-full object-center object-cover absolute "
        />
      </div>

      <div data-depth="0.3" className="absolute h-screen w-screen">
        <div className="h-full absolute aspect-video right-0  translate-x-[18%]  sm:translate-x-[12%] md:translate-x-[10%] bottom-0 lg:translate-x-[4%] translate-y-[3%]">
          <Image
            src={"/assets/home/portal.png"}
            alt="Portal"
            width={2050}
            height={1080}
            className="w-full h-full object-cover object-right-bottom  "
          />
        </div>
      </div>

      <div data-depth="0.2" className="absolute h-screen w-screen">
        <div className="h-full absolute aspect-video left-0 -translate-x-[20%] sm:-translate-x-[18%]  md:-translate-x-[12%] bottom-0 lg:-translate-x-[10%] translate-y-[3%]   ">
          <Image
            src={"/assets/home/ryoko.png"}
            id="Ryoko"
            alt="Ryoko looking at portal"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-left-bottom"
          />
        </div>
      </div>
    </section>
  );
};

import Image from "next/image";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../components/button";
import Link from "next/link";
import { BsFillSuitHeartFill } from "react-icons/bs";
import Parallax from "parallax-js";
import Arcade from "../components/svg/arcade";
import { VikingHell } from "./_app";
import { NextRouter, useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GetUserXpDocument } from "../generated/generated";
import CountDown from "../components/pages/countdown";
import Spinner from "../components/spinner";
import ArcadeLoader from "../components/Loader/arcadeLoader";
import { baseImageUrl } from "../utils/url";

export default function Landing() {
  const landingContainer = useRef(null);
  const [pageLoader, setPageLoader] = useState<boolean>(true);
  const router = useRouter();
  const { data: userXp, loading: userXpLoading } = useQuery(
    GetUserXpDocument,
    {}
  );
  const [xp, setXp] = useState<number>(0);

  useEffect(() => {
    if (userXp?.getUserXp.__typename === "QueryGetUserXpSuccess") {
      setXp(
        userXp.getUserXp.data.reduce((acc, curr) => acc + curr.level.point, 0)
      );
    } else {
      setXp(0);
    }
  }, [userXpLoading]);

  return (
    <main className="h-screen relative overflow-hidden">
      {typeof window !== "undefined" && (
        <>
          {window.sessionStorage.getItem("arcadeLoader") ? null : (
            <ArcadeLoader />
          )}
        </>
      )}
      <div className="absolute top-0">
        <HomeUi xp={xp} />
        <Menu router={router} />
        <HomeFooter />
      </div>
    </main>
  );
}

export const HomeFooter = () => {
  return (
    <footer className="absolute w-full text-gray-200 bottom-0 flex flex-col gap-2 md:gap-4">
      <ul className="flex flex-wrap whitespace-nowrap flex-row flex-1 gap-2 md:gap-5 justify-center text-xs sm:text-xs items-center ">
        <li className="text-white hover:text-gray-300 transition-colors duration-300">
          <Link href="/privacy">Privacy Policy</Link>
        </li>
        |
        <li className="text-white hover:text-gray-300 transition-colors duration-300">
          <Link href="/rules">Terms & Conditions</Link>
        </li>
        |
        <li className="text-white hover:text-gray-300 transition-colors duration-300">
          <Link href="/guidelines">Guidelines</Link>
        </li>
        |
        <li className="text-white hover:text-gray-300 transition-colors duration-300">
          <Link href="/refund">Refund Policy</Link>
        </li>
        {/* |
            <li className="text-gray-300 hover:text-gray-100">
              <Link href="/about">About</Link>
            </li> */}
      </ul>
      <p className="text-center text-xs pb-3">
        <Link
          className="flex justify-center items-center tracking-normal transition-all hover:tracking-widest hover:text-gray-300"
          href="/team"
        >
          Made with <BsFillSuitHeartFill className="mx-2" /> by Technical Team
        </Link>
        © Incridea 2024
      </p>
    </footer>
  );
};

export const Menu: FC<{
  router: NextRouter;
}> = ({ router }) => {
  const navItems = [
    { href: "/events", target: "Events" },
    { href: "/pronites", target: "Pronite" },
    { href: "/gallery", target: "Gallery" },
    { href: "/about", target: "About" },
    // TODO: remember to change in mainMenuModal.tsx
    // { href: "/sponsors", target: "Sponsors" },
  ];

  const { user, loading, error } = useAuth();

  return (
    <div className="w-screen overflow-x-hidden flex flex-col absolute bottom-0 left-0 h-full justify-center items-center">
      <div className="lg:flex flex-col hidden  absolute bottom-10 items-center sm:flex-row  md:gap-10 my-24 gap-3  w-fit ">
        <Button
          intent={"primary"}
          className="h-fit w-52  px-4 sm:px-12"
          size={"xlarge"}
          onClick={() => {
            loading
              ? null
              : user
              ? router.push("/profile")
              : router.push("/login");
          }}
        >
          {loading ? (
            <Spinner size="small" className="py-[2px]" intent={"white"} />
          ) : user ? (
            "Profile"
          ) : (
            "Register"
          )}
        </Button>
        <Button
          intent={"ghost"}
          className="h-fit w-52 px-4 sm:px-12"
          size={"xlarge"}
          onClick={() => {
            router.push("/explore");
          }}
        >
          Explore
        </Button>
      </div>
      <div className="space-y-5 absolute flex flex-col w-fit h-fit -right-8 bottom-[15%]  lg:absolute ">
        <h3
          className={`text-2xl hidden md:block  md:mb-5 sm:text-4xl  text-white  tracking-widest text-center ${VikingHell.className} `}
        >
          Menu
        </h3>
        {
          <>
            <Button
              intent={"ghost"}
              className="lg:hidden !bg-primary-800/70 block w-52 md:w-80 justify-center md:justify-end px-12 md:px-16"
              size={"xlarge"}
              onClick={() => {
                loading
                  ? null
                  : user
                  ? router.push("/profile")
                  : router.push("/login");
              }}
            >
              {loading ? (
                <Spinner size="small" className="py-[2px]" />
              ) : user ? (
                "Profile"
              ) : (
                "Register"
              )}
            </Button>
            <Button
              intent={"ghost"}
              className="lg:hidden !bg-primary-800/70 block w-52 md:w-80 justify-center md:justify-end px-12 md:px-16"
              size={"xlarge"}
              onClick={() => {
                router.push("/explore");
              }}
            >
              Explore
            </Button>
          </>
        }
        {navItems.map((e, i) => (
          <Link key={i} href={e.href}>
            <Button
              className="w-52 md:w-80 justify-center md:justify-end px-12 md:px-16"
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

export const HomeUi: FC<{
  xp?: number;
}> = ({ xp }) => {
  useLayoutEffect(() => {
    const scene = document.getElementById("scene") as HTMLElement;

    let parallaxInstance = new Parallax(scene, {
      relativeInput: true,
    });
  });

  const Logo = useRef(null);
  gsap.from(Logo.current, {
    delay: 0,
    duration: 0,
    scale: 3,
    opacity: 0.6,
    zIndex: 9999,
  });
  gsap.to(Logo.current, {
    duration: 2,
    scale: 1,
    opacity: 1,
  });

  return (
    <>
      <CountDown />
      <section
        id="scene"
        className="relative bg-gradient-to-b min-h-screen from-[#00002a] via-[#1c23bb] to-pink-800/50"
      >
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
              src={`${baseImageUrl}/assets/home/moon.png`}
              alt="Gradient"
              width={1920}
              height={1080}
              className="object-bottom  h-full w-full object-contain"
            />
          </div>
        </div>
        <div data-depth="0.4" className="h-screen w-screen absolute">
          <Image
            src={`${baseImageUrl}/assets/home/stars.png`}
            alt="Gradient"
            width={1920}
            height={1080}
            className="w-full h-full object-center object-cover absolute "
          />
        </div>

        <div data-depth="0.3" className="absolute h-screen w-screen">
          <div className="h-full absolute aspect-video right-0  translate-x-[18%]  sm:translate-x-[12%] md:translate-x-[10%] bottom-0 lg:translate-x-[4%] translate-y-[3%]">
            <Image
              src={`${baseImageUrl}/assets/home/portal.png`}
              alt="Portal"
              width={2050}
              height={1080}
              className="w-full h-full object-cover object-right-bottom  "
            />
          </div>
        </div>
        <div
          data-depth="0.2"
          className="absolute flex  items-center  justify-center h-screen w-screen"
        >
          <div className="w-fit mx-auto p-5 mt-[3%]" ref={Logo}>
            <Image
              src={`${baseImageUrl}/assets/home/DoD.png`}
              width={640}
              height={640}
              alt="Dice of Destiny"
              className="object-center max-w-xl w-full h-fit object-contain"
            />
          </div>
        </div>
        <div data-depth="0.1" className="absolute h-screen w-screen">
          <div className="h-full absolute aspect-video left-0 -translate-x-[20%] sm:-translate-x-[18%]  md:-translate-x-[12%] bottom-0 lg:-translate-x-[10%] translate-y-[3%]   ">
            <Image
              src={`${baseImageUrl}/assets/home/ryoko.png`}
              id="Ryoko"
              alt="Ryoko looking at portal"
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-left-bottom"
            />
          </div>
        </div>
      </section>
    </>
  );
};

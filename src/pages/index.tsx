import Image from "next/image";
import { FC, use, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../components/button";
import Link from "next/link";
import { BsFillSuitHeartFill } from "react-icons/bs";
import Parallax from "parallax-js";
import Arcade from "../components/svg/arcade";
import { VikingHell } from "./_app";
import { NextRouter, useRouter } from "next/router";
import { AuthStatus, useAuth } from "../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GetUserXpDocument } from "../generated/generated";
import GlitchAnimation from "../components/animation/glitchAnimation";

export default function Landing() {
  const landingContainer = useRef(null);
  const [pageLoader, setPageLoader] = useState<boolean>(true);
  const router = useRouter();
  const { user, loading, status } = useAuth();
  const [userId, setUserId] = useState<string>("");
  const { data: userXp, loading: userXpLoading } = useQuery(
    GetUserXpDocument,
    {}
  );
  const [xp, setXp] = useState<number>(0);
  const [userAuthStatus, setUserAuthStatus] = useState<boolean>(false);

  useEffect(() => {
    console.log("user", user);
    if (user && user.role !== "USER") {
      setUserId(user.id);
      setUserAuthStatus(true);
    } else {
      setUserAuthStatus(false);
    }
  }, [user]);

  useEffect(() => {
    if (userXp?.getUserXp.__typename === "QueryGetUserXpSuccess") {
      setXp(
        userXp.getUserXp.data.reduce((acc, curr) => acc + curr.level.point, 0)
      );
    } else {
      setXp(0);
    }
  }, [userXpLoading]);

  useGSAP(
    () => {
      gsap.to(landingContainer.current, {
        scale: 13,
        translateY: 550,
        translateX: 200,
        duration: 2,
        delay: 0.5,
        ease: "power2.in",
        onComplete() {
          gsap.to(landingContainer.current, { opacity: 0, duration: 1 });
          setTimeout(() => {
            setPageLoader(false);
          }, 1000);
        },
      });
    },
    { scope: landingContainer }
  );

  return (
    <main className="h-screen relative overflow-hidden">
      {pageLoader && (
        <section
          ref={landingContainer}
          className=" min-h-screen w-full flex justify-center items-center  z-[999] absolute top-0 left-0"
        >
          <Image
            src={"/assets/landing/landing@2x.png"}
            alt="UI Incridea 2024"
            width={1920}
            height={1080}
            priority
            className="image w-full h-full object-cover object-center absolute top-0 left-0"
          />
          <div className="aspect-video w-full relative h-screen min-w-max ">
            <div className="absolute left-1/2 -translate-x-[60%] top-[39%] h-[12%] w-[8%]  ">
              <Image
                height={482}
                width={256}
                className="w-full h-full rounded-lg"
                src="/assets/gif/nosignal.gif"
                alt="no signal"
                priority
              />
            </div>
          </div>
          {/* <div className="absolute  translate-y-[18%]">
            <Arcade />
          </div> */}
        </section>
      )}

      <div className="absolute top-0">
        <HomeUi xp={xp} userAuthStatus={userAuthStatus} />
        <Menu
          router={router}
          isAuthenticated={status === AuthStatus.AUTHENTICATED}
        />
        <HomeFooter />
      </div>
    </main>
  );
}

const HomeFooter = () => {
  return (
    <footer className="absolute w-full text-gray-200 bottom-0 ">
      <p className="text-center p-5 text-sm">
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
  isAuthenticated: boolean;
}> = ({ router, isAuthenticated }) => {
  const navItems = [
    { href: "/events", target: "Events" },
    { href: "/pronites", target: "Pronite" },
    { href: "/gallery", target: "Gallery" },
    { href: "/about", target: "about" },
    // { href: "/sponsors", target: "Sponsors" },
  ];

  return (
    <div className="w-screen overflow-x-hidden flex flex-col absolute bottom-0 left-0 h-full justify-center items-center">
      <div className="lg:flex flex-col hidden  absolute bottom-10 items-center sm:flex-row  md:gap-10 my-24 gap-3  w-fit ">
        <Button
          intent={"primary"}
          className="h-fit w-52  px-4 sm:px-12"
          size={"xlarge"}
          onClick={() => {
            isAuthenticated ? router.push("/profile") : router.push("/login");
          }}
        >
          {!isAuthenticated ? "Register" : "Profile"}
        </Button>
        <Button
          intent={"ghost"}
          className="h-fit w-52 px-4 sm:px-12"
          size={"xlarge"}
          onClick={() => {
            router.push("/explore/level1");
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
                isAuthenticated
                  ? router.push("/profile")
                  : router.push("/login");
              }}
            >
              {!isAuthenticated ? "Register" : "Profile"}
            </Button>
            <Button
              intent={"ghost"}
              className="lg:hidden !bg-primary-800/70 block w-52 md:w-80 justify-center md:justify-end px-12 md:px-16"
              size={"xlarge"}
              onClick={() => {
                router.push("/explore/level1");
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

const HomeUi: FC<{
  xp: number;
  userAuthStatus: boolean;
}> = ({ xp, userAuthStatus }) => {
  useLayoutEffect(() => {
    const scene = document.getElementById("scene") as HTMLElement;

    let parallaxInstance = new Parallax(scene, {
      relativeInput: true,
    });
  });
  useEffect(() => {
    console.log("userAuthStatus", userAuthStatus);
  }, [userAuthStatus]);
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

  const [time, setTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function getRemaingTime() {
    const eventDate = new Date("2024-02-22T09:00:00").getTime();
    const currentDate = new Date().getTime();
    const remainingTime = eventDate - currentDate;

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    setTime({ days, hours, minutes, seconds });
  }

  useEffect(() => {
    getRemaingTime();
    const interval = setInterval(() => {
      getRemaingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex fixed w-full z-50 justify-between md:p-4 p-2 items-start">
        {userAuthStatus ? (
          <div>
            <h3
              className={` text-lg md:text-2xl text-white tracking-widest z-10`}
            >
              <div className="flex flex-row space-x-1 items-center titleFont">
                <Image
                  src={"/assets/png/XP.png"}
                  width={100}
                  height={100}
                  alt="map"
                  className="sm:h-12 sm:w-10 h-10 w-8"
                />

                <div className="text-lg flex flex-col items-center justify-center">
                  <p className={`${VikingHell.className}`}>XP</p>
                  <p className="font-sans relative bottom-2">{xp}</p>
                </div>
              </div>
            </h3>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex flex-col text-white justify-center items-center">
          {/* <GlitchAnimation text={"GAME BEGINS IN"} /> */}
          <GlitchAnimation
            text={`${time.days < 10 ? `0${time.days}` : time.days} :${" "}
            ${time.hours < 10 ? `0${time.hours}` : time.hours} :${" "}
            ${time.minutes < 10 ? `0${time.minutes}` : time.minutes} :${" "}
            ${time.seconds < 10 ? `0${time.seconds}` : time.seconds}`}
          />
        </div>
      </div>
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
        <div
          data-depth="0.2"
          className="absolute flex  items-center  justify-center h-screen w-screen"
        >
          <div className="w-fit mx-auto p-5 mt-[3%]" ref={Logo}>
            <Image
              src={"/assets/home/DoD.png"}
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
    </>
  );
};

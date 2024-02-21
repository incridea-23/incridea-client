import Link from "next/link";
import Button from "@/src/components/button";
import gsap from "gsap";
import { useAuth } from "@/src/hooks/useAuth";
import Image from "next/image";
import { useLayoutEffect, useEffect, useRef } from "react";
import { VikingHell } from "../../pages/_app";
import { NextRouter, useRouter } from "next/router";
import Parallax from "parallax-js";
import { IoClose } from "react-icons/io5";
import Spinner from "../spinner";
import { baseImageUrl } from "@/src/utils/url";

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const MainMenuModal: React.FunctionComponent<Props> = ({
  showModal,
  setShowModal,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (showModal) window.document.body.style.overflowY = "clip";
    else window.document.body.style.overflowY = "auto";
  }, [showModal]);

  return (
    <div
      style={{ display: showModal ? "initial" : "none" }}
      className="w-screen h-screen fixed z-[9999] backdrop-blur-sm inset-0"
    >
      <div className="relative w-full h-full">
        <div className="absolute -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4 z-[9999] bg-blue-400 h-[85%] w-[85%] overflow-clip rounded-xl">
          <HomeUi />
          <Menu
            router={router}
            setShowModal={setShowModal}
            showModal={showModal}
          />
          <HomeFooter />
        </div>
      </div>
    </div>
  );
};

export default MainMenuModal;

const HomeUi: React.FunctionComponent = () => {
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
      <section
        id="scene"
        className="relative bg-gradient-to-b min-h-full from-[#00002a] via-[#1c23bb] to-pink-800/50"
      >
        <div className="h-full w-full absolute">
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

        <div data-depth="0.5" className="absolute  h-full w-full ">
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
        <div data-depth="0.4" className="h-full w-full absolute">
          <Image
            src={`${baseImageUrl}/assets/home/stars.png`}
            alt="Gradient"
            width={1920}
            height={1080}
            className="w-full h-full object-center object-cover absolute "
          />
        </div>

        <div data-depth="0.3" className="absolute h-full w-full">
          <div className="h-full absolute aspect-video right-0  translate-x-[18%]  sm:translate-x-[12%] md:translate-x-[10%] bottom-0 lg:translate-x-[4.1%] translate-y-[4.1%]">
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
          className="absolute flex  items-center  justify-center h-full w-full"
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
        <div data-depth="0.1" className="absolute h-full w-full">
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

const Menu: React.FunctionComponent<{
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  router: NextRouter;
}> = ({ showModal, setShowModal, router }) => {
  const navItems = [
    { href: "/events", target: "Events" },
    { href: "/pronites", target: "Pronite" },
    { href: "/gallery", target: "Gallery" },
    { href: "/about", target: "About" },
    { href: "/sponsors", target: "Sponsors" },
  ];

  const { user, loading, error } = useAuth();

  return (
    <div className="w-full overflow-x-hidden flex flex-col absolute bottom-0 left-0 h-full justify-center items-center">
      <div className="lg:flex flex-col hidden absolute bottom-10 items-center sm:flex-row  md:gap-10 my-24 gap-3  w-fit ">
        <Button
          className="h-fit w-40  px-4 sm:px-12"
          size={"large"}
          onClick={() => {
            setShowModal(false);
          }}
        >
          Resume
        </Button>
        <Link href="/">
          <Button
            intent={"ghost"}
            className="h-fit w-40 px-4 sm:px-12"
            size={"large"}
          >
            Exit
          </Button>
        </Link>
      </div>
      <div className="space-y-5 absolute flex flex-col w-fit h-fit -right-8 bottom-[15%]  lg:absolute ">
        <h3
          className={`text-2xl hidden md:block md:mb-5 sm:text-4xl text-white tracking-widest text-center ${VikingHell.className}`}
        >
          Menu
        </h3>

        <Button
          className="w-40 md:w-64 justify-center md:justify-end px-12 md:px-16 lg:hidden"
          size={"large"}
          onClick={() => {
            setShowModal(false);
          }}
        >
          Resume
        </Button>

        <Link
          href={loading ? "" : user ? "/profile" : "/login"}
          target="_blank"
        >
          <Button
            intent={"primary"}
            className="w-40 md:w-64 justify-center md:justify-end px-12 md:px-16 hidden lg:flex"
            size={"large"}
          >
            {loading ? (
              <Spinner size="small" className="py-[2px]" />
            ) : user ? (
              "Profile"
            ) : (
              "Register"
            )}
          </Button>
        </Link>
        {navItems.map((e, i) => (
          <Link key={i} href={e.href} target="_blank">
            <Button
              className="w-40 md:w-64 justify-center md:justify-end px-12 md:px-16"
              size={"large"}
            >
              {e.target}
            </Button>
          </Link>
        ))}
        {
          <>
            <Link
              href={loading ? "" : user ? "/profile" : "/login"}
              target="_blank"
            >
              <Button
                intent={"ghost"}
                className="lg:hidden !bg-primary-800/70 block w-40 md:w-64 justify-center md:justify-end px-12 md:px-16"
                size={"large"}
              >
                {loading ? (
                  <Spinner size="small" className="py-[2px]" />
                ) : user ? (
                  "Profile"
                ) : (
                  "Register"
                )}
              </Button>
            </Link>
            <Link href="/">
              <Button
                intent={"ghost"}
                className="lg:hidden !bg-primary-800/70 block w-40 md:w-64 justify-center md:justify-end px-12 md:px-16"
                size={"large"}
              >
                Exit
              </Button>
            </Link>
          </>
        }
      </div>
    </div>
  );
};

const HomeFooter = () => {
  return (
    <footer className="absolute w-full text-gray-200 bottom-0 ">
      <p className="text-center p-5 text-sm">© Incridea 2024</p>
    </footer>
  );
};

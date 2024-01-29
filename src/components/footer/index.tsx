// @refresh reset

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsFillSuitHeartFill, BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

export function HomePageFooter() {
  const { RiveComponent } = useRive({
    src: `assets/rive/footer.riv/`,
    stateMachines: ["State Machine 1"],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });
  return (
    <div>
      <RiveComponent className="w-screen   h-[50vh] lg:h-screen " />
      <FooterBody />
    </div>
  );
}

export function FooterBody() {
  return (
    <div
      id="footer"
      style={{willChange: 'transform'}}
      className={`snap-start relative titleFont tracking-wider`}
    >
      <div className="-mt-2 flex flex-col gap-5 md:flex-row bg-[#131e28] text-gray-100 p-5 items-center justify-between">
        <div className="md:basis-1/5">
          <Image
            src="/assets/png/logo-black.png"
            width={150}
            height={100}
            alt="Incridea Logo"
            className="h-auto w-auto"
          />
        </div>
        <div className="md:basis-3/5">
          <ul className="flex flex-wrap whitespace-nowrap flex-row flex-1 gap-2 md:gap-5 justify-center text-sm sm:text-sm items-center ">
            <li className=" text-gray-300 hover:text-gray-100">
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            |
            <li className="text-gray-300 hover:text-gray-100">
              <Link href="/rules">Terms & Conditions</Link>
            </li>
            |
            <li className="text-gray-300 hover:text-gray-100">
              <Link href="/guidelines">Guidelines</Link>
            </li>
            |
            <li className="text-gray-300 hover:text-gray-100">
              <Link href="/refund">Refund Policy</Link>
            </li>
            {/* |
            <li className="text-gray-300 hover:text-gray-100">
              <Link href="/about">About</Link>
            </li> */}
          </ul>
        </div>
        <div className="md:basis-1/5">
          <ul className="flex flex-1 gap-4 justify-center text-2xl items-center ">
            <li className="text-gray-300 hover:text-gray-100">
              <a
                target="_blank"
                href="https://www.instagram.com/incridea/"
                rel="noreferrer"
              >
                <BsInstagram />
              </a>
            </li>
            <li className="text-gray-300 hover:text-gray-100">
              <a
                target="_blank"
                className="text-3xl"
                href="https://www.youtube.com/@incrideanmamit"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-[#0f1821]">
        <p className="text-center p-5 text-gray-200 text-sm">
          <Link
            className="flex justify-center items-center tracking-normal transition-all hover:tracking-widest hover:text-gray-300"
            href="/team"
          >
            Made with <BsFillSuitHeartFill className="mx-2" /> by Technical Team
          </Link>
          © Incridea 2023
        </p>
      </div>
    </div>
  );
}

export default function Footer() {
  const router = useRouter();
  if (router.pathname === "/") return null;
  if (router.pathname === "/gallery") return null;
  if (router.pathname === "/pronites") return null;
  return <FooterBody />;
}

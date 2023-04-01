// @refresh reset

import { titleFont } from "@/src/utils/fonts";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillYoutube } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  const { RiveComponent: Footer } = useRive({
    src: `assets/rive/footer.riv/`,
    stateMachines: ["State Machine 1"],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });
  return (
    <div className={`${titleFont.className} tracking-wider`}>
      <Footer className="w-screen   h-[50vh] lg:h-screen " />
      <div className="-mt-2 flex flex-col gap-5 md:flex-row bg-[#131e28] text-gray-100 p-5 items-center justify-between">
        <div className="md:basis-1/5">
          <Image
            src="/assets/png/logo-black.png"
            width={150}
            height={100}
            alt="Incridea Logo"
          />
        </div>
        <div className="md:basis-3/5">
          <ul className="flex flex-wrap whitespace-nowrap flex-row flex-1 gap-2 md:gap-5 justify-center text-sm sm:text-sm items-center ">
            <li className=" text-gray-300 hover:text-gray-100">
              <Link href="/about">Privacy policy</Link>
            </li>
            |
            <li className="text-gray-300 hover:text-gray-100">
              <Link href="/about">Terms & condition</Link>
            </li>
            |
            <li className="text-gray-300 hover:text-gray-100">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="md:basis-1/5">
          <ul className="flex flex-1 gap-4 justify-center text-2xl items-center ">
            <li className="text-gray-300 hover:text-gray-100">
              <a
                target="_blank"
                href="https://www.instagram.com/incridea/"
                rel="noreferrer">
                <BsInstagram />
              </a>
            </li>
            <li className="text-gray-300 hover:text-gray-100">
              <a
                target="_blank"
                className="text-3xl"
                href="https://www.instagram.com/incridea/"
                rel="noreferrer">
                <FaYoutube />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-[#0f1821]">
        <p className="text-center p-5 text-white   text-sm">
          ©Incridea 2023 - All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;

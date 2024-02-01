import { NextPage } from "next";
import React, { useEffect } from "react";
import SponsorCard from "../components/sponsors/sponsorCard";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import sponsors from "../../public/assets/json/sponsors.json";

const sponsorDetails: {
  name: string;
  tier: string;
  desc: string;
  websiteURL: string;
  imageURL: string;
}[] = sponsors;

const Sponsors: NextPage = () => {
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, 1], [0.1, 1]);

  return (
    <>
      {/* --mono-blue: #008fff; --mono-pink: #ffb3ff; --mono-red: #ff537a;
      --mono-yellow: #ffffb5; --mono-green: #00ffb5; --mono-tile: #121217; */}
      <div className="pt-16 px-10 flex flex-col items-center justify-center overflow-clip w-full relative bg-primary-300">
        <svg
          className="absolute h-full"
          // width="804"
          // height="1782"
          viewBox="0 0 804 1782"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            style={{ pathLength: scrollYProgress }}
            d="M68.5 243C-48.8626 70.3477 59.6294 -9.84314 222 53.5C380.792 115.447 737.744 -21.6382 772.104 135.039C813.013 321.58 517.121 418.808 370.451 277.982C252.519 164.748 -50.5732 307.13 26.3392 459.042C106.567 617.502 425.151 542.662 642.208 527.992C715.053 523.068 774.746 540.718 783.001 608.405C790.155 667.063 642.208 862.646 434.26 972.516C210.364 1090.81 98.6939 1056.6 86.16 930.474C73.1768 799.827 201.73 772.983 378.997 753.337C586.375 730.354 778.941 797.621 761.849 1035.3C744.665 1274.28 291.26 1151.33 132.877 1258.4C21.9428 1333.39 -52.9385 1552.22 220.528 1701.32C493.994 1850.43 757.291 1635.15 778.941 1466.98C800.59 1298.81 404.634 1242.19 331.71 1340.85C213.02 1501.43 444.259 1713.61 769 1726.5"
            stroke="url(#paint0_linear_20_2)"
            strokeWidth="21"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_20_2"
              x1="0.0382301"
              y1="-44.1245"
              x2="776.691"
              y2="1791.39"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#008FFF" />
              <stop offset="0.247107" stopColor="#00FFB5" />
              <stop offset="0.486552" stopColor="#FFFFB5" />
              <stop offset="0.739331" stopColor="#FF537A" />
              <stop offset="1" stopColor="#FFB3FF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative text-red-50 mt-10">
          <h1 className="text-5xl text-center mb-3">SPONSORS</h1>
          <p className="text-2xl text-center">
            Big names backing an extraordinary fest.
          </p>
        </div>
        <div className="relative py-3 md:py-16 min-h-[93vh] md:px-14 lg:px-20 flex flex-col gap-6 md:gap-11 lg:gap-16 w-full">
          {sponsorDetails.map((sponsor, index) => (
            <SponsorCard
              key={index}
              sponsor={sponsor}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sponsors;

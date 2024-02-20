import { NextPage } from "next";
import React, { useRef, useState } from "react";
import SponsorCard from "../components/sponsors/sponsorCard";
import sponsors, { Sponsor } from "../components/sponsors/sponsorDetails";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ReactLenis } from "@studio-freight/react-lenis";

const sponsorDetails: Sponsor[] = sponsors;

gsap.registerPlugin(ScrollTrigger);

const Sponsors: NextPage = () => {
  const pathRef = useRef<SVGPathElement | null>(null);

  // FIXME: hard code the actual length of the svg path being used
  const pathLengthRef = useRef<number>(8500);
  const [scrollYProgress, setScrollYProgress] = useState<number>(0);

  // strokeDashArray = [minLengthOfSVGPath, maxLengthOfSVGPath]
  const strokeDashArray = useRef<number[]>([1000, 8500]);

  useGSAP(() => {
    if (pathRef.current)
      pathLengthRef.current = pathRef.current.getTotalLength();

    strokeDashArray.current[1] = Math.min(
      pathLengthRef.current,
      strokeDashArray.current[1]
    );

    gsap.timeline({
      scrollTrigger: {
        trigger: ".trigger",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollYProgress(() => self.progress);
        },
      },
    });
  });

  return (
    <ReactLenis root>
      <div className="trigger py-16 px-10 flex flex-col items-center justify-center overflow-clip w-full relative">
        <svg
          className="absolute h-full top-0 hidden md:block"
          viewBox="0 0 804 1782"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeDasharray="10 30"
            d="M68.5 243C-48.8626 70.3477 59.6294 -9.84314 222 53.5C380.792 115.447 737.744 -21.6382 772.104 135.039C813.013 321.58 517.121 418.808 370.451 277.982C252.519 164.748 -50.5732 307.13 26.3392 459.042C106.567 617.502 425.151 542.662 642.208 527.992C715.053 523.068 774.746 540.718 783.001 608.405C790.155 667.063 642.208 862.646 434.26 972.516C210.364 1090.81 98.6939 1056.6 86.16 930.474C73.1768 799.827 201.73 772.983 378.997 753.337C586.375 730.354 778.941 797.621 761.849 1035.3C744.665 1274.28 291.26 1151.33 132.877 1258.4C21.9428 1333.39 -52.9385 1552.22 220.528 1701.32C493.994 1850.43 757.291 1635.15 778.941 1466.98C800.59 1298.81 404.634 1242.19 331.71 1340.85C213.02 1501.43 444.259 1713.61 769 1726.5"
            stroke="white"
            strokeWidth="0.3"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute h-full top-0 hidden md:block"
          viewBox="0 0 804 1782"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            style={{
              strokeDasharray: `${
                scrollYProgress *
                  (strokeDashArray.current[1] - strokeDashArray.current[0]) +
                strokeDashArray.current[0]
              } ${pathLengthRef.current}`,
            }}
            d="M68.5 243C-48.8626 70.3477 59.6294 -9.84314 222 53.5C380.792 115.447 737.744 -21.6382 772.104 135.039C813.013 321.58 517.121 418.808 370.451 277.982C252.519 164.748 -50.5732 307.13 26.3392 459.042C106.567 617.502 425.151 542.662 642.208 527.992C715.053 523.068 774.746 540.718 783.001 608.405C790.155 667.063 642.208 862.646 434.26 972.516C210.364 1090.81 98.6939 1056.6 86.16 930.474C73.1768 799.827 201.73 772.983 378.997 753.337C586.375 730.354 778.941 797.621 761.849 1035.3C744.665 1274.28 291.26 1151.33 132.877 1258.4C21.9428 1333.39 -52.9385 1552.22 220.528 1701.32C493.994 1850.43 757.291 1635.15 778.941 1466.98C800.59 1298.81 404.634 1242.19 331.71 1340.85C213.02 1501.43 444.259 1713.61 769 1726.5"
            stroke="url(#paint0_linear_20_2)"
            strokeWidth="15"
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
              <stop stopColor="#008fff" />
              <stop offset="0.142857" stopColor="#ffb3ff" />
              <stop offset="0.285714" stopColor="#ff537a" />
              <stop offset="0.428571" stopColor="#ffffb5" />
              <stop offset="0.571428" stopColor="#00ffb5" />
              <stop offset="0.714285" stopColor="#ffffb5" />
              <stop offset="1" stopColor="#ff537a" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative text-red-50 mt-10">
          <h1 className="text-5xl text-center mb-2 rounded-xl backdrop-blur-sm w-fit px-1 py-1 mx-auto">
            SPONSORS
          </h1>
          <p className="text-2xl text-center">
            Iconic names coming together for an extraordinary fest.
          </p>
        </div>
        <div className="relative py-3 md:py-16 min-h-[93vh]  flex flex-col justify-center items-center gap-6 md:gap-11 w-full max-w-6xl">
          {sponsorDetails.map((sponsor, index) => (
            <SponsorCard
              key={index}
              sponsor={sponsor}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </ReactLenis>
  );
};

export default Sponsors;

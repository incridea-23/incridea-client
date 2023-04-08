import { titleFont } from "@/src/utils/fonts";
import { NextPage } from "next";
import Image from "next/image";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useRef } from "react";
import AboutIncridea from "@/src/components/pages/about/AboutIncridea";
import AboutCollege from "@/src/components/pages/about/AboutCollege";
import AboutTeam from "@/src/components/pages/about/AboutTeam";

const About: NextPage = () => {
  const containerRef = useRef(null);

  return (
    <div
      data-scroll-container
      ref={containerRef}
      className="bg-gradient-to-b  from-[#41acc9]  via-[#075985] to-[#2d6aa6]">
      {/* 1. About Incridea */}
      <AboutIncridea />

      {/* 2. About College */}
      <AboutCollege />

      {/* 3. About Team */}
      {/* <AboutTeam /> */}
    </div>
  );
};

export default About;

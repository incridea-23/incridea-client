import { NextPage } from "next";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useRef } from "react";
import AboutIncridea from "@/src/components/pages/about/AboutIncridea";
import AboutCollege from "@/src/components/pages/about/AboutCollege";

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

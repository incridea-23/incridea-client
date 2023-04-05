import { titleFont } from '@/src/utils/fonts';
import { NextPage } from 'next';
import Image from 'next/image';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useRef } from 'react';
import AboutIncridea from '@/src/components/pages/about/AboutIncridea';
import AboutCollege from '@/src/components/pages/about/AboutCollege';
import AboutTeam from '@/src/components/pages/about/AboutTeam';

const About: NextPage = () => {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
      }}
      watch={[]}
      containerRef={containerRef}
    >
      <main
        data-scroll-container
        ref={containerRef}
        className="bg-gradient-to-b from-[#5CA3AD]  via-[#1a6779] to-[#0e4450]"
      >
        {/* 1. About Incridea */}
        <AboutIncridea />

        {/* 2. About College */}
        <AboutCollege />

        {/* 3. About Team */}
        <AboutTeam />
      </main>
    </LocomotiveScrollProvider>
  );
};

export default About;

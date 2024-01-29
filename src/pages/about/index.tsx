import { NextPage } from 'next';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { useRef } from 'react';
import AboutCollege from '@/src/components/pages/about/AboutCollege';
import AboutIncridea from '@/src/components/pages/about/AboutIncridea';

const About: NextPage = () => {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-b  from-[#41acc9]  via-[#075985] to-[#2d6aa6]"
    >
      <AboutCollege />
      <AboutIncridea />
    </div>
  );
};

export default About;


import Image from 'next/image';
import { FC } from 'react';
import { motion,useScroll,useTransform } from 'framer-motion';

const AboutIncridea: FC = () => {
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress,[0,1],["0%","-100%"])
  return (
    <>
      <div className="relative h-96 w-full overflow-hidden">
        <motion.div style={{y}} className='relative w-full h-full'>
        <Image
          src="/assets/png/incrediaAbout.png"
          alt="Incridea Banner"
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black z-10"></span>
        </motion.div>        
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <h1
              data-scroll
              data-scroll-speed="2"
              className={`titleFont text-4xl lg:text-7xl text-center p-5 text-white`}
            >
              About Incridea
            </h1>
          </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20 lg:p-10 p-5 basis-1/2 my-5">
        <Image
          src="/assets/png/logo-black.png"
          alt="Incridea Logo"
          width={500}
          height={500}
        />
        <div className="text-white text-lg lg:text-xl text-justify basis-1/2">
          Incridea, the annual college festival of NMAM Institute of Technology,
          Nitte, has rapidly grown into one of the most awaited cultural events
          in the region within a short span of time. The festival has become a
          symbol of creativity, innovation, and fun, attracting students from
          various colleges across the country. With an array of exciting
          activities, including fashion shows, music and dance competitions,
          drama competitions, sports competitions, coding competitions,
          hackathons, robotics competitions, and workshops, Incridea provides a
          platform for students to showcase their talents and enhance their
          skills and knowledge. The festival also hosts renowned artists and
          musicians, adding to the excitement and energy of the event. With its
          growth and success, Incridea has become a testament to the spirit and
          dedication of the NMAM Institute of Technology in promoting student
          talent and providing a memorable experience for all who attend.
        </div>
      </div>
    </>
  );
};

export default AboutIncridea;


import Image from 'next/image';
import { FC } from 'react';
import { motion,useScroll,useTransform } from 'framer-motion';


const AboutCollege: FC = () => {
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress,[0,1],["40%","0%"])
  return (
    <>
      <div 
      className="relative h-96 w-full overflow-hidden">
        <motion.div style={{y}}className='relative h-full w-full overflow-hidden' >
        <Image
          src="/assets/png/collegeAbout.png"
          alt="Incridea Banner"
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
        />
         <span className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black z-10"></span>
        </motion.div>
       
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <h1 className={`titleFont text-4xl p-4 text-center lg:text-7xl text-white`}>
              About NMAMIT
            </h1>
          </div>
        
      </div>

      <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-10 lg:gap-20 lg:p-10 p-5 basis-1/2">
        <Image
          src="/assets/png/nitteLogoWhite.png"
          alt="Incridea Logo"
          width={600}
          height={600}
        />
        <div className="text-white text-lg lg:text-xl text-justify basis-1/2 my-5">
          N.M.A.M Institute of Technology is a prestigious institution that has
          established itself as a leading engineering, management, and MCA
          institution. Founded by Justice K S Hegde in 1986, the college has
          come a long way from its humble beginnings to become a
          multi-disciplinary university offering diverse programs. With a focus
          on innovation and excellence, NMAMIT has earned a well-deserved
          reputation in the region.
          <div className="py-5" />
          The college&apos;s state-of-the-art facilities, experienced faculty,
          and industry-driven curriculum prepare students to meet the challenges
          of the real world and become leaders in their respective fields. The
          college&apos;s emphasis on research and development has resulted in
          numerous accolades and awards, making it a top-ranked institution in
          India and globally.
        </div>
      </div>
    </>
  );
};

export default AboutCollege;

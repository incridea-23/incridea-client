import Image from "next/image";
import { FC } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutCollege: FC = () => {
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  return (
    <>
      <div className="relative h-96 w-full overflow-hidden">
        <motion.div style={{ y }} className="relative w-full h-full">
          <Image
            src="/assets/png/collegeAbout.png"
            alt="college Banner"
            width={500}
            height={500}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black z-10"></span>
        </motion.div>
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <h1 className={`titleFont text-4xl lg:text-7xl text-center p-5 text-white`}>
            About NMAMIT
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20 lg:p-10 p-5 basis-1/2 my-5">
        <Image
          src="/assets/png/nitteLogoWhite.png"
          alt="Incridea Logo"
          width={600}
          height={600}
          className="h-auto w-auto"
        />
        <div className="bodyFont text-white text-lg lg:text-xl text-justify basis-1/2 my-5">
          Nitte Mahalinga Adyantaya Memorial Institute of Technology(NMAMIT), Nitte,
          established in 1986 and recognized by the All India Council for Technical
          Education, New Delhi, has been a constituent college of Nitte (Deemed to be
          University), Mangaluru, since June 2022.
          <div className="py-3" />
          Ranked 175 in the National Institutional Ranking Framework (NIRF) 2022 by MHRD,
          GoI among the engineering colleges in India, the College has been placed under
          the &apos;Platinum&apos; category for having high industry linkages by the AICTE-CII
          Survey of Industry-Linked Technical Institutes 2020. NMAMIT, the off-campus
          centre of Nitte DU located at Nitte Village, has active collaborations with
          several international universities and organizations for faculty and student
          exchanges, research, internships, and placements. (For details, visit{' '}
          <a className="hover:underline" href="https://.nmamit.nitte.edu.in">www.nmamit.nitte.edu.in</a>)
        </div>
      </div>
    </>
  );
};

export default AboutCollege;

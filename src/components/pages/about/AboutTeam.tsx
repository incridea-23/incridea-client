import { titleFont } from '@/src/utils/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const AboutTeam: FC = () => {
  return (
    <>
      <div className="relative h-96 w-full">
        <Image
          src="https://incridemo.web.app/events/EC/SHARKTANK.jpg"
          alt="Incridea Banner"
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <span className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black z-10">
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            <h1
              data-scroll
              data-scroll-speed="2"
              className={`${titleFont.className} text-4xl lg:text-7xl text-white`}
            >
              Incridea&apos;s Code Wizards
            </h1>
            <p
              data-scroll
              data-scroll-speed="2"
              className="text-white text-xl lg:text-2xl font-bold"
            >
              Meet our developers
            </p>
          </div>
        </span>
      </div>

      <div className="flex flex-wrap p-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white bg-opacity-30 rounded-lg p-5 text-center"
        >
          <div className="flex justify-center">
            <Image
              src="https://incridemo.web.app/events/EC/SHARKTANK.jpg"
              alt="Incridea Banner"
              width={250}
              height={250}
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col mt-2">
            <h1 className="text-white font-bold text-2xl">John Doe</h1>
            <p className="text-gray-200 text-md">Full-stack Developer</p>
          </div>

          <div className="flex gap-2 mt-2 justify-center">
            <Link href="">
              <AiFillLinkedin
                size={30}
                fill="#fff"
                className="cursor-pointer"
              />
            </Link>
            <Link href="">
              <AiFillGithub size={30} fill="#fff" className="cursor-pointer" />
            </Link>
          </div>

          <hr className="text-gray-400 my-2" />

          {/* Quote section */}
          <div className="relative">
            <div>&quot;</div>
            <div>
              Man never made any material as resilient as the human spirit.
            </div>
            <div>&quot;</div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutTeam;

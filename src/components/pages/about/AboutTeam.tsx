import { titleFont } from '@/src/utils/fonts';
import Image from 'next/image';
import { FC } from 'react';

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
    </>
  );
};

export default AboutTeam;

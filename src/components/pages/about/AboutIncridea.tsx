import { titleFont } from '@/src/utils/fonts';
import Image from 'next/image';
import { FC } from 'react';

const AboutIncridea: FC = () => {
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
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <h1
              data-scroll
              data-scroll-speed="2"
              className={`${titleFont.className} text-4xl lg:text-7xl text-white`}
            >
              About Incridea
            </h1>
          </div>
        </span>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20 p-10 basis-1/2">
        <Image
          src="/assets/png/logo.png"
          alt="Incridea Logo"
          width={500}
          height={500}
        />

        <div className="text-white text-lg lg:text-2xl font-bold basis-1/2">
          Never gonna give you up Never gonna let you down Never gonna run
          around and desert you Never gonna make you cry Never gonna say goodbye
          Never gonna tell a lie and hurt you Never gonna give you up Never
          gonna let you down Never gonna run around and desert you Never gonna
          make you cry Never gonna say goodbye Never gonna tell a lie and hurt
          you
          <div className="py-5" />
          Never gonna give you up Never gonna let you down Never gonna run
          around and desert you Never gonna make you cry Never gonna say goodbye
          Never gonna tell a lie and hurt you Never gonna give you up Never
          gonna let you down Never gonna run around and desert you Never gonna
          make you cry Never gonna say goodbye Never gonna tell a lie and hurt
          you
        </div>
      </div>
    </>
  );
};

export default AboutIncridea;

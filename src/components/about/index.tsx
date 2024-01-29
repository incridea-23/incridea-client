import { FC } from 'react';
import TextAnimation from '../animation/text';
import Image from 'next/image';
import { BiDownload } from 'react-icons/bi';

const About: FC = () => {
  const handleDownload = (path: string, name: string) => {
    // fallback to window.open if the browser doesn't support the download attribute
    const fileUrl = path;
    const fileName = name;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  return (
    <section
      data-scroll
      data-scroll-speed="5"
      className="group text-white mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8 mb-36 lg:mb-48"
    >
      <div className="grid  grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-2xl mt-12">
          <TextAnimation
            text="About Incridea"
            className={`titleFont`}
            textStyle="text-xl font-semibold lg:text-3xl"
          />
          <div className="text-sm lg:text-lg mt-4 space-y-2 bodyFont">
            <p>
              Incridea, a four-day National-Level extravaganza will play host to
              over 60 events, spanning the technical, non-technical, and
              cultural spheres, replete with cultural soirées and pronites,
              promising to be an experience of a lifetime.
            </p>
            <p>
              The stunning marine world, with all its wonders and marvels, will
              be unveiled before your very eyes, as you revel in the vivacity of
              these momentous days, forging memories that shall be etched in
              your minds forevermore.
            </p>
          </div>
        </div>

        <div className="mx-auto">
          <div className="text-center w-fit relative">
            <Image
              src="/assets/png/emblem.png"
              width={300}
              height={300}
              className={
                'group-hover:scale-110 group-hover:-translate-y-2 transform transition-all duration-500'
              }
              alt="Incridea Emblem"
            />
            <Image
              src="/assets/png/ryoko.png"
              width={300}
              height={300}
              className="absolute w-auto bottom-0 group-hover:scale-105 group-hover:-translate-y-2 transform transition-all duration-500"
              alt="Incridea Ryoko"
            />
          </div>
          <div
            className={`mt-2 text-lg flex justify-center space-x-2 items-center titleFont`}
          >
            <a
              onClick={() =>
                handleDownload('/assets/pdf/rulebook.pdf', 'Rulebook.pdf')
              }
              className="cursor-pointer px-3 flex items-center gap-2 py-2 text-md md:text-lg lg:text-xl font-semibold text-center text-white transition duration-300 rounded-bl-xl rounded-tr-xl bg-white/30 hover:bg-white/40"
            >
              <BiDownload /> Rule book
            </a>
            <a
              onClick={() => handleDownload('https://drive.google.com/file/d/1mglh-NsLE_AOjY969olQNppZcQyr5p4F/view?usp=sharing', 'schedule.pdf')}
              className="cursor-pointer px-3 flex items-center gap-2 py-2 text-md md:text-lg lg:text-xl font-semibold text-center text-white transition duration-300 rounded-bl-xl rounded-tr-xl bg-white/30 hover:bg-white/40"
            >
              <BiDownload /> Schedule
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

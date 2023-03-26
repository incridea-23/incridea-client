import { useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import React, { FC } from 'react';

const GalleryPeek: FC = () => {
  const images = [
    'v1678613776/1.jpg',
    'v1678613775/2.jpg',
    'v1678613774/3.jpg',
  ]; // TODO: Replace with actual images (top 3)

  const { scrollY } = useScroll();
  const [y, setY] = React.useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setY(latest);
  });

  return (
    <section className="relative">
      <div
        className="w-[500%] lg:w-[200%] flex gap-1 lg:gap-5 py-2 lg:py-5 items-center absolute left-0 border border-t-2 border-b-2 border-gray-400 backdrop-filter"
        style={{
          transform: `translateY(${y * 0.05}px)`,
        }}
      >
        {images.map((i) => {
          return (
            <div className="flex justify-center items-start gap-5" key={i}>
              <Image
                src={'https://res.cloudinary.com/dpfpk49oa/image/upload/' + i}
                alt="Gallery Image"
                width={500}
                height={300}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-5"></div>
            </div>
          );
        })}
        {images.map((i) => {
          return (
            <div className="flex justify-center items-start gap-5" key={i}>
              <Image
                src={'https://res.cloudinary.com/dpfpk49oa/image/upload/' + i}
                alt="Gallery Image"
                width={500}
                height={300}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GalleryPeek;

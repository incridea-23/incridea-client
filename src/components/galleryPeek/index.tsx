import Image from 'next/image';
import React, { FC } from 'react';

const GalleryPeek: FC = () => {
  const images = [
    'v1678613776/1.jpg',
    'v1678613775/2.jpg',
    'v1678613774/3.jpg',
  ]; // TODO: Replace with actual images (top 3)

  return (
    <div className="flex items-center justify-center backdrop-filter backdrop-blur-lg">
      <div className="w-[400%] h-52 border-t border-b border-gray-400 overflow-visible relative">
        <div className="w-[200%] flex items-center h-52 justify-around absolute left-0 animate">
          {images.map((i) => {
            return (
              <div
                className="flex justify-center items-start w-[20rem]"
                key={i}
              >
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
              <div
                className="flex justify-center items-start w-[20rem]"
                key={i}
              >
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
      </div>
    </div>
  );
};

export default GalleryPeek;

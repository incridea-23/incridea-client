import { NextPage } from 'next';
import { motion } from 'framer-motion';
import GallerySlide from '@/src/components/galleryslide';
import { FooterBody } from '@/src/components/footer';
import { titleFont } from '@/src/utils/fonts';

const Gallery: NextPage = () => {
  const years = [2019, 2020, 2022];
  const imageCounts = [13, 23, 19];

  const generateImagePaths = (
    year: number,
    count: number,
    extension: string
  ) => {
    const imagePaths = [];
    for (let i = 1; i <= count; i++) {
      imagePaths.push(`${year}/${i}.${extension}`);
    }
    return imagePaths;
  };

  const img2019: string[] = generateImagePaths(
    years[0],
    imageCounts[0],
    'jpeg'
  );
  const img2020: string[] = generateImagePaths(years[1], imageCounts[1], 'jpg');
  const img2022: string[] = generateImagePaths(years[2], imageCounts[2], 'jpg');

  return (
    <div className="flex flex-col h-screen w-full overflow-x-hidden overflow-y-auto text-gray-100 bg-gradient-to-b from-[#2d6aa6] to-[#052749] snap-y snap-mandatory relative">
      {/* Header Part */}
      <div
        id="head"
        className="snap-start min-h-screen w-full relative flex overflow-hidden bg-black/60"
      >
        <video
          autoPlay
          loop
          muted
          className="object-cover object-center w-full h-full opacity-50 scale-[1.1]"
        >
          <source src="gallery.mp4" type="video/mp4"></source>
        </video>
        <motion.div
          animate={{ y: [20, 0], opacity: [0, 1], repeatCount: 1 }}
          transition={{ duration: 3 }}
          className={`${titleFont.className} absolute top-1/2 flex w-full justify-center flex-col`}
        >
          <h1 className="text-4xl sm:text-6xl text-center">
            The Wall of Incridea
          </h1>
          <h2 className="text-2xl sm:text-4xl text-center">
            Incridea Over the Years
          </h2>
        </motion.div>
        <motion.div
          animate={{ y: [30, 0], opacity: [0, 1], repeatCount: 1 }}
          transition={{ duration: 3 }}
          style={{ x: '-50%' }}
          className="h-1 w-40 hidden sm:flex bg-gray-100 absolute bottom-8 left-1/2"
        ></motion.div>
      </div>

      <GallerySlide
        title={'2022'}
        next={'2020'}
        prev={'head'}
        imgArr={img2022}
      />
      <GallerySlide
        title={'2020'}
        next={'2019'}
        prev={'2022'}
        imgArr={img2020}
      />
      <GallerySlide
        title={'2019'}
        next={'footer'}
        prev={'2020'}
        imgArr={img2019}
      />

      <FooterBody />
    </div>
  );
};

export default Gallery;

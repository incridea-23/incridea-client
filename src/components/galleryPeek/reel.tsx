import { titleFont } from '@/src/utils/fonts';
import Link from 'next/link';
import GalleryPeek from '.';
import Button from '../button';

const GalleryReel = () => {
  return (
    <section>
      <h1
        className={`my-10 text-2xl lg:text-4xl text-center font-bold text-white ${titleFont.className}`}
      >
        The Wall of Incridea
      </h1>
      <div className="relative">
        <GalleryPeek />
        <Link
          href={'/gallery'}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        >
          <Button>View Gallery</Button>
        </Link>
      </div>
    </section>
  );
};

export default GalleryReel;

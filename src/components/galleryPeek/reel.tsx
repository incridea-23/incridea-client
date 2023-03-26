import Link from 'next/link';
import GalleryPeek from '.';
import Button from '../button';

const GalleryReel = () => {
  return (
    <section className="mt-20">
      <div className="-rotate-12 blur-xl">
        <GalleryPeek />
      </div>
      <div className="rotate-[20deg]">
        <GalleryPeek />
        <Link
          href={'/gallery'}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <Button>View Gallery</Button>
        </Link>
      </div>
    </section>
  );
};

export default GalleryReel;

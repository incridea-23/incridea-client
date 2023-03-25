import Link from 'next/link';
import GalleryPeek from '.';
import Button from '../button';

const GalleryReel = () => {
  return (
    <>
      <div className="-rotate-12 blur-sm">
        <GalleryPeek />
      </div>
      <div className="rotate-[20deg]">
        <GalleryPeek />
      </div>
      <Link href={'/gallery'}>
        <Button className="mx-auto mt-20">View Gallery</Button>
      </Link>
    </>
  );
};

export default GalleryReel;

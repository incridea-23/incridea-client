import { type NextPage } from 'next';
import Navbar from '../components/navbar';
import { useAuth } from '../hooks/useAuth';
import CountDown from '../components/countdown';
import About from '../components/about';
import Image from 'next/image';
import { useRef } from 'react';
import GalleryReel from '../components/galleryPeek/reel';
import Hero from '../components/hero';

const Home: NextPage = () => {
  const ref = useRef(null);
  const { status, user, error, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Loading page here
  if (error) return <div>Something went wrong</div>; // Error page here

  return (
    <div ref={ref} className="overflow-x-hidden">
      <Navbar status={status} user={user} />

      <div>
        {/* 1. Hero Section */}
        <Hero ref={ref} />

        <div className="relative bg-gradient-to-b h-[300vh] from-[#5CA3AD]  via-[#2b8da2] to-[#2b8da2]">
          <div className="h-[200px]"></div>

          {/* 2. Countdown Section */}
          <CountDown />

          {/* 3. About Section */}
          <About />

          {/* 4. Gallery Reel Section */}
          <GalleryReel />

          {/* 5. Footer Section */}
          <section>
            <Image
              className="absolute bottom-0 w-screen h-auto"
              src="/assets/svg/atlantis-ai.svg"
              alt=""
              height={500}
              width={1000}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
function Sun() {
  return (
    <div className="w-40 h-40 rounded-full bg-yellow-400 relative">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className={`w-full h-2 rounded-full absolute ${
            index % 2 === 0 ? 'bg-transparent' : 'bg-yellow-500'
          }`}
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${index * 45}deg) translateY(-50%)`,
            background: `linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)`,
          }}
        />
      ))}
    </div>
  );
}

import { useAuth } from '@/src/hooks/useAuth';
import { NextPage } from 'next';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useRef } from 'react';
import TextAnimation from '@/src/components/animation/text';
import { titleFont } from '@/src/utils/fonts';

const Profile: NextPage = () => {
  const { status, user, loading } = useAuth();
  const containerRef = useRef(null);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#5CA3AD]  via-[#1a6779] to-[#0e4450]">
        <h1 className="text-2xl font-bold text-white">Loading...</h1>
      </div>
    ); // Loading page here

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
      }}
      watch={[]}
      containerRef={containerRef}
    >
      <main
        data-scroll-container
        ref={containerRef}
        className="bg-gradient-to-b from-[#5CA3AD]  via-[#1a6779] to-[#0e4450] p-10"
      >
        {/* 1. Profile Info section */}
        <section data-scroll-section className="text-white min-h-screen">
          <div className="flex items-center">
            <TextAnimation
              text={`Welcome ${user?.name}!`}
              textStyle="text-2xl lg:text-4xl font-bold"
              className={titleFont.className}
            />
            <span className="animate-wave text-2xl lg:text-4xl">👋</span>
          </div>
          <br />
          <TextAnimation
            text="Ready to dive in?"
            textStyle="text-lg lg:text-2xl"
          />
        </section>

        {/* 2. Registered Events section */}
        <section data-scroll-section className="min-h-screen"></section>

        {/* 3. Teams section */}
        <section data-scroll-section className="min-h-screen"></section>
      </main>
    </LocomotiveScrollProvider>
  );
};

export default Profile;

import { useAuth } from '@/src/hooks/useAuth';
import { NextPage } from 'next';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useRef } from 'react';
import { titleFont } from '@/src/utils/fonts';
import ProfileInfo from '@/src/components/pages/profile/profileInfo';

const Profile: NextPage = () => {
  const { error, user, loading } = useAuth();
  const containerRef = useRef(null);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#5CA3AD]  via-[#1a6779] to-[#0e4450]">
        <h1 className="text-2xl font-bold text-white">Loading...</h1>
      </div>
    ); // Loading page here

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#5CA3AD]  via-[#1a6779] to-[#0e4450]">
        <h1 className="text-2xl font-bold text-white">
          Something went wrong. Please try again later.
        </h1>
      </div>
    ); // Error page here

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
        className="bg-gradient-to-b from-[#5CA3AD]  via-[#1a6779] to-[#0e4450]"
      >
        {/* 1. Profile Info section */}
        <ProfileInfo user={user} />

        {/* 2. Registered Events section */}
        <section data-scroll-section className="min-h-screen">
          <h1
            className={`${titleFont.className} text-2xl lg:text-4xl font-bold text-center text-white flex justify-center`}
          >
            Dive into action with your upcoming adventures!
          </h1>
        </section>

        {/* 3. Teams section */}
        <section data-scroll-section className="min-h-screen"></section>
      </main>
    </LocomotiveScrollProvider>
  );
};

export default Profile;

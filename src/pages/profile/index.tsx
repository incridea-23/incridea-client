import { useAuth } from '@/src/hooks/useAuth';
import { NextPage } from 'next';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useRef } from 'react';
import ProfileInfo from '@/src/components/pages/profile/profileInfo';
import UserEvents from '@/src/components/pages/profile/registeredEvents';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';

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
      <Toaster />
      <main
        data-scroll-container
        ref={containerRef}
        className="relative bg-gradient-to-b from-[#46aacf]  via-[#075985] to-[#2d6aa6]"
      >
        <Image
          src="/assets/png/waterflare.png"
          height={1000}
          width={1000}
          alt="flare"
          className="absolute opacity-40 top-0 right-0"
        />
        {/* 1. Profile Info section */}
        <ProfileInfo user={user} />

        {/* 2. Registered Events section & Teams section */}
        <UserEvents userId={user?.id!} />
      </main>
    </LocomotiveScrollProvider>
  );
};

export default Profile;

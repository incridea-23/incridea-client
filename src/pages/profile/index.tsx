import { useAuth } from '@/src/hooks/useAuth';
import { NextPage } from 'next';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { useRef } from 'react';
import ProfileInfo from '@/src/components/pages/profile/profileInfo';
import UserEvents from '@/src/components/pages/profile/registeredEvents';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Button from '@/src/components/button';
import Image from 'next/image';
import Loader from '@/src/components/Loader';

const Profile: NextPage = () => {
  const { error, user, loading } = useAuth();
  const containerRef = useRef(null);

  if (loading)
    return (
      <Loader/>
    ); // Todo: Loading page here

  if (!user)
    return (
      <div className="flex flex-col text-center space-y-3 items-center justify-center h-screen bg-gradient-to-bl from-[#46aacf]  via-[#075985] to-[#2d6aa6]">
        {/* Todo: Any graphic to fill space */}
        <div className="flex z-10 justify-center items-center h-96 mt-8">
            <Image src={ '/assets/png/diver.png' } alt="404" width={400} height={400} />
        </div>
        <h1 className="bodyFont lg:text-xl text-lg text-white -translate-y-10">
          Hey there! You need to login to view your profile page.
        </h1>
        <Link href="/login" className='-translate-y-5'>
          <Button intent={'primary'}>Login / Register</Button>
        </Link>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#46aacf]  via-[#075985] to-[#2d6aa6]">
        <h1 className="text-2xl font-bold text-white">
          Something went wrong. Please try again later.
        </h1>
      </div>
    ); // Error page here

  return (
    <>
      <main
        ref={containerRef}
        className="relative bg-gradient-to-b py-20 from-[#46aacf]  via-[#075985] to-[#2d6aa6]"
      >
        <Image
          src="/assets/png/waterflare.png"
          height={1000}
          width={1000}
          alt="flare"
          className="absolute pointer-events-none opacity-40 top-0 right-0"
          priority
        />
        {/* 1. Profile Info section */}
        <div className="">
          <ProfileInfo user={user} />
        </div>

        {/* 2. Registered Events section & Teams section */}
        <div className="px-5">
          <UserEvents userId={user?.id!} name={user.name} email={user.email} />
        </div>
      </main>
    </>
  );
};

export default Profile;

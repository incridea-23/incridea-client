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
import { useEffect } from 'react';

const Profile: NextPage = () => {
  const { error, user, loading } = useAuth();
  const containerRef = useRef(null);

  if (loading)
    return (
      <Loader/>
    ); // Todo: Loading page here

  if (!user)
    return (
      <div className="flex flex-col text-center space-y-3 items-center justify-center h-screen bg-gradient-to-b from-slate-800  via-slate-600 to-slate-500">
        {/* Todo: Any graphic to fill space */}
        <div className="flex z-10 justify-center items-center h-96 mt-8">
            <Image src={ '/assets/png/gamer.png' } alt="404" width={400} height={400} />
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
        className="h-dvh lg:p-10 bg-[#140F34] lg:h-screen"
      >
        
        {/* <div className='flex lg:h-full flex-col-reverse lg:flex-row justify-around items-center 2xl:items-start lg:space-x-10 lg:mt-8 2xl:p-15 2xl:mx-52 page-c'> */}
        <div className='flex lg:h-full flex-col-reverse lg:flex-row justify-around items-center 2xl:items-start lg:space-x-8 lg:mt-8 page-container'>

          {/* 2. Registered Events section & Teams section */}
          <div className='h-full w-full basis-2/3 lg:rounded-lg lg:overflow-auto lg:bg-[#ababab] backdrop-filter backdrop-blur-xl pb-5 lg:bg-opacity-10 border-gray-200/30 '>
            <UserEvents userId={user?.id!} name={user.name} email={user.email} />
          </div>

          {/* 1. Profile Info section */}
          <div className='h-full basis-1/3 2xl:w-min 2xl:h-min 2xl:p-10 lg:bg-[#ababab] backdrop-filter backdrop-blur-xl lg:bg-opacity-10 lg:rounded-xl border-gray-200/30'>
          <ProfileInfo user={user} />
          </div>

        </div> 
      </main>
    </>
  );
};

export default Profile;

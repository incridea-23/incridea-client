import { useAuth } from '@/src/hooks/useAuth';
import { NextPage } from 'next';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useRef } from 'react';
import TextAnimation from '@/src/components/animation/text';
import { titleFont } from '@/src/utils/fonts';
import { MdOutlineEmail, MdPhone } from 'react-icons/md';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import { FaUniversity } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

const Profile: NextPage = () => {
  const { status, error, user, loading } = useAuth();
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
        <section data-scroll-section className="text-white min-h-screen py-10">
          <div data-scroll className="flex items-center justify-center">
            <a
              className={`${titleFont.className} text-2xl lg:text-4xl font-bold text-center`}
            >
              Welcome {user?.name}!
            </a>
            <span className="animate-wave text-2xl lg:text-4xl">👋</span>
          </div>
          <br />
          <TextAnimation
            text="Ready to dive in?"
            textStyle="text-lg lg:text-2xl"
            className="flex items-center justify-center"
          />

          <div className="flex justify-center items-center lg:space-x-20 lg:flex-row flex-col-reverse mt-10">
            <div
              data-scroll
              data-scroll-speed="3"
              data-scroll-direction="vertical"
              className="flex flex-col justify-center space-y-6 lg:mt-0 mt-5"
            >
              <a
                className={`text-3xl lg:text-5xl font-bold ${titleFont.className}`}
              >
                {user?.name}
              </a>
              {/* Todo: replace college */}
              <a className="text-md lg:text-2xl flex items-center gap-5">
                <FaUniversity />
                NMAM Institute of Technology
              </a>
              <a className="text-md lg:text-2xl flex items-center gap-5">
                <BsPersonFill />
                {user?.email.split('@')[0]}
              </a>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <MdOutlineEmail />
                  <Link
                    href={`mailto:${user?.email}`}
                    className="hover:underline"
                  >
                    {user?.email}
                  </Link>
                </div>
                <div className="flex gap-2 items-center">
                  <MdPhone />
                  <Link
                    href={`tel:${user?.phoneNumber}`}
                    className="hover:underline"
                  >
                    {user?.phoneNumber ?? '+91 9999999999'}
                    {/* Todo: replace with user's phone number */}
                  </Link>
                </div>
              </div>
            </div>

            <div
              data-scroll
              data-scroll-speed="3"
              data-scroll-direction="vertical"
              className="flex flex-col justify-center items-center space-y-5"
            >
              {/* Todo: add idToPid fn */}
              <div className="relative">
                <Image
                  src={'/assets/png/map.png'}
                  width={300}
                  height={300}
                  alt="map"
                  className="opacity-50"
                />

                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                  <QRCodeSVG
                    value={user?.id as string}
                    size={150}
                    bgColor="#A5BEA9"
                  />
                  <a
                    className={`${titleFont.className} text-[#4d5e57] text-md p-2 mt-2`}
                  >
                    INC2023-00{user?.id}
                  </a>
                </div>
              </div>
            </div>
          </div>
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

import { useAuth } from "@/src/hooks/useAuth";
import { NextPage } from "next";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useRef } from "react";
import ProfileInfo from "@/src/components/pages/profile/profileInfo";
import UserEvents from "@/src/components/pages/profile/registeredEvents";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Button from "@/src/components/button";
import Image from "next/image";

const Profile: NextPage = () => {
  const { error, user, loading } = useAuth();
  const containerRef = useRef(null);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#46aacf]  via-[#075985] to-[#2d6aa6]">
        <h1 className="text-2xl font-bold text-white">Loading...</h1>
      </div>
    ); // Todo: Loading page here

  if (!user)
    return (
      <div className="flex flex-col text-center space-y-3 items-center justify-center h-screen bg-gradient-to-b from-[#46aacf]  via-[#075985] to-[#2d6aa6]">
        {/* Todo: Any graphic to fill space */}
        <h1 className="lg:text-2xl text-lg font-bold text-white">
          Hey there! You need to login to view this page.
        </h1>
        <Link href="/login">
          <Button intent={"primary"}>Login / Register</Button>
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
      <Toaster />
      <main
        ref={containerRef}
        className="relative bg-gradient-to-b py-20 from-[#46aacf]  via-[#075985] to-[#2d6aa6]">
        <Image
          src="/assets/png/waterflare.png"
          height={1000}
          width={1000}
          alt="flare"
          className="absolute pointer-events-none opacity-40 top-0 right-0"
        />
        {/* 1. Profile Info section */}
        <div className="">
          <ProfileInfo user={user} />
        </div>

        {/* 2. Registered Events section & Teams section */}
        <div className="px-5">
          <UserEvents userId={user?.id!} />
        </div>
      </main>
    </>
  );
};

export default Profile;

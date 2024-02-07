import React from "react";
import AccommodationForm from "../../components/form/accommodation";
import Button from "../../components/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { TbArrowBackUp } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";
import { NextPage } from "next";
import Loader from "../../components/Loader";

const Accommodation: NextPage = () => {
  const router = useRouter();
  const { error, user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) router.push("/login");
  if(user?.college?.id == "1") router.push("/profile");
  return (
    <>
      <div className="px-4 md:px-6 pt-32 pb-10 min-h-screen text-white bg-gradient-to-b from-primary-300 to-primary-500">
        <div className="mx-auto max-w-4xl">
          <div className="p-4">
            <Link href="/profile">
              <Button size={"small"}>
                <TbArrowBackUp />
                Go Back
              </Button>
            </Link>
          </div>

          <h2
            className={`titleFont text-white text-center text-4xl md:text-5xl`}
          >
            Choose your Accommodation
          </h2>
          <h5 className="bodyFont text-center mt-5 md:mt-7 text-base md:text-xl max-w-7xl mx-auto">
            Before you roll your dice and choose your destiny
          </h5>

          <div className="flex md:flex-row flex-col gap-5 justify-evenly items-center bodyFont md:px-10 px-5 md:mt-8 mt-6 max-w-7xl mx-auto bg-white/20 rounded-xl md:py-7 py-4">
            <Link href="/accommodation/internal">
              <Button>Internal Accommodation</Button>
            </Link>
            <Link href="/accommodation/external">
              <Button>External Accommodation</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accommodation;

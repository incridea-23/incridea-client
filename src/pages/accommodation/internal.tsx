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
            <Link href="/accommodation">
              <Button size={"small"}>
                <TbArrowBackUp />
                Go Back
              </Button>
            </Link>
          </div>

          <h2
            className={`titleFont text-white text-center text-4xl md:text-5xl`}
          >
            Internal Accommodation
          </h2>
          <h5 className="bodyFont text-center mt-5 md:mt-7 text-base md:text-xl max-w-7xl mx-auto">
            Before you make the next move, read through the list of T&C, and register
            yourself for the internal accommodation by filling the form below.
          </h5>

          <div className="bodyFont md:px-10 px-5 md:mt-8 mt-6 max-w-7xl mx-auto bg-white/20 rounded-sm md:py-7 py-4">
            <h2 className="font-semibold md:text-2xl text-base mb-1">
              Terms and Conditions
            </h2>

            <h3 className="mt-5 text-xl font-bold">
              Rules to be followed by external students (Boys)
            </h3>
            <ol className="mt-2 list-decimal pl-4">
              <li>
                PG Boys Hostel is assigned for boys, which will be closed within
                half an hour from the time the programs end at Night.
              </li>
              <li>
                Rooms provided will be of 4-sharing system. Per head charges for
                the same is ₹150 per day.
              </li>
              <li>
                Consumption of alcohol or any similar substances is strictly
                prohibited and strict action will be taken if found guilty of
                the same.
              </li>
              <li>
                If found guilty of damaging any of the resources or property of
                college strict action will be taken.
              </li>
              <li>Do not litter the rooms provided.</li>
            </ol>

            <h3 className="mt-5 text-xl font-bold">
              Rules to be followed by external students (Girls)
            </h3>
            <ol className="mt-2 list-decimal pl-4">
              <li>
                EDC Block is assigned for girls, which will be closed within
                half an hour from the time the programs end at Night.
              </li>
              <li>
                Rooms provided will be of 3-sharing system. Per head charges for
                the same is ₹150 per day.
              </li>
              <li>
                A dormitory is also available with a capacity of 17. Per head
                charges for the same is ₹150 per day.
              </li>
              <li>
                Consumption of alcohol or any similar substances is strictly
                prohibited and will result in severe consequences being taken.
              </li>
              <li>
                The security will open EDC at 6 am in the morning, so if you
                want anything during the night time, you cannot go out and hence
                it is advised to carry the necessary things well in advance.
              </li>
              <li>
                Do not damage the resources provided from college. If found
                guilty, strict action will be taken.
              </li>
              <li>
                Participants are advised to bring their own locks to ensure the
                protection of their belongings in the dormitory.{" "}
              </li>
              <li> Do not litter the dormitory.</li>
            </ol>

            <div className="mt-2">
              <Link
                className="hover:text-gray-300 underline"
                href={"/guidelines"}
              >
                Read More
              </Link>{" "}
              about the guidelines and regulations
            </div>

            <div className="flex justify-center">
              <AccommodationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accommodation;

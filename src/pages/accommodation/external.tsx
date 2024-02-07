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
            External Accommodation
          </h2>
          <h5 className="bodyFont text-center mt-5 md:mt-7 text-base md:text-xl max-w-7xl mx-auto">
          Before you make the next move, read through the list of T&C, and register
            yourself for the external accommodation.
          </h5>

          <div className="bodyFont md:px-10 px-5 md:mt-8 mt-6 max-w-7xl mx-auto bg-white/20 rounded-sm md:py-7 py-4">
            <h2 className="font-semibold md:text-2xl text-base mb-1">
              Terms and Conditions
            </h2>

            <ol className="mt-2 list-decimal pl-4">
            <li>
            If you have chosen external accommodation, please find the excel sheet provided with detail regarding the same.
              </li>
              <li>
            You are to choose the hotel of your choice from the sheet and contact them for booking; once you have confirmed the booking, you must contact the Point of Contact given below and inform them regarding the same.
              </li>
              <li>For any further clarifications regarding the same and transport from the place of accommodation, contact: +918747960666, +918618378701 </li>
              <li>External Accommodation Details:  <Link href="https://docs.google.com/spreadsheets/d/1Y2QheAsJjUr54LAvzXVVJjIGFXXBNTsn/edit#gid=1791495064" target="_blank" className="underline">Accommodation Details Excel Sheet</Link> </li>
            </ol>

            
          </div>
        </div>
      </div>
    </>
  );
};

export default Accommodation;

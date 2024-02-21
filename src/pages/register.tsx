import { NextPage } from "next";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import Button from "../components/button";
import { makePayment } from "../utils/razorpay";
import Spinner from "../components/spinner";
import Link from "next/link";
import Loader from "../components/Loader";
import { AccommodationRequestsByUserDocument } from "../generated/generated";
import { useQuery } from "@apollo/client";
import ViewUserAccommodation from "../components/pages/profile/viewUserAccommodation";
import { IoEye } from "react-icons/io5";

const Register: NextPage = () => {
  const { error, user, loading: userLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    data: userDetails,
    loading: loadingAccommodation,
    error: errorAccommodation,
  } = useQuery(AccommodationRequestsByUserDocument);

  if (userLoading) return <Loader />;
  if (!user) router.push("/login");
  if (user && user?.role !== "USER") router.push("/profile");

  return (
    <div className="px-4 md:px-6 pt-32 pb-10 min-h-screen text-white bg-gradient-to-b from-primary-300 to-primary-500">
      <ViewUserAccommodation
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="mx-auto max-w-4xl">
        <h2 className={`titleFont text-white text-center text-4xl md:text-5xl`}>
          Register
        </h2>

        <h5 className="bodyFont text-center mt-5 md:mt-7 text-base md:text-xl max-w-7xl mx-auto">
          Before you roll the dice, read through the list of T&C, and register
          yourself for the fest by clicking the button below.
        </h5>
        <div className="bodyFont md:px-10 px-5 md:mt-8 mt-6 max-w-7xl mx-auto bg-white/20 rounded-sm md:py-7 py-4">
          <h2 className="font-semibold md:text-2xl text-base">
            Terms and Conditions
          </h2>
          <p className="mt-2">
            Two different categories of participants are permitted to
            participate:
          </p>
          <ol className="mt-2 list-decimal pl-4">
            <li>
              {" "}
              Students of NMAM Institute of Technology, who pays{" "}
              <span className="font-semibold">₹256</span> will have access to
              all events and pronites
            </li>
            <li>
              {" "}
              Students of external engineering and sister Nitte colleges, who
              pays <span className="font-semibold">₹356</span> will have access
              to all events and pronites.
            </li>
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
          <Button
            onClick={() => makePayment(setLoading)}
            className="flex gap-2 mt-8 mb-4"
          >
            Register Now
            {loading && (
              <Spinner className="w-fit" size={"small"} intent={"white"} />
            )}{" "}
          </Button>
          <h1 className="text-xs md:text-sm mt-2 text-gray-100">
            By clicking the above button, you agree to the mentioned terms and
            conditions
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;

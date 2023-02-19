import { useQuery } from "@apollo/client";
import { type NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { makePayment } from "../utils/razorpay";
import { MeDocument } from "../generated/generated";
const Home: NextPage = () => {
  const { data, loading, error } = useQuery(MeDocument);
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <main className="h-screen w-screen flex justify-center items-center flex-col gap-5">
        <div className="text-2xl border-b border-gray-400">
          Incridea &apos;23
        </div>
        <div>
          <p>
            {data &&
              data.me.__typename === "QueryMeSuccess" &&
              JSON.stringify(data.me.data)}
          </p>
        </div>
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center gap-3"></div>
        </div>
      </main>
    </>
  );
};

export default Home;

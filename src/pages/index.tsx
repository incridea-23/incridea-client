import { useQuery } from "@apollo/client";
import { type NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { makePayment } from "../utils/razorpay";
import { MeDocument } from "../generated/generated";
import { useAuth } from "../hooks/useAuth";
const Home: NextPage = () => {
  const { user, loading, error, status } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <main className="h-screen w-screen flex justify-center items-center flex-col gap-5">
        <div className="text-2xl border-b border-gray-400">
          Incridea &apos;23
        </div>
        <div>
          <div className="flex flex-col gap-3">
            {status === "authenticated" ? (
              <div className="text-center space-y-1 text-md font-sans">
                <div className="text-xl font-semibold ">
                  Welcome {user?.name}
                </div>
                <div className="text-sm font-light">
                  Your email is {user?.email}
                </div>
                <div>Your role is {user?.role}</div>
                <div>Your id is {user?.id}</div>
                <div className="flex gap-5 justify-center">
                  {user?.role === "USER" && (
                    <button
                      onClick={makePayment}
                      className="bg-green-500 px-3 py-1 text-white rounded-md">
                      Register
                    </button>
                  )}

                  <button
                    className="bg-red-500 px-3 py-1 text-white rounded-md"
                    onClick={() => signOut()}>
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="text-lg ">You are not logged in</div>
                <button
                  onClick={() => signIn()}
                  className="bg-blue-500 text-white px-3 py-2 rounded-md">
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center gap-3"></div>
        </div>
      </main>
    </>
  );
};

export default Home;

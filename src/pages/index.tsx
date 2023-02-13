import { initializeApollo } from '@/src/lib/apollo';
import { useQuery } from '@apollo/client';
import { type NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { makePayment } from '../utils/razorpay';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <main className="h-screen w-screen flex justify-center items-center flex-col gap-5">
        <div className="text-2xl border-b border-gray-400">
          Incridea &apos;23
        </div>

        <div className="text-center">
          {status === 'loading' && <div>Loading...</div>}
          {status === 'authenticated' && (
            <div>
              <div>Authenticated as {session?.user?.data.email}</div>
              <div>
                Session expires in {new Date(session?.expires).toLocaleString()}
              </div>
              {session.user.data.role === "USER" ? (
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded-md mt-3"
                  onClick={makePayment}>
                  Register for fest By Paying Pay 250{" "}
                </button>
              ) : (
                <p>Hello Participant👋🏻, your PID is {session.user.data.id}</p>
              )}
            </div>
          )}
          {status === 'unauthenticated' && <div>Not authenticated</div>}
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {status === 'authenticated' ? (
              <button
                onClick={() => {
                  signOut();
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    signIn();
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Login
                </button>
                <button className="bg-green-500 text-white px-3 py-1 rounded-md">
                  <Link href={'/auth/signup'}>Sign Up</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

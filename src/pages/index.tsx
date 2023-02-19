import { useQuery } from '@apollo/client';
import { type NextPage } from 'next';
import Link from 'next/link';
import { makePayment } from '../utils/razorpay';
import { MeDocument } from '../generated/generated';

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(MeDocument);
  const status = loading
    ? 'loading'
    : data?.me.__typename === 'QueryMeSuccess'
    ? 'authenticated'
    : 'unauthenticated';

  return (
    <>
      <main className="h-screen w-screen flex justify-center items-center flex-col gap-5">
        <div className="text-2xl border-b border-gray-400">
          Incridea &apos;23
        </div>

        <div className="text-center">
          {status === 'loading' && <div>Loading...</div>}
          {status === 'unauthenticated' && <div>Not authenticated</div>}
          {error && <div className="text-red-500">{error.message}</div>}
          {status === 'authenticated' && (
            <div>
              <div>
                <p>
                  {data &&
                    data.me.__typename === 'QueryMeSuccess' &&
                    JSON.stringify(data.me.data)}
                </p>
              </div>
              {/* <div>Authenticated as {session?.user?.data.email}</div>
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
              )} */}
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* {status === 'authenticated' ? ( */}
            <button
              onClick={() => {
                fetch('/api/auth/logout', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({}),
                });
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Sign Out
            </button>
            {/* ) : ( */}
            <>
              <Link
                href={'/auth/login'}
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Login
              </Link>
              <button className="bg-green-500 text-white px-3 py-1 rounded-md">
                <Link href={'/auth/signup'}>Sign Up</Link>
              </button>
            </>
            {/* )} */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

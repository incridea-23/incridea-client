import { initializeApollo } from '@/src/lib/apollo';
import { useQuery } from '@apollo/client';
import { type NextPage } from 'next';
import Head from 'next/head';
import { GetUsersDocument } from '../graphql/generated';

/* 3 data fetching options in Next.js:
1. Client-side rendering - useQuery is called on client-side.
2. Static rendering - getStaticProps is called at build time on server-side.
3. Server-side rendering - getServersideProps is called on every request.
*/

const Home: NextPage = () => {
  // 1. Client side rendering example
  const results = useQuery(GetUsersDocument);

  return (
    <>
      <Head>
        <title>Incridea</title>
        <meta name="description" content="Official website for Incridea 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen flex justify-center items-center flex-col">
        <div className="text-2xl border-b border-gray-400">
          Incridea &apos;23
        </div>
        <div className="text-center mt-4">
          <a>Apollo client demo</a>
          <div className="flex flex-col sm:flex-row gap-5 mt-5">
            {results.data?.users.map((user) => (
              <div
                key={user.id}
                className="border border-gray-400 rounded-lg p-5 hover:bg-gray-50 hover:border-black"
              >
                <div>{user.name}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

// 2. Static rendering example
export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GetUsersDocument,
  });
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
    /* ISR: Incremental Static Regeneration
    for eg: revalidate: 1 means that if a new request comes in, then the page will be revalidated at most once every second.*/
  };
};

// 3. SSR: similaryl getServersideProps can be used instead of getStaticProps for SSR.

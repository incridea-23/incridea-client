import Dashboard from '@/src/components/layout/dashboard'
import Criterias from '@/src/components/pages/dashboard/judge/Criterias'
import TeamList from '@/src/components/pages/dashboard/judge/TeamList'
import Spinner from '@/src/components/spinner'
import { useAuth } from '@/src/hooks/useAuth'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Toaster } from 'react-hot-toast'

type Props = {}

const Judge: NextPage = (props: Props) => {

	const router = useRouter();
  const { user, loading, error } = useAuth();

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center">
        <Spinner />
      </div>
    );
  if (!user) {
    router.push("/login");
    return <div>Redirecting...</div>;
  }

	// if (user.role !== "JUDGE") {
  //   router.push("/profile");
  //   return <div>Redirecting...</div>;
  // }

	return (
		<Dashboard>
      <Toaster />
      <div className="relative top-14 md:top-0 p-2">
        <h1 className="text-3xl mb-3">
          Hello <span className="font-semibold">{user?.name}</span>!
        </h1>
      </div>
			<div className='flex h-[80vh] gap-3'>
				{/* Team List */}
				<div className='basis-2/5 shrink-0 grow-0 bg-white/20 rounded-lg '>
					<TeamList />
				</div>
				{/* Criteria/Score */}
				<div className='basis-3/5 shrink-0 grow-0 bg-white/20 rounded-lg '>
					<Criterias />
				</div>
			</div>
    </Dashboard>
	)
}

export default Judge
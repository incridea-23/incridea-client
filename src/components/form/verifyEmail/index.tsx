import { FunctionComponent, useState, useEffect } from 'react';
import { VerifyEmailDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { GiConfirmed } from 'react-icons/gi';
import { MdError } from 'react-icons/md';
import Spinner from '../../spinner';

const VerifyEmailComponent: FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [isMutationExecuted, setIsMutationExecuted] = useState<boolean>(false);

  const token = useRouter().query.token as string | undefined;

  const [verifyMutation, { data, loading }] = useMutation(VerifyEmailDocument);

  useEffect(() => {
    if (token && !isMutationExecuted) {
      verifyMutation({ variables: { token } }).then((res) => {
        if (res.data?.verifyEmail.__typename === 'Error') {
          setError(res.data.verifyEmail.message);
        }
      });
      setIsMutationExecuted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isMutationExecuted]);

  return (
    <div className='flex min-h-screen w-full bg-gradient-to-bl  from-[#41acc9]  via-[#075985] to-[#2d6aa6] items-center justify-center' >
      {loading && <Spinner/>}
      {!token && 
        <div className='flex flex-col text-red-800 min-w-[300px] bg-[#dd5c6e]/90 p-12 rounded-md items-center justify-center' >
          <MdError className='mx-auto text-7xl my-6 '  />
          <h1>No token provided</h1>
        </div>
      }
      {error &&
        <div className='flex flex-col text-red-800 min-w-[300px] bg-[#dd5c6e]/90 p-12 rounded-md items-center justify-center' >
          <MdError className='mx-auto text-7xl my-6 text-red-600'  />
          <h1>{error}</h1>
        </div>
      } 
      {data?.verifyEmail.__typename === 'MutationVerifyEmailSuccess' && (
        <div className='text-green-700 text-center bg-green-300 p-12 rounded-md' >
          <GiConfirmed className='mx-auto text-7xl my-6' />
          <h1>Your email has been verified.</h1>
          <p>You can now login to your account.</p>
          <Link href={'/login'} className="underline">
            Click here to login
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailComponent;

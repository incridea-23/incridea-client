import { NextPage } from 'next';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import Button from '../components/button';
import { makePayment } from '../utils/razorpay';
import Spinner from '../components/spinner';
import Link from 'next/link';
import Loader from '../components/Loader';

type Props = {};

const Register: NextPage = (props: Props) => {
  const { error, user, loading: userLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  if (userLoading) return <Loader/>
  if (!user) router.push('/login');
  if (user?.role !== 'USER') router.push('/');

  return (
    <div className="px-4 md:px-6 pt-32 pb-10 min-h-screen text-white bg-gradient-to-b from-[#46aacf]  via-[#075985] to-[#2d6aa6]">
      <div className="mx-auto max-w-4xl">
        <h2 className={`titleFont text-white text-center text-4xl md:text-5xl`}>
          Register
        </h2>
        <h5 className="bodyFont text-center mt-5 md:mt-7 text-base md:text-xl max-w-7xl mx-auto">
          Before you dive in, read through the list of T&C, and register
          yourself for the fest by clicking the button below.
        </h5>
        <div className="bodyFont md:px-10 px-5 md:mt-8 mt-6 max-w-7xl mx-auto bg-white/20 rounded-sm md:py-7 py-4">
          <h2 className="font-semibold md:text-2xl text-base">
            Terms and Conditions
          </h2>
          <p className="mt-2">
            Four different categories of participants are permitted to
            participate:
          </p>
          <ol className="mt-2 list-decimal pl-4">
            <li>
              {' '}
              NMAM Institute of Technology students who pay ₹200 will have
              access to all events and pronites
            </li>
            <li>
              {' '}
              Engineering college students, other than NMAMIT, who pay ₹300 will
              have access to all events and pronites.
            </li>
            <li>
              Non-engineering college and Nitte sister college students who pay
              ₹300 will have access only to Core Events and pronites.
            </li>
            <li>
              {' '}
              Invite-only participants who pay ₹150 will have access to the one
              core event they were invited to. If the invite-only participant is
              a college student and wants to attend pronite, they will have to
              register as given in point 3.
            </li>
          </ol>
          <div className='mt-2'>
            <Link
              className="hover:text-gray-300 underline"
              href={'/guidelines'}
            >
              Read More
            </Link>{' '}
            about the guidelines and regulations
          </div>
          <Button
            disabled={true}
            // onClick={() => makePayment(setLoading)}
            className="flex gap-2 mt-8 "
          >
            Registrations Closed
            {loading && (
              <Spinner className="w-fit" size={'small'} intent={'white'} />
            )}{' '}
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

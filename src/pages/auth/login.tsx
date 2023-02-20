import ResetPasswordForm from '@/src/components/signIn/resetPasswordForm';
import SignInForm from '@/src/components/signIn/signInForm';
import { NextPage } from 'next';
import { useState } from 'react';

const SignIn: NextPage = () => {
  const [whichForm, setWhichForm] = useState<'signIn' | 'resetPassword'>(
    'signIn'
  );
  return (
    <div className="flex justify-center items-center h-screen">
      {whichForm === 'signIn' ? (
        <SignInForm setWhichForm={setWhichForm} />
      ) : (
        <ResetPasswordForm setWhichForm={setWhichForm} />
      )}
    </div>
  );
};

export default SignIn;

import SignUpForm from '@/src/components/form/signUp';
import { NextPage } from 'next';

const SignUp: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUpForm />
    </div>
  );
};

export default SignUp;

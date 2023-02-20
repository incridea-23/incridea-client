import { NextPage } from 'next';
import ResetPassword from '@/src/components/form/resetPassword';

const ResetPasswordPage: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;

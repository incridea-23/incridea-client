import { FormEventHandler, FunctionComponent, useState } from 'react';
import { ResetPasswordDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const ResetPassword: FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const token = useRouter().query.token as string | undefined;

  const [resetMutation, { data, loading, error: MutationError }] = useMutation(
    ResetPasswordDocument
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid token');
      return;
    }

    resetMutation({
      variables: {
        password: password.newPassword,
        token: token as string,
      },
    }).then((res) => {
      if (res.data?.resetPassword.__typename === 'Error') {
        setError(res.data.resetPassword.message);
      }
    });
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : data?.resetPassword.__typename === 'MutationResetPasswordSuccess' ? (
        <div className="text-green-500">✅ Password successfully changed</div>
      ) : (
        <form
          className="flex flex-col gap-3 border border-black p-5 rounded-xl"
          onSubmit={handleSubmit}
        >
          <input
            value={password.newPassword}
            onChange={({ target }) =>
              setPassword({ ...password, newPassword: target.value })
            }
            type="password"
            placeholder="Enter New Password"
          />
          <input
            value={password.confirmPassword}
            onChange={({ target }) =>
              setPassword({ ...password, confirmPassword: target.value })
            }
            type="password"
            placeholder="Confirm New Password"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset Password
          </button>
          {(error || MutationError) && (
            <div className="text-red-500">
              {error || MutationError?.message}
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default ResetPassword;

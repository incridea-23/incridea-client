import { FormEventHandler, FunctionComponent, useState } from 'react';
import { ResetPasswordDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Spinner from '../../spinner';
import Button from '../../button';

const ResetPassword: FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const token = useRouter().query.token as string | undefined;

  const [resetMutation, { data, loading, error: MutationError }] = useMutation(
    ResetPasswordDocument
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid token");
      return;
    }

    resetMutation({
      variables: {
        password: password.newPassword,
        token: token as string,
      },
    }).then((res) => {
      if (res.data?.resetPassword.__typename === "Error") {
        setError(res.data.resetPassword.message);
      }
    });
  };

  return (
    <>
      {loading ? (
        <Spinner intent={'white'} />
      ) : data?.resetPassword.__typename === 'MutationResetPasswordSuccess' ? (
        <div className="text-green-500">✅ Password successfully changed</div>
      ) : (
        <form
          className={`flex relative justify-center flex-col gap-4 min-h-full  ${
            loading && "cursor-not-allowed pointer-events-none"
          }`}
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl text-center font-semibold mb-[1em]">
            Enter New Password
          </h2>
          <input
            value={password.newPassword}
            onChange={({ target }) =>
              setPassword({ ...password, newPassword: target.value })
            }
            type="password"
            placeholder="Enter New Password"
            className=" py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400   placeholder:text-gray-500 text-black   md:focus:border-[#dd5c6e] outline-none"
          />
          <input
            value={password.confirmPassword}
            onChange={({ target }) =>
              setPassword({ ...password, confirmPassword: target.value })
            }
            type="password"
            placeholder="Confirm New Password"
            className=" py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400   placeholder:text-gray-500 text-black   md:focus:border-[#dd5c6e] outline-none mb-3"
          />
          <Button intent={`primary`} type="submit">
            Reset Password
          </Button>

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

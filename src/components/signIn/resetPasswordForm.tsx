import { FormEventHandler, FunctionComponent, useState } from 'react';
import { ResetPasswordDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';

type ResetPasswordFormProps = {
  setWhichForm: (whichForm: 'signIn' | 'resetPassword') => void;
};

const ResetPasswordForm: FunctionComponent<ResetPasswordFormProps> = ({
  setWhichForm,
}) => {
  const [email, setEmail] = useState<string>('');

  const [resetMutation, { data, loading, error }] = useMutation(
    ResetPasswordDocument
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // add some client side validations like empty fields, password length, etc.
    e.preventDefault();
    resetMutation({
      variables: {
        email: email,
      },
    });
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : data ? (
        <div className="text-green-500">✅ Check your email for a reset link</div>
      ) : (
        <form
          className="flex flex-col gap-3 border border-black p-5 rounded-xl"
          onSubmit={handleSubmit}
        >
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            type="email"
            placeholder="john@email.com"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset Password
          </button>
          <button
            onClick={() => setWhichForm('signIn')}
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          {error && <div className="text-red-500">{error.message}</div>}
        </form>
      )}
    </>
  );
};

export default ResetPasswordForm;

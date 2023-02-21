import { FormEventHandler, FunctionComponent, useState } from 'react';
import { ResetPasswordEmailDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';

type ResetPasswordFormProps = {
  setWhichForm: (whichForm: 'signIn' | 'resetPassword') => void;
};

const ResetPasswordForm: FunctionComponent<ResetPasswordFormProps> = ({
  setWhichForm,
}) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const [resetMutation, { data, loading, error: mutationError }] = useMutation(
    ResetPasswordEmailDocument
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // add some client side validations like empty fields, password length, etc.
    e.preventDefault();
    if (email === '') return;

    resetMutation({
      variables: {
        email: email,
      },
    }).then((res) => {
      if (res.data?.sendPasswordResetEmail.__typename === 'Error') {
        setError(res.data.sendPasswordResetEmail.message);
      }
    });
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : data?.sendPasswordResetEmail.__typename ===
        'MutationSendPasswordResetEmailSuccess' ? (
        <div className="text-green-500">
          ✅ Reset link is sent to your email. Please check your inbox.
        </div>
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
            Send Reset Link
          </button>
          <button
            onClick={() => setWhichForm('signIn')}
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          {(error || mutationError) && (
            <div className="text-red-500">
              {error || mutationError?.message}
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default ResetPasswordForm;

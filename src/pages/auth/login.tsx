import { LoginDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';

const SignIn: NextPage = () => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState<string>('');

  const [loginMutation, { data, loading, error: mutationError }] =
    useMutation(LoginDocument);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // add some validations
    e.preventDefault();

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    }

    if (res?.ok) {
      setError('');
      setUserInfo({ email: '', password: '' });
      loginMutation({
        variables: {
          email: userInfo.email,
          password: userInfo.password,
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col gap-3 border border-black p-5 rounded-xl"
        onSubmit={handleSubmit}
      >
        <input
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type="email"
          placeholder="john@email.com"
        />
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="********"
        />
        <button type="submit">Login</button>
        {error && <div className="text-red-500">{error}</div>}
        {loading && <div className="text-green-500">Loading...</div>}
        {mutationError && (
          <div className="text-red-500">{mutationError.message}</div>
        )}
        {data?.login.__typename === 'MutationLoginSuccess' && (
          <div className="text-green-500">Login successful</div>
        )}
      </form>
    </div>
  );
};

export default SignIn;

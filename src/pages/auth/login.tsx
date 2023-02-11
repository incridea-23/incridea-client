import { Button } from '@/src/components/button';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';

const SignIn: NextPage = () => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // add some client side validations
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
      router.push('/');
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
        <Button>Login</Button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default SignIn;

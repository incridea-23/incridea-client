import {
  EmailVerificationDocument,
  SignUpDocument,
} from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { useState, FormEventHandler } from 'react';

const SignUpForm: NextPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const [signUpMutation, { loading, error: mutationError }] =
    useMutation(SignUpDocument);

  const [
    emailVerificationMutation,
    { data, loading: emailVerificationLoading, error: emailVerificationError },
  ] = useMutation(EmailVerificationDocument);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (
      userInfo.name === '' ||
      userInfo.email === '' ||
      userInfo.password === ''
    ) {
      setError('Please fill all the fields');
      return;
    }
    if (userInfo.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    signUpMutation({
      variables: {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data?.signUp.__typename === 'MutationSignUpSuccess') {
          emailVerificationMutation({
            variables: {
              email: userInfo.email,
            },
          }).then((res) => {
            if (res.data?.sendEmailVerification.__typename === 'Error') {
              setError(res.data.sendEmailVerification.message);
            }
          });
        }
        if (res.data?.signUp.__typename === 'Error') {
          setError(res.data.signUp.message);
        }
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading || emailVerificationLoading ? (
        <div>{loading ? 'Signing up...' : 'Sending verification email...'}</div>
      ) : data?.sendEmailVerification.__typename ===
        'MutationSendEmailVerificationSuccess' ? (
        <div className="text-green-500">✅ Verification email sent</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 border border-black p-5 rounded-xl"
        >
          <input
            value={userInfo.name}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, name: target.value })
            }
            type="text"
            placeholder="John Doe"
          />
          <input
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, email: target.value })
            }
            type="email"
            placeholder="Email"
          />
          <input
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-500 text-white px-3 py-1 rounded-md">
            Sign Up
          </button>
          {(error || mutationError || emailVerificationError) && (
            <div className="text-red-500">
              {error ||
                mutationError?.message ||
                emailVerificationError?.message}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SignUpForm;

import { FunctionComponent, useState, useEffect } from 'react';
import { VerifyEmailDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

const VerifyEmailComponent: FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [isMutationExecuted, setIsMutationExecuted] = useState<boolean>(false);

  const token = useRouter().query.token as string | undefined;

  const [verifyMutation, { data, loading }] = useMutation(VerifyEmailDocument);

  useEffect(() => {
    if (token && !isMutationExecuted) {
      verifyMutation({ variables: { token } }).then((res) => {
        if (res.data?.verifyEmail.__typename === 'Error') {
          setError(res.data.verifyEmail.message);
        }
      });
      setIsMutationExecuted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isMutationExecuted]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!token && <p>❌ No token provided</p>}
      {error && <p>❌ {error}</p>}
      {data?.verifyEmail.__typename === 'MutationVerifyEmailSuccess' && (
        <p>
          ✅ Your email has been verified. You can now login to your account.
          <Link href={'/auth/login'}>Click here to login</Link>
        </p>
      )}
    </div>
  );
};

export default VerifyEmailComponent;

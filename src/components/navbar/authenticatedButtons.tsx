import { FC } from 'react';
import { User } from '@/src/generated/generated';
import Link from 'next/link';
import Button from '../button';

const AuthenticatedButtons: FC<{
  user: User | undefined | null;
}> = ({ user }) => {
  return (
    <>
      {user?.role === 'USER' ? (
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      ) : (
        <Link href="/profile">
          <Button>Profile</Button>
        </Link>
      )}

      {user?.role !== 'USER' && user?.role !== 'PARTICIPANT' && (
        <Link href={`/dashboard/${user?.role.replace('_', '').toLowerCase()}`}>
          <Button intent="ghost">Dashboard</Button>
        </Link>
      )}
    </>
  );
};

export default AuthenticatedButtons;

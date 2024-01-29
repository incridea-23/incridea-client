import { FC } from 'react';
import { User } from '@/src/generated/generated';
import Link from 'next/link';
import Button from '../button';
import { FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

const AuthenticatedButtons: FC<{
  user: User | undefined | null;
}> = ({ user }) => {
  return (
    <>
      {user?.role === 'USER' ? (
        <div className='flex space-x-2'>
        {/* <Link href="/register"> */}
          <Button>Closed</Button>
        {/* </Link> */}
        <Button
        onClick={() => signOut()}
        className="w-fit"
        intent={'ghost'}
      >
        <FaSignOutAlt className="inline-block mr-1" />
        Sign Out
      </Button>
        </div>
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

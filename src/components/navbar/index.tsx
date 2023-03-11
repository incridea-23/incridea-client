import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../button';
import { makePayment } from '@/src/utils/razorpay';
import { signOut } from 'next-auth/react';
import { AuthStatus } from '@/src/hooks/useAuth';
import { User } from '@/src/generated/generated';

const Navbar: FC<{
  status: AuthStatus;
  user: User | undefined | null;
}> = ({ status, user }) => {
  const links = [
    { label: 'Home', url: '/' },
    { label: 'Pronites', url: '/pronites' },
    { label: 'Events', url: '/events' },
    { label: 'Gallery', url: '/gallery' },
    { label: 'About', url: '/about' },
  ];

  return (
    <nav className="fixed top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 w-full">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-4 text-gray-900">
            {links.map((link) => (
              <Link
                className="hover:text-primary-500"
                key={link.url}
                href={link.url}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            className="bg-white bg-opacity-30 p-1 rounded-full backdrop-filter backdrop-blur-lg"
            href="/"
          >
            <Image src="/logo.png" alt="Logo" width={50} height={50} priority />
          </Link>
          <div className="flex space-x-4">
            {status === 'authenticated' && (
              <Button onClick={() => signOut()}>Sign Out</Button>
            )}
            {status === 'unauthenticated' && (
              <>
                <Link href="/auth/login">
                  <Button intent={'ghost'}>Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
            {status === 'unauthenticated' && user?.role === 'USER' && (
              <Button onClick={() => makePayment()}>Register</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

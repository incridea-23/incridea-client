import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../button';
import { makePayment } from '@/src/utils/razorpay';
import { signOut } from 'next-auth/react';
import { AuthStatus } from '@/src/hooks/useAuth';
import { User } from '@/src/generated/generated';
import { BiMenuAltRight as MenuIcon } from 'react-icons/bi';
import { AiOutlineClose as XIcon } from 'react-icons/ai';
import { Transition } from '@headlessui/react';

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 z-10 bg-white backdrop-filter backdrop-blur-sm bg-opacity-10 border-b border-gray-200 w-full">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="space-x-4 text-gray-900 hidden lg:flex">
            {links.map((link) => (
              <Link
                className="hover:text-primary-500 transition-colors duration-300"
                key={link.url}
                href={link.url}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              className="bg-white bg-opacity-30 p-1 rounded-full backdrop-filter backdrop-blur-lg"
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-gray-800 font-bold block lg:hidden">
              Incridea&apos;23
            </span>
          </Link>

          <AuthButtons
            className="hidden lg:flex"
            status={status}
            role={user?.role!}
          />
          <div className="flex items-center space-x-4 lg:hidden">
            {isMenuOpen ? (
              <XIcon className="h-6 w-6 text-gray-900" onClick={toggleMenu} />
            ) : (
              <MenuIcon
                className="h-6 w-6 text-gray-900"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>

        <Transition
          show={isMenuOpen}
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="lg:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="block py-2 px-4 text-sm hover:bg-primary-100"
            >
              {link.label}
            </Link>
          ))}
          <AuthButtons className="mb-2" status={status} role={user?.role!} />
        </Transition>
      </div>
    </nav>
  );
};

const AuthButtons: FC<{
  status: AuthStatus;
  role: User['role'];
  className?: string;
}> = ({ status, role, className }) => {
  return (
    <div className={`flex space-x-2 px-3 lg:px-0 ${className}`}>
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
      {status === 'unauthenticated' && role === 'USER' && (
        <Button onClick={() => makePayment()}>Register</Button>
      )}
    </div>
  );
};

export default Navbar;

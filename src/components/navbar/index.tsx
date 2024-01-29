import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../button';
import { useAuth } from '@/src/hooks/useAuth';
import { BiMenuAltLeft as MenuIcon } from 'react-icons/bi';
import { AiOutlineClose as XIcon } from 'react-icons/ai';
import { Transition } from '@headlessui/react';
import AuthenticatedButtons from './authenticatedButtons';

import CharacterAnimation from '../animation/character';
import { useRouter } from 'next/router';

const Navbar = () => {
  const links = [
    { label: 'Home', url: '/' },
    { label: 'Events', url: '/events' },
    { label: 'Pronites', url: '/pronites' },
    { label: 'Gallery', url: '/gallery' },
    { label: 'About', url: '/about' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const activePath = links.find((link) => link.url === router.pathname);

  const closeMenu = () => {
    if (isMenuOpen) setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  });

  return (
    <nav
      className={`fixed titleFont  top-0 z-20 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 border-b border-gray-200/30 w-full`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex order-2 lg:order-1 items-center space-x-2"
          >
            <Image
              className="w-24"
              src="/assets/png/logo.png"
              alt="Logo"
              width={100}
              height={80}
              priority
            />
          </Link>

          <div className="hidden space-x-5 lg:order-2 text-gray-900 lg:flex">
            {links.map((link) => (
              <Link
                className="group text-white transition-colors duration-300"
                key={link.url}
                href={link.url}
              >
                <CharacterAnimation
                  text={link.label}
                  textStyle="text-lg font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]"
                />
                <span
                  className={`${
                    activePath?.label === link.label ? 'max-w-full' : 'max-w-0'
                  } block group-hover:max-w-full transition-all duration-500 h-0.5 bg-white`}
                ></span>
              </Link>
            ))}
          </div>
          {!(router.pathname === '/login') && (
            <AuthButtons className="lg:order-3 hidden lg:flex" />
          )}
          <div className="flex items-center space-x-4 lg:hidden">
            {isMenuOpen ? (
              <XIcon
                className=" text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] h-6 w-6 "
                onClick={toggleMenu}
              />
            ) : (
              <MenuIcon
                className="h-6 w-6 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                onClick={toggleMenu}
              />
            )}
          </div>

          <div className="order-3 lg:hidden">{<MobileButtons />}</div>
        </div>

        <Transition
          show={isMenuOpen}
          enter="transition-all ease-in-out duration-500"
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
              onClick={closeMenu}
              className="block pb-3 px-2 text-sm text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]"
            >
              {link.label}
            </Link>
          ))}
          {!(router.pathname === '/login') && <AuthButtons className="mb-2" />}
        </Transition>
      </div>
    </nav>
  );
};

const AuthButtons: FC<{
  className?: string;
}> = ({ className }) => {
  const { status, user, error, loading } = useAuth();
  return (
    <div className={`flex space-x-2 px-2 lg:px-0 ${className}`}>
      {status === 'authenticated' && <AuthenticatedButtons user={user} />}
      {status === 'unauthenticated' && (
        <>
          <Link href={'/login'} as="/login">
            <Button intent={'primary'}>Login</Button>
          </Link>
          <Link href={'/login?whichForm=signUp'} as="/login">
            <Button intent={'ghost'}>Sign Up</Button>
          </Link>
        </>
      )}
    </div>
  );
};

const MobileButtons: FC<{
  className?: string;
}> = ({ className }) => {
  const { status, user, error, loading } = useAuth();
  const router = useRouter();
  return (
    <div className={`flex space-x-2  lg:px-0 ${className}`}>
      {status === 'authenticated' &&
        (router.pathname === '/profile' &&
        user?.role !== 'USER' &&
        user?.role !== 'PARTICIPANT' ? (
          <Link
            href={`/dashboard/${user?.role.replace('_', '').toLowerCase()}`}
          >
            <Button intent="ghost">Dashboard</Button>
          </Link>
        ) : (
          <Link href="/profile">
            <Button>Profile</Button>
          </Link>
        ))}
      {status === 'unauthenticated' && (
        <>
          <Link href={'/login'} as="/login">
            <Button intent={'primary'}>Login</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;

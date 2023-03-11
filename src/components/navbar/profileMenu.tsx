import { FC } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { User } from '@/src/generated/generated';
import Image from 'next/image';
import { AuthStatus } from '@/src/hooks/useAuth';
import { FaSignOutAlt } from 'react-icons/fa';
import { makePayment } from '@/src/utils/razorpay';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const ProfileMenu: FC<{
  user: User | undefined | null;
  status: AuthStatus;
}> = ({ user, status }) => {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            style={{
              outline: 'none',
            }}
          >
            <Image
              src={'/ryoko.png'}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border border-primary-500 hover:border-primary-600 hover:border-2 transition-all duration-100"
            />
          </Popover.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              style={{
                left: 0, // fix the default left position
              }}
              className="absolute right-0 w-48 mt-2 origin-top-right bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg divide-y divide-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"
            >
              <Link
                href={'/profile'}
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/50 hover:text-gray-900 rounded-t-lg"
              >
                Profile
              </Link>

              {user?.role === 'USER' && (
                <div
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/50 hover:text-gray-900"
                  onClick={() => makePayment()}
                >
                  Register
                </div>
              )}

              <div
                className="px-4 py-3 text-sm text-red-700 hover:bg-gray-50/50 rounded-b-lg"
                onClick={() => signOut()}
              >
                <FaSignOutAlt className="inline-block mr-2" />
                Sign Out
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ProfileMenu;

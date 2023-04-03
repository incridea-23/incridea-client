import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../button";
import { AuthStatus } from "@/src/hooks/useAuth";
import { User } from "@/src/generated/generated";
import { BiMenuAltRight as MenuIcon } from "react-icons/bi";
import { AiOutlineClose as XIcon } from "react-icons/ai";
import { Transition } from "@headlessui/react";
import AuthenticatedButtons from "./authenticatedButtons";
import { titleFont } from "@/src/utils/fonts";
import CharacterAnimation from "../animation/character";

const Navbar: FC<{
  status: AuthStatus;
  user: User | undefined | null;
}> = ({ status, user }) => {
  const links = [
    { label: "Home", url: "/" },
    { label: "Pronites", url: "/pronites" },
    { label: "Events", url: "/events" },
    { label: "Gallery", url: "/gallery" },
    { label: "About", url: "/about" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed ${titleFont.className}  top-0 z-20 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 border-b border-gray-200 w-full`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              className="w-24"
              src="/assets/png/logo.png"
              alt="Logo"
              width={100}
              height={80}
              priority
            />
          </Link>

          <div className="space-x-6 text-gray-900 hidden lg:flex">
            {links.map((link) => (
              <Link
                className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] transition-colors duration-300"
                key={link.url}
                href={link.url}>
                <CharacterAnimation
                  text={link.label}
                  textStyle="text-lg font-medium"
                />
              </Link>
            ))}
          </div>

          <AuthButtons
            className="hidden lg:flex"
            status={status}
            user={user!}
          />
          <div className="flex items-center space-x-4 lg:hidden">
            {isMenuOpen ? (
              <XIcon
                className=" text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] h-6 w-6 "
                onClick={toggleMenu}
              />
            ) : (
              <MenuIcon
                className="h-6 w-6 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"
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
          className="lg:hidden">
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="block py-2 px-4 text-sm text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
              {link.label}
            </Link>
          ))}
          <AuthButtons className="mb-2" status={status} user={user!} />
        </Transition>
      </div>
    </nav>
  );
};

const AuthButtons: FC<{
  status: AuthStatus;
  user: User;
  className?: string;
}> = ({ status, user, className }) => {
  return (
    <div className={`flex space-x-2 px-3 lg:px-0 ${className}`}>
      {status === "authenticated" && (
        <AuthenticatedButtons user={user} status={status} />
      )}
      {status === "unauthenticated" && (
        <>
          <Link href="/login">
            <Button intent={"ghost"}>Login</Button>
          </Link>
          <Link href={"/login?whichForm=signUp"} as="/login">
            <Button>Sign up</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;

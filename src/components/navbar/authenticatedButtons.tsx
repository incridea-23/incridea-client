import { FC } from "react";
import { User } from "@/src/generated/generated";
import { AuthStatus } from "@/src/hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "../button";

const AuthenticatedButtons: FC<{
  user: User | undefined | null;
  status: AuthStatus;
}> = ({ user, status }) => {
  const getNavbarButton = () => {
    switch (user?.role) {
      case "USER":
        return (
          <Link href={"/register"}>
            <Button>Register</Button>
          </Link>
        );
      case "PARTICIPANT":
        return (
          <Link href={"/profile"}>
            <Button>Profile</Button>
          </Link>
        );
      case "ORGANIZER":
        return (
          <Link href={"/dashboard/organizer"}>
            <Button>Dashboard</Button>
          </Link>
        );
      case "BRANCH_REP":
        return (
          <Link href={"/dashboard/branchrep"}>
            <Button>Dashboard</Button>
          </Link>
        );
      // case 'JUDGE':
      // case 'JURY':
      default:
        return (
          <Link href={"/profile"}>
            <Button>Profile</Button>
          </Link>
        );
    }
  };

  return (
    <>
      {getNavbarButton()}
      <Button intent={"ghost"} onClick={() => signOut()}>
        <FaSignOutAlt className="inline-block mr-1" />
        Sign Out
      </Button>
    </>
  );
};

export default AuthenticatedButtons;

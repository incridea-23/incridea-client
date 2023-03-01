import Dashboard from "@/src/components/layout/dashboard";
import OrganizerTab from "@/src/components/pages/dashboard/organizer/OrganizerTab";
import Spinner from "@/src/components/spinner";
import { useAuth } from "@/src/hooks/useAuth";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Organizer: NextPage = () => {
  const router = useRouter();
  const { user, loading, error } = useAuth();

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center">
        <Spinner />
      </div>
    );
  if (!user) {
    router.push("/auth/login");
    return <div>Redirecting...</div>;
  }
  if (user && user.role !== "ORGANIZER") router.push("/profile");

  return (
    <Dashboard>
      <h1 className="text-3xl mb-3">
        Hello <span className="font-semibold">{user?.name}</span>!
      </h1>
      <OrganizerTab organizerId={user.id} />
    </Dashboard>
  );
};

export default Organizer;

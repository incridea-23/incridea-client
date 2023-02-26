import Dashboard from "@/src/components/Layout/dashboard";
import OrganizerTab from "@/src/components/Tab/organizer";
import { useAuth } from "@/src/hooks/useAuth";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Organizer: NextPage = () => {
  const router = useRouter();
  const { user, loading, error } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) {
    router.push("/auth/login");
    return <div>Redirecting...</div>;
  }
  if (user && user.role !== "ORGANIZER") router.push("/profile");

  return (
    <Dashboard>
      <div className="text-xl">
        <h2>Hi, {user.name}!</h2>
      </div>
      <OrganizerTab organizerId={user.id} />
    </Dashboard>
  );
};

export default Organizer;

import { EventsByBranchRepDocument } from "@/src/generated/generated";
import { useAuth } from "@/src/hooks/useAuth";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

function BranchRep() {
  const { user, loading, error } = useAuth();
  const {
    data: events,
    loading: eventsLoading,
    error: eventsError,
  } = useQuery(EventsByBranchRepDocument, {
    variables: {
      branchRepId: user?.id as string,
    },
  });
  const router = useRouter();
  if (loading) return <div>Loading...</div>;
  console.log(user);
  if (user && user.role !== "BRANCH_REP") router.push("/profile");

  return (
    <div className="h-screen w-screen bg-gradient-to-t from-black  to-blue-900 text-gray-100">
      <div className="text-center ">
        <h1 className="text-4xl ">Hello {user?.name}</h1>
      </div>
      <div>
        {events?.eventsByBranchRep.map((event) => (
          <div key={event.id}>{event.name}</div>
        ))}
      </div>
    </div>
  );
}

export default BranchRep;

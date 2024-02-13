import { JoinTeamDocument } from "@/src/generated/generated";
import { teamIdToId } from "@/src/utils/id";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import createToast from "../../toast";
import { useRouter } from "next/router";
import Button from "../../button";
import Modal from "../../modal";
import { AiOutlineTeam } from "react-icons/ai";

const JoinTeamModal = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [joinTeam, { loading, error: mutationError }] = useMutation(
    JoinTeamDocument,
    {
      refetchQueries: ["MyTeam"],
    }
  );
  const handleJoinTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promise = joinTeam({
      variables: {
        teamId: teamIdToId(teamId),
      },
    }).then((res) => {
      if (res.data?.joinTeam.__typename === "Error") {
        setError(res.data.joinTeam.message);
      } else {
        setError("");
        setOpen(false);
      }
    });
    await createToast(promise, "Joining Team");
  };
  const [teamId, setTeamId] = useState("");
  const router = useRouter();
  const { jointeam } = router.query;

  useEffect(() => {
    if (jointeam) {
      setTeamId(jointeam as string);
      setOpen(true);
    }
  }, [jointeam]);

  return (
    <>
      <Button
        className="w-full !skew-x-0 !justify-center !tracking-normal rounded-full bodyFont items-center"
        disabled={loading}
        onClick={() => setOpen(true)}
        intent={"ghost"}
      >
        <AiOutlineTeam />
        Join Team
      </Button>
      <Modal
        onClose={() => setOpen(false)}
        showModal={open}
        size="small"
        title="Join Team"
        rounded="md"
      >
        <form
          onSubmit={handleJoinTeam}
          className="gap-3 md:px-6 md:pb-6 px-5 pb-5  w-full  flex flex-col "
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="teamName" className="text-gray-300 font-semibod">
              Team ID
            </label>
            <input
              type="text"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              name="teamName"
              id="teamName"
              placeholder="T24-10902"
              required
              className="w-full bg-primary-600 px-2 py-1 focus:outline-none focus:ring ring-primary-200/40 rounded-full"
            />
          </div>
          <Button
            className="w-full !skew-x-0 !justify-center !tracking-normal rounded-full bodyFont items-center"
            disabled={loading}
            type="submit"
            intent="success"
          >
            Join Team
          </Button>
          {error && (
            <p className="text-red-800 bg-red-200 px-3 py-1 rounded-sm font-semibold">
              {error}
            </p>
          )}
        </form>
      </Modal>
    </>
  );
};

export default JoinTeamModal;

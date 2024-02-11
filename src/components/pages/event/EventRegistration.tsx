import { useAuth } from "@/src/hooks/useAuth";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../../button";
import {
  Event,
  MyTeamDocument,
  QueryMyTeamSuccess,
  RegisterSoloEventDocument,
} from "@/src/generated/generated";
import { useMutation, useQuery } from "@apollo/client";
import createToast from "../../toast";
import { makeTeamPayment } from "@/src/utils/razorpay";
import Spinner from "../../spinner";
import TeamCard from "./TeamCard";
import CreateTeamModal from "./CreateTeamModal";
import JoinTeamModal from "./JoinTeamModal";
import { useRouter } from "next/router";
import { CiLogin } from "react-icons/ci";

function EventRegistration({
  eventId,
  type,
  fees,
}: {
  eventId: Event["id"];
  type: Event["eventType"];
  fees: Event["fees"];
}) {
  const { loading, user, status } = useAuth();
  const router = useRouter();
  const { slug } = router.query;

  if (loading) return null;
  return (
    <>
      {eventId === "29" || eventId === "50" ? (
        <div className="bg-green-500/30 border border-green-500 backdrop-blur-3xl w-full flex justify-center p-1 rounded-full">
          {eventId === "29"
            ? "Event is open on all 3 days"
            : "Event is only open for N.M.A.M.I.T faculties"}
        </div>
      ) : !user ? (
        <Link
          as={"/login"}
          href={`/login?redirectUrl=${encodeURIComponent(`/event/${slug}`)}`}
          className="w-fit lg:w-full"
        >
          <button className="mt-1 text-white capitalize shrink-0 px-5 w-fit py-1 flex gap-2 items-center justify-center rounded-full bg-gradient-to-tr from-secondary-800 to-secondary-600 brightness-100 hover:brightness-125 hover:scale-[1.02] transition-all duration-300">
            <CiLogin />
            Login to Register
          </button>
        </Link>
      ) : (
        <EventRegistrationButton
          userId={user.id}
          registered={user.role !== "USER"}
          eventId={eventId}
          type={type}
          fees={fees}
          name={user.name}
          email={user.email}
        />
      )}
    </>
  );
}

export default EventRegistration;

function EventRegistrationButton({
  eventId,
  type,
  fees,
  userId,
  registered,
  name,
  email,
}: {
  eventId: Event["id"];
  type: Event["eventType"];
  fees: Event["fees"];
  userId: string;
  registered: boolean;
  name: string;
  email: string;
}) {
  const { loading, data, error } = useQuery(MyTeamDocument, {
    variables: {
      eventId: eventId,
    },
  });

  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [registerSoloEvent, { loading: regLoading, data: regData }] =
    useMutation(RegisterSoloEventDocument, {
      refetchQueries: ["MyTeam"],
    });

  const handleSoloRegister = async () => {
    let promise = registerSoloEvent({
      variables: {
        eventId: eventId,
      },
    }).then((res) => {
      if (
        res.data?.registerSoloEvent.__typename ===
        "MutationRegisterSoloEventSuccess"
      ) {
        if (fees !== 0) {
          makeTeamPayment(
            res.data?.registerSoloEvent.data.id,
            name,
            email,
            setSdkLoaded
          );
        }
      }
    });
    createToast(promise, "Registering...");
  };

  if (loading)
    return (
      <div className="w-full h-20 flex justify-center items-center">
        <Spinner intent={"white"} />
      </div>
    );

  if (!registered) {
    return (
      <div className="w-full h-20 flex justify-center items-center flex-col space-y-2">
        <p className="text-white bodyFont">
          You need to register to join events!
        </p>
        <Link href={"/register"}>
          <Button
            className="!skew-x-0 !rounded-full !bodyFont"
            intent={"primary"}
            noScaleOnHover
          >
            Register Now
          </Button>
        </Link>
      </div>
    );
  } else if (
    data?.myTeam.__typename === "QueryMyTeamSuccess" &&
    data.myTeam.data
  ) {
    return (
      <TeamCard
        userId={userId}
        name={name}
        email={email}
        team={data.myTeam.data as QueryMyTeamSuccess["data"]}
      />
    );
  } else {
    if (type === "INDIVIDUAL" || type === "INDIVIDUAL_MULTIPLE_ENTRY") {
      if (fees === 0) {
        return (
          <>
            <Button
              noScaleOnHover
              className="!skew-x-0 !rounded-full justify-center !text-xl"
              onClick={handleSoloRegister}
              fullWidth
              intent={"primary"}
            >
              Register Now
            </Button>
          </>
        );
      } else {
        return (
          <Button
            disabled={regLoading || sdkLoaded}
            onClick={handleSoloRegister}
            fullWidth
            intent={"primary"}
            noScaleOnHover
            className="!skew-x-0 !rounded-full justify-center"
          >
            Pay <span className="font-normal">₹{fees}</span> and Register
          </Button>
        );
      }
    } else {
      return (
        <div className="w-full space-y-2">
          <CreateTeamModal eventId={eventId} />
          <JoinTeamModal />
        </div>
      );
    }
  }
}

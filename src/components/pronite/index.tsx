import { RegisterProniteDocument } from "@/src/generated/generated";
import { pidToId } from "@/src/utils/id";
import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import Button from "../button";
import Spinner from "../spinner";

function Pronite({ pId }: { pId: string }) {
  const [registerPronite, { data, loading, error }] = useMutation(
    RegisterProniteDocument,
    {
      variables: {
        userId: pidToId(pId),
      },
    }
  );

  return (
    <>
      <div className="max-w-sm mt-1 mb-3">
        <Button
          intent={"success"}
          className="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2.5 px-7 rounded"
          onClick={() => registerPronite()}>
          Register
        </Button>
      </div>
      {loading ? (
        <>
          <Spinner className="mt-3" intent={"white"} size={'small'} />
        </>
      ) : data?.registerPronite.__typename === "MutationRegisterProniteSuccess" ? (
        <div className="p-3 bg-white/10 rounded-md bodyFont">
          <div className="text-lg leading-snug mb-1 text-green-500">
            <span className="font-bold">{pId}</span> registered for pronite
          </div>
          <div className="text-white">
            <div className="text-lg leading-snug">{data.registerPronite.data.user.name}</div>
            {/* <div className="text-xs">{data.registerPronite.data.user.email}</div> */}
            <div className="text-sm leading-snug">{data.registerPronite.data.user.college?.name}</div>
            <div className="text-sm leading-snug">{data.registerPronite.data.user.phoneNumber}</div>
          </div>
        </div>
      ) : (
        <div className="text-red-500 font-semibold bodyFont bg-white/10 rounded-md">
          {data?.registerPronite.message && <p className="p-3 py-2">{data.registerPronite.message}</p>}
        </div>
      )}
    </>
  );
}

export default Pronite;

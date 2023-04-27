import { RegisterProniteDocument } from "@/src/generated/generated";
import { pidToId } from "@/src/utils/id";
import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import Button from "../button";

function Pronite({ pId }: { pId: string }) {
  const [registerPronite, { data, loading, error }] = useMutation(
    RegisterProniteDocument,
    {
      variables: {
        userId: pidToId(pId),
      },
    }
  );

  console.log(data);

  return (
    <div>
      <div className="max-w-sm">
        <Button
          intent={"success"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => registerPronite()}>
          Register
        </Button>
      </div>

      {data?.registerPronite.__typename === "MutationRegisterProniteSuccess" ? (
        <div className="p-3">
          <div className="text-lg text-green-500">
            {pId} registered for pronite
          </div>
          <div className="text-white">
            <div className="text-lg">{data.registerPronite.data.user.name}</div>
            <div className="text-sm">
              {data.registerPronite.data.user.college?.name}
            </div>
            <div className="text-xs">
              {data.registerPronite.data.user.email}
            </div>
            <div className="text-sm">
              {data.registerPronite.data.user.phoneNumber}
            </div>
          </div>
        </div>
      ) : (
        <div>{data?.registerPronite.message}</div>
      )}
    </div>
  );
}

export default Pronite;

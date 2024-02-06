import { FunctionComponent, useState, useEffect } from "react";
import { VerifyEmailDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

import { GiConfirmed } from "react-icons/gi";
import { MdError } from "react-icons/md";
import Spinner from "../../spinner";

const VerifyEmailComponent: FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [isMutationExecuted, setIsMutationExecuted] = useState<boolean>(false);

  const token = useRouter().query.token as string | undefined;

  const [verifyMutation, { data, loading }] = useMutation(VerifyEmailDocument);

  useEffect(() => {
    if (token && !isMutationExecuted) {
      verifyMutation({ variables: { token } }).then((res) => {
        if (res.data?.verifyEmail.__typename === "Error") {
          setError(res.data.verifyEmail.message);
        }
      });
      setIsMutationExecuted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isMutationExecuted]);

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-bl  from-[#6841b0] to-[#0a0e4d] items-center justify-center">
      {loading && <Spinner intent={"white"} className="text-[#dd5c6e]" />}
      {!token && (
        <div className="flex flex-col text-red-800 min-w-[300px] bg-[#dd5c6e]/90 p-12 rounded-md items-center justify-center">
          <MdError className="mx-auto text-7xl my-6 " />
          <h1>No token provided</h1>
        </div>
      )}
      {error && (
        <div className="flex flex-col text-red-800 min-w-[300px] bg-[#dd5c6e]/90 p-12 rounded-md items-center justify-center">
          <MdError className="mx-auto text-7xl my-6 text-red-600" />
          <h1>{error}</h1>
        </div>
      )}
      {data?.verifyEmail.__typename === "MutationVerifyEmailSuccess" && (
        <div className="text-[#d7037f] bg-secondary-300 text-center p-12 rounded-md">
          <GiConfirmed className="mx-auto text-7xl my-6" />
          <h1>Your email has been verified.</h1>
          <p>You can now login to your account.</p>
          <Link
            href={"/login?verify=true"}
            className="underline text-secondary-800 hover:text-[#ee007d]"
          >
            Click here to login
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailComponent;

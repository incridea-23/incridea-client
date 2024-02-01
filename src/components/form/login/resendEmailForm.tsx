import React, { useState } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa";
import Button from "../../button";
import Spinner from "../../spinner";
import { useMutation } from "@apollo/client";
import { EmailVerificationDocument } from "@/src/generated/generated";

type Props = {
  setWhichForm: (whichForm: "signIn" | "resetPassword" | "signUp") => void;
  setGotDialogBox: (gotDialogBox: boolean) => void;
};

const ResendEmail = ({ setWhichForm, setGotDialogBox }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [
    emailVerificationMutation,
    { data, loading, error: emailVerificationError },
  ] = useMutation(EmailVerificationDocument);

  if (emailVerificationError) setGotDialogBox(true);

  const handleSubmit = async (e: any) => {
    setError(null);
    e.preventDefault();
    if (email === "") return;

    emailVerificationMutation({
      variables: {
        email: email,
      },
    }).then((res) => {
      if (res.data?.sendEmailVerification.__typename === "Error") {
        setError(res.data.sendEmailVerification.message);
        setGotDialogBox(true);
      }

      if (
        res.data?.sendEmailVerification.__typename ===
        "MutationSendEmailVerificationSuccess"
      ) {
        setGotDialogBox(true);
      }
    });
  };

  return (
    <>
      <form
        className={`relative py-3 px-3 flex flex-col gap-2 min-h-full justify-center ${
          loading && "cursor-not-allowed pointer-events-none"
        }`}
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-2xl pb-1 font-semibold">
          Resend Verification Email
        </h2>
        {data?.sendEmailVerification.__typename ===
        "MutationSendEmailVerificationSuccess" ? (
          <div className="flex flex-col gap-2 text-center items-center text-[#d7037f] bg-secondary-300 font-semibold p-4 pb-2 rounded-md">
            <BiCheckCircle size={"2rem"} />
            <div className="bg-secondary-300 flex flex-col text-center mb-5 items-center gap-3 rounded-md font-semibold">
              Verification email sent to {email}
              <br />
              Please check your inbox.
              {/* <hr className="border-secondary-600 my-2 mx-3" /> */}
              <div className="text-sm font-normal">
                <p>Didn&apos;t recieve the email?</p>
                <p>Make sure to check your spam folder.</p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="font-normal underline text-sm transition-colors text-secondary-800 hover:font-medium"
                >
                  Click here to resend it
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h6 className="text-center mb-10 ">
              Enter your email to receive a verification link
            </h6>
            <input
              value={email}
              onChange={({ target }) => {
                setError(null);
                setEmail(target.value);
              }}
              type="email"
              required
              className=" py-2 px-1 border-b  bg-transparent transition-all border-gray-400   placeholder:text-gray-500    md:focus:border-red-500 outline-none"
              placeholder="Email"
            />

            {(error || emailVerificationError) && (
              <div className="bg-red-100 p-2 flex items-center gap-3 px-4 rounded-md font-semibold text-red-500 overflow-x-auto min-w-full">
                <BiErrorCircle size={"1.3rem"} />
                {error || emailVerificationError?.message}
              </div>
            )}

            <Button type="submit" className="my-2">
              Send Verification Email
            </Button>

            {loading && (
              <div className="absolute h-full w-full bg-gradient-to-b from-[#1f2e97] to-[#090d4b] opacity-60 inset-0 cursor-not-allowed z-50 rounded-lg">
                <Spinner className="text-[#dd5c6e]" />
              </div>
            )}
          </>
        )}

        <Button intent={"ghost"} onClick={() => setWhichForm("signIn")}>
          <FaAngleLeft /> Go Back
        </Button>
      </form>
    </>
  );
};

export default ResendEmail;

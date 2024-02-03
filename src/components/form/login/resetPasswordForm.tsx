import { FormEventHandler, FunctionComponent, useState } from "react";
import { ResetPasswordEmailDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import { FaAngleLeft } from "react-icons/fa";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import Spinner from "../../spinner";
import Button from "../../button";

type ResetPasswordFormProps = {
  setWhichForm: (whichForm: "signIn" | "resetPassword") => void;
  setGotDialogBox: (gotDialogBox: boolean) => void;
};

const ResetPasswordForm: FunctionComponent<ResetPasswordFormProps> = ({
  setWhichForm,
  setGotDialogBox,
}) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [resetMutation, { data, loading, error: mutationError }] = useMutation(
    ResetPasswordEmailDocument
  );

  if (mutationError) setGotDialogBox(true);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // add some client side validations like empty fields, password length, etc.
    setError(null);
    e.preventDefault();
    if (email === "") return;

    resetMutation({
      variables: {
        email: email,
      },
    }).then((res) => {
      if (res.data?.sendPasswordResetEmail.__typename === "Error") {
        setError(res.data.sendPasswordResetEmail.message);
        setGotDialogBox(true);
      }

      if (
        res.data?.sendPasswordResetEmail.__typename ===
        "MutationSendPasswordResetEmailSuccess"
      )
        setGotDialogBox(true);
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
          Forgot password?
        </h2>

        {data?.sendPasswordResetEmail.__typename ===
        "MutationSendPasswordResetEmailSuccess" ? (
          <>
            <div className="flex flex-col gap-2 text-center items-center text-[#d7037f] bg-secondary-300 font-semibold p-4 rounded-md">
              <BiCheckCircle size={"2rem"} /> Reset link sent to your email.
              Please check your inbox.
            </div>
          </>
        ) : (
          <>
            <h6 className="text-center mb-10 ">
              Enter your email to receive a password reset link
            </h6>
            <input
              value={email}
              onChange={({ target }) => {
                setError(null);
                setEmail(target.value);
              }}
              type="email"
              required
              className="py-2 px-1 border-b bg-transparent transition-all border-gray-400 placeholder:text-slate-400  md:focus:border-[#dd5c6e]-500 outline-none"
              placeholder="Email"
            />

            <Button type="submit" className="mt-4">
              Send Reset Link
            </Button>

            {loading && (
              <div className="absolute h-full w-full bg-gradient-to-b from-[#1f2e97] to-[#090d4b] opacity-60 inset-0 cursor-not-allowed z-50 rounded-lg">
                <Spinner className="text-[#dd5c6e]" />
              </div>
            )}

            {(error || mutationError) && (
              <div className="bg-red-100 p-2 flex items-center gap-3 px-4 rounded-md font-semibold text-red-500 overflow-x-auto min-w-full">
                <BiErrorCircle size={"1.3rem"} />
                {error || mutationError?.message}
              </div>
            )}
          </>
        )}
        <Button
          intent={"ghost"}
          className="mt-5"
          onClick={() => setWhichForm("signIn")}
        >
          <FaAngleLeft /> Go Back
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;

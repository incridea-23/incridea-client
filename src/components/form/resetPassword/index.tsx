import { FormEventHandler, FunctionComponent, useState } from "react";
import { ResetPasswordDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Spinner from "../../spinner";
import Button from "../../button";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ResetPassword: FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const token = useRouter().query.token as string | undefined;

  const [resetMutation, { data, loading, error: MutationError }] = useMutation(
    ResetPasswordDocument
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid token");
      return;
    }

    resetMutation({
      variables: {
        password: password.newPassword,
        token: token as string,
      },
    }).then((res) => {
      if (res.data?.resetPassword.__typename === "Error") {
        setError(res.data.resetPassword.message);
      }
    });
  };

  return (
    <>
      {data?.resetPassword.__typename === "MutationResetPasswordSuccess" ? (
        <div className="flex relative justify-center flex-col gap-4 min-h-full">
          <div className="flex flex-col gap-2 text-center items-center text-[#d7037f] bg-secondary-300 font-semibold p-4 pb-2 rounded-md">
            <BiCheckCircle size={"2rem"} />
            <div className="bg-secondary-300 flex flex-col text-center mb-5 items-center gap-3 rounded-md font-semibold">
              Password was reset successfully.
              <br />
              <div>
                Please{" "}
                <Link
                  href="/login"
                  className="underline text-secondary-800 hover:text-[#ee007d]"
                >
                  login.
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          className={`flex relative py-3 px-3 justify-center flex-col gap-4 min-h-full  ${
            loading && "cursor-not-allowed pointer-events-none"
          }`}
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl text-center font-semibold mb-5">
            Enter New Password
          </h2>

          <div className="relative">
            <input
              required
              value={password.newPassword}
              onChange={({ target }) =>
                setPassword({ ...password, newPassword: target.value })
              }
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              className=" py-2 px-1 border-b w-full text-sm md:text-base bg-transparent transition-all border-gray-400 placeholder:text-slate-400 md:focus:border-[#dd5c6e] outline-none"
            />
            <button
              type="button"
              className="absolute top-0 mt-2 right-0 hover:bg-orange-500 hover:bg-opacity-10 rounded-sm w-fit p-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div className="relative">
            <input
              required
              value={password.confirmPassword}
              onChange={({ target }) =>
                setPassword({ ...password, confirmPassword: target.value })
              }
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              className=" py-2 px-1 w-full border-b text-sm md:text-base bg-transparent transition-all border-gray-400 placeholder:text-slate-400 md:focus:border-[#dd5c6e] outline-none mb-3"
            />
            <button
              type="button"
              className="absolute top-0 mt-2 right-0 hover:bg-orange-500 hover:bg-opacity-10 rounded-sm w-fit p-2"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <Button intent={`primary`} type="submit" className="mt-1 mx-1">
            Reset Password
          </Button>

          {loading && (
            <div className="absolute h-full w-full bg-gradient-to-b from-[#1f2e97] to-[#090d4b] opacity-60 inset-0 cursor-not-allowed z-50 rounded-lg">
              <Spinner className="text-[#dd5c6e]" />
            </div>
          )}

          {(error || MutationError) && (
            <div className="bg-red-100 p-2 flex items-center gap-3 px-4 rounded-md font-semibold text-red-500">
              <BiErrorCircle className="shrink-0" />
              <div>{error || MutationError?.message}</div>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default ResetPassword;

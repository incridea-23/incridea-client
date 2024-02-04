import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, FunctionComponent, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import Button from "../../button";
import Spinner from "../../spinner";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type SignInFormProps = {
  setWhichForm: (
    whichForm: "signIn" | "resetPassword" | "signUp" | "resendEmail"
  ) => void;
  setGotDialogBox: (gotDialogBox: boolean) => void;
  redirectUrl?: string;
};

const SignInForm: FunctionComponent<SignInFormProps> = ({
  setWhichForm,
  setGotDialogBox,
  redirectUrl,
}) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // add some client side validations like empty fields, password length, etc.
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    }).then((res) => {
      setLoading(false);
      return res;
    });

    if (res?.error) {
      setLoading(false);
      if (res.error.includes("verify")) setVerifyError(true);
      setError(res.error);
      setGotDialogBox(true);
    }

    if (res?.ok) {
      setError("");
      setGotDialogBox(false);
      setUserInfo({ email: "", password: "" });
      router.push(redirectUrl ? decodeURIComponent(redirectUrl) : "/profile");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <form
        className={`relative py-3 px-3 flex justify-center flex-col gap-3 min-h-full z-40 ${
          loading && "cursor-not-allowed pointer-events-none"
        }`}
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-center font-semibold">Welcome back!</h2>
        <h6 className="mb-10 text-center font-semibold md:font-normal">
          Sign in using your email and password
        </h6>
        <input
          value={userInfo.email}
          id="email"
          onChange={handleChange}
          className="placeholder:text-slate-400 py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400 md:focus:border-[#dd5c6e] outline-none"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <div className="relative">
          <input
            value={userInfo.password}
            id="password"
            onChange={handleChange}
            className="placeholder:text-slate-400 py-2 px-1 w-full border-b text-sm md:text-base bg-transparent transition-all border-gray-400 md:focus:border-[#dd5c6e] outline-none"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
          />
          <button
            type="button"
            className="absolute top-0 mt-2 right-0 hover:bg-orange-500 hover:bg-opacity-10 rounded-sm w-fit p-2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        <button
          onClick={() => setWhichForm("resetPassword")}
          type="button"
          className="text-sm w-fit -md:mt-1 mb-2 hover:underline text-accent-300 text-start"
        >
          Forgot your password?
        </button>

        <Button intent={`primary`} type="submit" className="mx-1">
          Login
        </Button>

        {loading && (
          <div className="absolute h-full w-full bg-gradient-to-b from-[#1f2e97] to-[#090d4b] opacity-60 inset-0 cursor-not-allowed z-50 rounded-lg">
            <Spinner className="text-[#dd5c6e]" />
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-2 flex items-center gap-3 px-4 rounded-md font-semibold text-red-500 max-w-[20px] overflow-x-auto min-w-full">
            <BiErrorCircle className="shrink-0" />
            <div>
              {error}
              {verifyError && (
                <button
                  type="button"
                  onClick={() => setWhichForm("resendEmail")}
                  className="inline-block transition-colors text-start hover:text-red-700 text-red-500 font-normal text-sm underline"
                >
                  Click here to resend verification email
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col md:mt-2 mt-3 relative text-center">
          <hr className="my-3 border-accent-50" />
          <h4 className="absolute top-0.5 translate-x-1/2 w-max mx-auto bg-[#1f2e97] rounded-full text-accent-50 right-1/2 px-3 py-[1px] text-sm">
            New here?
          </h4>
          <Button
            onClick={() => {
              setWhichForm("signUp");
            }}
            type="button"
            intent={"ghost"}
            className="mt-5 mx-1"
          >
            Sign up instead
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, FunctionComponent, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import Spinner from "../../spinner";

type SignInFormProps = {
  setWhichForm: (whichForm: "signIn" | "resetPassword" | "signUp") => void;
};

const SignInForm: FunctionComponent<SignInFormProps> = ({ setWhichForm }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      setError(res.error);
    }

    if (res?.ok) {
      setError("");
      setUserInfo({ email: "", password: "" });
      router.push("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <form
        className={`flex relative justify-center flex-col gap-3 min-h-full  ${
          loading && "cursor-not-allowed pointer-events-none"
        }`}
        onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-semibold">Welcome back!</h2>
        <h6 className="mb-10 text-center">Sign in using your email and password</h6>
        <input
          value={userInfo.email}
          id="email"
          onChange={handleChange}
          className=" py-2 px-1 border-b   transition-all border-gray-400  focus:border-sky-500 outline-none"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          value={userInfo.password}
          id="password"
          onChange={handleChange}
          className=" py-2 px-1 border-b   transition-all border-gray-400  focus:border-sky-500 outline-none"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button
          onClick={() => setWhichForm("resetPassword")}
          type="button"
          className="text-sm w-fit -mt-1 hover:underline text-gray-500 text-start">
          Forgot your password?
        </button>
        <button
          type="submit"
          className="bg-sky-500 mt-3 transition-colors hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
        {loading && (
          <div className="absolute h-full w-full bg-white/40 inset-0 rounded-lg cursor-not-allowed pointer-events-none z-50">
            <Spinner className="text-sky-600" />
          </div>
        )}
        {error && (
          <div className="bg-red-100 p-2 flex items-center gap-2 px-4 rounded-md font-semibold text-red-500">
            <BiErrorCircle />
            {error}
          </div>
        )}
        <div className="flex flex-col mt-2 relative text-center">
          <hr className="my-3" />
          <h4 className="absolute top-0 translate-x-1/2 bg-white text-gray-400 right-1/2 px-3 text-sm">
            New here?
          </h4>
          <button
            onClick={() => setWhichForm("signUp")}
            type="button"
            className="border-sky-500 border mt-3 transition-colors hover:bg-sky-100 text-sky-500 font-bold py-2 px-4 rounded">
            Sign up instead
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;

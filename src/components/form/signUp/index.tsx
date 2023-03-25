import { EmailVerificationDocument, SignUpDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useState, FormEventHandler, FunctionComponent } from "react";
import { BiErrorCircle } from "react-icons/bi";
import Spinner from "../../spinner";

type SignUpFormProps = {
  setWhichForm: (whichForm: "signIn" | "resetPassword" | "signUp") => void;
};

const SignUpForm: FunctionComponent<SignUpFormProps> = ({ setWhichForm }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [signUpMutation, { loading, error: mutationError }] = useMutation(SignUpDocument);

  const [
    emailVerificationMutation,
    { data, loading: emailVerificationLoading, error: emailVerificationError },
  ] = useMutation(EmailVerificationDocument);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (userInfo.name === "" || userInfo.email === "" || userInfo.password === "") {
      setError("Please fill all the fields");
      return;
    }
    if (userInfo.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    signUpMutation({
      variables: {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data?.signUp.__typename === "MutationSignUpSuccess") {
          emailVerificationMutation({
            variables: {
              email: userInfo.email,
            },
          }).then((res) => {
            if (res.data?.sendEmailVerification.__typename === "Error") {
              setError(res.data.sendEmailVerification.message);
            }
          });
        }
        if (res.data?.signUp.__typename === "Error") {
          setError(res.data.signUp.message);
        }
      })
      .catch((err) => {
        return err;
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex relative justify-center min-h-full flex-col gap-3 ${
        loading && "cursor-not-allowed pointer-events-none"
      }`}>
      <h2 className="text-3xl text-center font-semibold">Welcome to Incridea! 👋</h2>
      <h6 className="mb-10 text-center">
        We&apos;re excited to have you here! Sign up below.{" "}
      </h6>
      <input
        value={userInfo.name}
        onChange={handleChange}
        name="name"
        type="text"
        required
        className=" py-2 px-1 border-b transition-all border-gray-400  focus:border-sky-500 outline-none"
        placeholder="Name"
      />

      <input
        value={userInfo.email}
        onChange={handleChange}
        name="email"
        type="email"
        required
        className=" py-2 px-1 border-b transition-all border-gray-400  focus:border-sky-500 outline-none"
        placeholder="Email"
      />
      <input
        value={userInfo.password}
        onChange={handleChange}
        name="password"
        type="password"
        required
        placeholder="Password"
        className=" py-2 px-1 border-b transition-all border-gray-400  focus:border-sky-500 outline-none"
      />
      <button className="bg-sky-500 mt-3 transition-colors hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
        Sign Up
      </button>
      <div className="flex flex-col mt-2 relative text-center">
        <hr className="my-3" />
        <h4 className="absolute top-0 translate-x-1/2 whitespace-nowrap bg-white text-gray-400 right-1/2 px-3 text-sm">
          Already have an account?
        </h4>
        <button
          onClick={() => setWhichForm("signIn")}
          type="button"
          className="border-sky-500 border mt-3 transition-colors hover:bg-sky-100 text-sky-500 font-bold py-2 px-4 rounded">
          Sign in instead
        </button>
      </div>
      {loading && (
        <div className="absolute h-full w-full bg-white/40 inset-0 rounded-lg cursor-not-allowed pointer-events-none z-50">
          <Spinner className="text-sky-600" />
        </div>
      )}
      {(error || mutationError || emailVerificationError) && (
        <div className="bg-red-100 p-2 flex items-center gap-3 px-4 rounded-md font-semibold text-red-500">
          <BiErrorCircle size={"1.3rem"} />
          {error || mutationError?.message || emailVerificationError?.message}
        </div>
      )}
    </form>
  );
};

export default SignUpForm;

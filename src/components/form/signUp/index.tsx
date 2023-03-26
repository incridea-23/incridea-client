import {
  CollegesDocument,
  EmailVerificationDocument,
  SignUpDocument,
} from "@/src/generated/generated";
import { useMutation, useQuery } from "@apollo/client";
import { Combobox, Transition } from "@headlessui/react";
import { useState, FormEventHandler, FunctionComponent, Fragment } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { BsChevronExpand } from "react-icons/bs";
import Spinner from "../../spinner";

type SignUpFormProps = {
  setWhichForm: (whichForm: "signIn" | "resetPassword" | "signUp") => void;
};

const SignUpForm: FunctionComponent<SignUpFormProps> = ({ setWhichForm }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    college: "",
  });
  const [error, setError] = useState("");

  const [signUpMutation, { loading, error: mutationError }] = useMutation(SignUpDocument);

  const [
    emailVerificationMutation,
    { data, loading: emailVerificationLoading, error: emailVerificationError },
  ] = useMutation(EmailVerificationDocument);

  const {
    data: collegeData,
    loading: collegesLoading,
    error: collegesError,
  } = useQuery(CollegesDocument);

  const [selectedCollege, setSelectedCollege] = useState(collegeData?.colleges[0]);
  const [query, setQuery] = useState("");

  const filteredColleges =
    query === ""
      ? collegeData?.colleges
      : collegeData?.colleges?.filter((college) => {
          return college.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""));
        });

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
        // mobile: userInfo.phoneNumber,
        // college:   userInfo.college,
      },
    })
      .then((res) => {
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

  // NOTE: change handler for all fields except college
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
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
      <input
        value={userInfo.phoneNumber}
        onChange={handleChange}
        name="phoneNumber"
        type="text"
        required
        pattern="[0-9]{10}"
        placeholder="Mobile"
        className=" py-2 px-1 border-b transition-all border-gray-400  focus:border-sky-500 outline-none"
      />
      <Combobox
        value={selectedCollege}
        onChange={(value) => {
          setUserInfo((prev) => ({ ...prev, college: value?.id }));
          setSelectedCollege(value);
        }}>
        <div className="relative">
          <div className="relative w-full focus:border-sky-500 border-gray-400 cursor-default overflow-hidden border-b ">
            <Combobox.Input
              placeholder="College"
              displayValue={(college: { name: string }) => college.name}
              className="w-full outline-none border-none py-2 pl-2 pr-10 text-gray-900 focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
          <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 border text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {collegesLoading ? (
              <div className="select-none py-2 px-4 italic text-gray-500">
                Loading colleges...
              </div>
            ) : filteredColleges?.length === 0 && query !== "" ? (
              <div className="relative font-semibold select-none py-2 px-4 text-gray-600">
                College not found. Please contact admin.
                {/* TODO: Make this a hyperlink for contacting adming */}
              </div>
            ) : (
              filteredColleges?.map((college) => (
                <Combobox.Option
                  className={({ active }) =>
                    `relative select-none py-2 cursor-pointer px-4 ${
                      active ? "bg-sky-500 text-white" : "text-gray-900"
                    }`
                  }
                  key={college.id}
                  value={college}>
                  {college.name}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <button className="bg-sky-500 mt-3 transition-colors hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
        Sign Up
      </button>
      {(error || mutationError || emailVerificationError) && (
        <div className="bg-red-100 p-2 flex items-center gap-3 px-4 rounded-md font-semibold text-red-500">
          <BiErrorCircle size={"1.3rem"} />
          {error || mutationError?.message || emailVerificationError?.message}
        </div>
      )}
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
    </form>
  );
};

export default SignUpForm;

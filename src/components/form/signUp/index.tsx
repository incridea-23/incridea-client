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
import Button from "../../button";
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

  const [signUpMutation, { loading, error: mutationError }] =
    useMutation(SignUpDocument);

  const [
    emailVerificationMutation,
    { data, loading: emailVerificationLoading, error: emailVerificationError },
  ] = useMutation(EmailVerificationDocument);

  const {
    data: collegeData,
    loading: collegesLoading,
    error: collegesError,
  } = useQuery(CollegesDocument);

  const [selectedCollege, setSelectedCollege] = useState<{
    name: string;
    id: string;
  }>({
    name: "",
    id: "",
  });
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
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.phoneNumber ||
      !userInfo.college
    ) {
      setError("Please fill all the fields");
      return;
    }
    if (
      userInfo.phoneNumber.length !== 10 ||
      isNaN(Number(userInfo.phoneNumber))
    ) {
      setError("Please enter a valid 10-digit mobile number");
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
        phoneNumber: userInfo.phoneNumber,
        collegeId: Number(userInfo.college),
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
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
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
      <h2 className="text-3xl text-center font-semibold">
        Welcome to Incridea! 👋
      </h2>
      <h6 className="mb-10 mt-2 md:mt-0 text-center md:font-normal font-semibold">
        We&apos;re excited to have you here! Sign up below{" "}
      </h6>
      <input
        value={userInfo.name}
        onChange={handleChange}
        name="name"
        type="text"
        required
        className=" py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400   placeholder:text-gray-500 text-black   md:focus:border-[#dd5c6e] outline-none"
        placeholder="Name"
      />

      <input
        value={userInfo.email}
        onChange={handleChange}
        name="email"
        type="email"
        required
        className=" py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400   placeholder:text-gray-500 text-black   md:focus:border-[#dd5c6e] outline-none"
        placeholder="Email"
      />
      <input
        value={userInfo.password}
        onChange={handleChange}
        name="password"
        type="password"
        required
        placeholder="Password"
        className=" py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400   placeholder:text-gray-500 text-black   md:focus:border-[#dd5c6e] outline-none"
      />
      <input
        value={userInfo.phoneNumber}
        onChange={handleChange}
        name="phoneNumber"
        type="text"
        required
        placeholder="Mobile"
        className=" py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400   placeholder:text-gray-500 text-black   md:focus:border-[#dd5c6e] outline-none"
      />
      <Combobox
        value={selectedCollege}
        onChange={(value) => {
          setUserInfo((prev) => ({ ...prev, college: value.id }));
          setSelectedCollege(value);
        }}>
        <div className="relative">
          <div className="relative w-full md:focus-within:border-[#dd5c6e] md:focus:border-[#dd5c6e] border-gray-400 cursor-default overflow-hidden border-b ">
            <Combobox.Input
              required
              placeholder="College"
              displayValue={(college: { name: string }) => college.name}
              className="w-full bg-transparent outline-none text-sm md:text-base py-2 pl-2 pr-10 md:text-gray-900 placeholder:text-gray-500 text-black   "
              onChange={(e) => setQuery(e.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-100 md:text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}>
            <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 border text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {collegesLoading ? (
                <div className="select-none text-center py-2 px-4 italic text-gray-500">
                  <Spinner className="text-gray-400" size={"small"} />
                </div>
              ) : filteredColleges?.length === 0 && query !== "" ? (
                <div className="relative font-semibold md:text-base text-xs select-none py-2 px-4 text-gray-600">
                  College not found. Please contact admin.
                  {/* TODO: Make this a hyperlink for contacting admin */}
                </div>
              ) : (
                filteredColleges?.map((college) => (
                  <Combobox.Option
                    className={({ active }) =>
                      `relative select-none py-2 text-xs md:text-base cursor-pointer px-4 ${
                        active ? "bg-[#dd5c6e] text-white" : "text-gray-900"
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
      <Button className="mt-3">Sign Up</Button>
      {(error || mutationError || emailVerificationError) && (
        <div className="bg-red-100 p-2 flex items-center gap-3 px-4 rounded-md font-semibold text-red-500">
          <BiErrorCircle size={"1.3rem"} />
          {error || mutationError?.message || emailVerificationError?.message}
        </div>
      )}
      <div className="flex flex-col md:mt-2 mt-5 relative text-center">
        <hr className="my-3  border-white" />
        <h4 className="absolute top-0.5 translate-x-1/2 w-max mx-auto bg-white rounded-full text-gray-400 right-1/2 md:px-2 px-3 text-sm">
          Already have an account?
        </h4>
        <Button
          intent={'ghost'}
          onClick={() => setWhichForm("signIn")}
          type="button"
          className="mt-5">
          Sign in instead
        </Button>
      </div>
      {loading && (
        <div className="absolute h-full w-full bg-[#f3e9d1] bg-opacity-60 inset-0 rounded-lg cursor-not-allowed pointer-events-none z-50">
          <Spinner className="text-[#dd5c6e]" />
        </div>
      )}
    </form>
  );
};

export default SignUpForm;

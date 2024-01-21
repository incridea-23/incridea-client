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
import {
    AiFillEye,
    AiFillEyeInvisible,
    AiOutlineInfoCircle,
} from "react-icons/ai";
import Link from "next/link";

type SignUpFormProps = {
    setWhichForm: (
        whichForm: "signIn" | "resetPassword" | "signUp" | "resendEmail"
    ) => void;
};

const SignUpForm: FunctionComponent<SignUpFormProps> = ({ setWhichForm }) => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        college: "",
        accepted: false,
    });
    const [error, setError] = useState("");
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [verifyError, setVerifyError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [signUpMutation, { loading, error: mutationError }] =
        useMutation(SignUpDocument);
    const [
        emailVerificationMutation,
        {
            data,
            loading: emailVerificationLoading,
            error: emailVerificationError,
        },
    ] = useMutation(EmailVerificationDocument);
    const {
        data: collegeData,
        loading: collegesLoading,
        error: collegesError,
    } = useQuery(CollegesDocument);

    const sortColleges = () => {
        const nmamit = collegeData?.colleges.find(
            (college) => college.name === "N.M.A.M. Institute of Technology"
        );
        const other = collegeData?.colleges.find(
            (college) => college.name === "Other"
        );
        const sortedColleges = [...(collegeData?.colleges || [])]
            .filter((college) => {
                return (
                    college.name !== "N.M.A.M. Institute of Technology" &&
                    college.name !== "Other"
                );
            })
            .sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        return [nmamit, ...sortedColleges, other];
    };

    const sortedColleges = sortColleges();
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
            ? sortedColleges
            : sortedColleges?.filter((college) => {
                  return college?.name
                      .toLowerCase()
                      .replace(/[.,\s]/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""));
              });

    const resendEmail = () => {
        setEmailSuccess(false);
        emailVerificationMutation({
            variables: {
                email: userInfo.email,
            },
        }).then((res) => {
            if (res.data?.sendEmailVerification.__typename === "Error") {
                setError(res.data.sendEmailVerification.message);
            } else {
                setEmailSuccess(true);
            }
        });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setVerifyError(false);
        setError("");
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
        if (selectedCollege.name === "N.M.A.M. Institute of Technology") {
            if (userInfo.email.split("@").length > 1) {
                setError('Please only enter your USN without "@nmamit.in"');
                return;
            }
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
                email:
                    selectedCollege.name === "N.M.A.M. Institute of Technology"
                        ? `${userInfo.email.trim()}@nmamit.in`
                        : userInfo.email,
                password: userInfo.password,
                phoneNumber: userInfo.phoneNumber,
                collegeId: Number(userInfo.college),
            },
        })
            .then((res) => {
                if (res.data?.signUp.__typename === "MutationSignUpSuccess") {
                    emailVerificationMutation({
                        variables: {
                            email:
                                selectedCollege.name ===
                                "N.M.A.M. Institute of Technology"
                                    ? `${userInfo.email}@nmamit.in`
                                    : userInfo.email,
                        },
                    }).then((res) => {
                        if (
                            res.data?.sendEmailVerification.__typename ===
                            "Error"
                        ) {
                            setError(res.data.sendEmailVerification.message);
                        } else {
                            setEmailSuccess(true);
                        }
                    });
                }
                if (res.data?.signUp.__typename === "Error") {
                    setError(res.data.signUp.message);
                    if (res.data.signUp.message.includes("verify"))
                        setVerifyError(true);
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
            <p className="text-2xl text-center font-semibold">Welcome player</p>

            {!emailSuccess && (
                <>
                    <input
                        value={userInfo.name}
                        onChange={handleChange}
                        name="name"
                        type="text"
                        required
                        className={`${
                            selectedCollege.name === "Other" ? "mt-2" : "mt-2"
                        } py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400   placeholder:text-gray-500 text-black   md:focus:border-[#dd5c6e] outline-none`}
                        placeholder="Name"
                    />
                    {/* FIXME: removed mt-10 from the above component when college was not "Other"*/}

                    <Combobox
                        value={selectedCollege}
                        onChange={(value) => {
                            setUserInfo((prev) => ({
                                ...prev,
                                college: value.id,
                            }));
                            setSelectedCollege(value);
                        }}>
                        <div className="relative">
                            <div className="relative w-full md:focus-within:border-[#dd5c6e] md:focus:border-[#dd5c6e] border-gray-400 cursor-default overflow-hidden border-b ">
                                <Combobox.Input
                                    required
                                    placeholder="College"
                                    displayValue={(college: { name: string }) =>
                                        college.name
                                    }
                                    className="w-full bg-transparent outline-none text-sm md:text-base py-2 pl-1 pr-10 md:text-gray-900 placeholder:text-gray-500 text-black   "
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
                                            <Spinner
                                                className="text-gray-400"
                                                size={"small"}
                                            />
                                        </div>
                                    ) : filteredColleges?.length === 0 &&
                                      query !== "" ? (
                                        //FIXME no need to touch
                                        <div className="relative font-semibold md:text-base text-xs select-none py-2 px-4 text-gray-600">
                                            College not found. Please{" "}
                                            <Link
                                                href="/contact"
                                                className="underline hover:text-gray-700 cursor-pointer">
                                                contact admin.
                                            </Link>
                                        </div>
                                    ) : (
                                        //FIXME

                                        filteredColleges?.map((college) => (
                                            <Combobox.Option
                                                className={({ active }) =>
                                                    `relative select-none py-2 text-xs md:text-base cursor-pointer px-4 ${
                                                        active
                                                            ? "bg-[#dd5c6e] text-white"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                                key={college?.id}
                                                value={college}>
                                                {college?.name}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>

                    {selectedCollege.name === "Other" && (
                        <div className="bg-blue-100 p-2 flex items-center gap-3 px-4 rounded-md font-semibold text-blue-500">
                            <AiOutlineInfoCircle className="shrink-0" />
                            <div>
                                <a className="inline-block transition-colors text-start text-blue-500 font-normal text-sm">
                                    This option is exclusively for invited
                                    participants without access to pronites. If
                                    your college is not in the list above and
                                    you are not invited, please{" "}
                                    <Link
                                        href="/contact"
                                        className="underline hover:text-blue-700 cursor-pointer">
                                        contact us
                                    </Link>
                                    . Refer to the{" "}
                                    <Link
                                        href="/guidelines"
                                        className="underline hover:text-blue-700 cursor-pointer">
                                        Guidelines
                                    </Link>{" "}
                                    page for more details.
                                </a>
                            </div>
                        </div>
                    )}

                    <div className="relative">
                        <input
                            value={userInfo.email}
                            onChange={handleChange}
                            name="email"
                            required
                            className={`${
                                selectedCollege.name ==
                                    "N.M.A.M. Institute of Technology" &&
                                "pr-28"
                            } w-full py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400   placeholder:text-gray-500 text-black   md:focus:border-[#dd5c6e] outline-none`}
                            placeholder="Email"
                        />
                        {selectedCollege.name ===
                            "N.M.A.M. Institute of Technology" && (
                            <span className="absolute top-0 mt-2 right-0 mr-3 text-black">
                                @nmamit.in
                            </span>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            value={userInfo.password}
                            onChange={handleChange}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Password"
                            className=" py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400 placeholder:text-gray-500 text-black   md:focus:border-[#dd5c6e] outline-none w-full"
                        />
                        <button
                            type="button"
                            className="absolute top-0 mt-2 right-0 hover:bg-orange-500 hover:bg-opacity-10 rounded-sm w-fit p-2"
                            onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (
                                <AiFillEyeInvisible />
                            ) : (
                                <AiFillEye />
                            )}
                        </button>
                    </div>
                    <input
                        value={userInfo.phoneNumber}
                        onChange={handleChange}
                        name="phoneNumber"
                        type="text"
                        required
                        placeholder="Mobile"
                        className=" py-2 px-1 border-b text-sm md:text-base bg-transparent transition-all border-gray-400   placeholder:text-gray-500 text-black   md:focus:border-[#dd5c6e] outline-none"
                    />

                    <div className="flex">
                        <input
                            required
                            type="checkbox"
                            className="mr-2"
                            checked={userInfo.accepted}
                            id="termsCheckbox"
                            onChange={() =>
                                setUserInfo((prev) => ({
                                    ...prev,
                                    accepted: !prev.accepted,
                                }))
                            }
                        />
                        <label htmlFor="termsCheckbox">
                            <span className="text-xs lg:text-sm md:text-base text-gray-500">
                                I agree to all the{" "}
                                <Link
                                    href="/rules"
                                    className="underline hover:text-gray-700 cursor-pointer">
                                    T&C
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/guidelines"
                                    className="underline hover:text-gray-700 cursor-pointer">
                                    Guidelines
                                </Link>{" "}
                            </span>
                        </label>
                    </div>

                    <Button className="mt-3">Sign Up</Button>
                </>
            )}

            {(error || mutationError || emailVerificationError) && (
                <div className="bg-red-100 p-2 flex items-center gap-3 px-4 rounded-md font-semibold text-red-500">
                    <BiErrorCircle className="shrink-0" />
                    <div>
                        {error}
                        {verifyError && (
                            <button
                                type="button"
                                onClick={() => setWhichForm("resendEmail")}
                                className="inline-block transition-colors text-start hover:text-red-700 text-red-500 font-normal text-sm underline">
                                Click here to resend verification email
                            </button>
                        )}
                    </div>
                </div>
            )}

            {emailSuccess && (
                <div className="bg-green-100 p-4 flex flex-col text-center  items-center gap-3 rounded-md font-semibold text-green-500">
                    <div>
                        Verification email sent to {userInfo.email}
                        {selectedCollege.name ===
                            "N.M.A.M. Institute of Technology" && "@nmamit.in"}
                        <br />
                        Please check your inbox.
                        <hr className="border-green-300 mx-3 my-2" />
                        <div className="text-sm font-normal">
                            <p>Didn&apos;t receive the email?</p>
                            <p>Make sure to check your spam folder.</p>
                            <button
                                type="button"
                                onClick={resendEmail}
                                className="font-normal underline text-sm transition-colors  text-green-500 hover:text-green-700">
                                Click here to resend it
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col mt-2 relative text-center">
                <hr className="my-3 border-[#6f5925]" />
                <h4 className="absolute top-0.5 translate-x-1/2 w-max mx-auto bg-[#f3e9d1] rounded-full text-[#6f5925] right-1/2 md:px-2 px-3 text-sm">
                    Already have an account?
                </h4>
                <Button
                    intent={"ghost"}
                    onClick={() => {
                        setWhichForm("signIn");
                    }}
                    type="button"
                    className="mt-4">
                    Sign in instead
                </Button>
            </div>

            {(loading || emailVerificationLoading) && (
                <div className="absolute h-full text-[#dd5c6e] gap-5 w-full flex flex-col items-center justify-center bg-[#f3e9d1] bg-opacity-70 inset-0 rounded-lg cursor-not-allowed pointer-events-none z-30">
                    <Spinner className="h-fit my-0 text-[#dd5c6e]" />
                    {emailVerificationLoading && (
                        <p className="font-semibold">
                            Sending Verification Email
                        </p>
                    )}
                </div>
            )}
        </form>
    );
};

export default SignUpForm;

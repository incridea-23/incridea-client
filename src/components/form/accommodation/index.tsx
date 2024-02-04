import { useState, FunctionComponent, FormEventHandler, Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddAccommodationRequestDocument,
  GetAllHotelsDocument,
  AccommodationRequestsByUserDocument,
} from "@/src/generated/generated";
import Button from "../../button";
import { MdModeEditOutline } from "react-icons/md";
import createToast from "../../toast";
import { Combobox, Transition, Switch } from "@headlessui/react";
import { BsChevronExpand } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { TbArrowBackUp } from "react-icons/tb";
import Spinner from "../../spinner";
import { IoEye } from "react-icons/io5";
import ViewUserAccommodation from "../../pages/profile/viewUserAccommodation";

const AccommodationForm: FunctionComponent = () => {
  const [
    addAccommodation,
    { data, loading: emailVerificationLoading, error: emailVerificationError },
  ] = useMutation(AddAccommodationRequestDocument, {
    refetchQueries: [AccommodationRequestsByUserDocument],
  });

  const router = useRouter();

  const { data: allHotels } = useQuery(GetAllHotelsDocument);
  const {
    data: accommodationData,
    loading: accommodationLoading,
    refetch: userRefetch,
  } = useQuery(AccommodationRequestsByUserDocument);

  const [uploading, setUploading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const genders = ["Male", "Female", "Other"];
  const [gender, setGender] = useState("");
  const [genderQuery, setGenderQuery] = useState("");
  const filteredGenders =
    genderQuery === ""
      ? genders
      : genders.filter((gender) => {
          return gender.toLowerCase().includes(genderQuery.toLowerCase());
        });

  const hotels = allHotels?.getAllHotels;
  const [hotel, setHotel] = useState("");
  const [hotelQuery, setHotelQuery] = useState("");
  const filteredHotels =
    hotelQuery === ""
      ? hotels
      : hotels?.filter((hotel) => {
          return hotel.name.toLowerCase().includes(hotelQuery.toLowerCase());
        }) || [];

  // FIXME: No AC rooms??
  // const [AC, setAC] = useState<boolean>(false);

  const toISOStringWithTimezone = (date: Date) => {
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? "+" : "-";
    const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth()) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      diff +
      pad(tzOffset / 60) +
      pad(tzOffset % 60)
    );
  };

  const [AccommodationInfo, setAccommodationInfo] = useState({
    hotelId: -1,
    gender: "",
    checkInTime: new Date(2024, 2, 22, 9, 30).toString(),
    checkOutTime: new Date(2024, 2, 24, 22, 30).toString(),
    id: "",
  });

  const handleUpload = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const url = `https://incridea-pai3.onrender.com/id/upload`;
    setUploading(true);
    const promise = fetch(url, {
      method: "POST",
      body: formData,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAccommodationInfo((prevValue) => {
          return { ...prevValue, id: res.url };
        });
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
    createToast(promise, "Uploading image...");
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    console.log(AccommodationInfo);
    e.preventDefault();
    addAccommodation({
      variables: AccommodationInfo,
    });
    setFormSubmitted(true);
  };

  return (
    <>
      {showModal && (
        <ViewUserAccommodation
          inAccommodation={true}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <div className="mt-10 mb-4 px-6 py-8 h-max min-w-[350px] md:min-w-[450px] max-w-[350px] md:max-w-[450px] bg-gradient-to-b from-[#561e98] to-[#561e98] rounded-md text-accent-200">
        {emailVerificationLoading ? (
          <div className="flex flex-col md:flex-row w-full">
            <Spinner className="text-[#dd5c6e]" intent={"white"} />
          </div>
        ) : accommodationLoading ? (
          <div className="flex flex-col md:flex-row w-full">
            <Spinner className="text-[#dd5c6e]" intent={"white"} />
          </div>
        ) : formSubmitted ? (
          <div className="flex flex-col md:flex-row">
            <div className="flex justify-center">
              We will get back to you within 2 working days.
            </div>
            <Button
              onClick={() => {
                router.push("/profile");
              }}
              size={"small"}
              className="ml-3 w-max mt-3 md:mt-0"
            >
              <TbArrowBackUp />
              Go Back
            </Button>
          </div>
        ) : accommodationData?.accommodationRequestsByUser[0]?.status ? (
          <div className="flex flex-col md:flex-row">
            <div className="flex justify-center">
              We are processing your request. Please bear with us.
            </div>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              size={"small"}
              className="ml-3 w-max mt-3 md:mt-0 self-end"
            >
              <IoEye />
              View Request
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`flex relative justify-center min-h-full flex-col gap-5`}
          >
            <p className="text-2xl text-center font-semibold mb-3">
              Accommodation Request
            </p>

            <Combobox
              value={gender}
              onChange={(value) => {
                setAccommodationInfo((prev) => {
                  return { ...prev, gender: value.toUpperCase() };
                });
                setGender(value);
              }}
            >
              <div className="relative">
                <div className="relative w-full md:focus-within:border-[#dd5c6e] md:focus:border-[#dd5c6e] border-gray-400 cursor-default overflow-hidden border-b ">
                  <Combobox.Input
                    required
                    placeholder="Gender"
                    displayValue={(gender: string) => {
                      return gender;
                    }}
                    className="w-full bg-transparent outline-none text-sm md:text-base py-2 pl-1 pr-10 placeholder:text-slate-400"
                    onChange={(e) => setGenderQuery(e.target.value)}
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
                  afterLeave={() => setGenderQuery("")}
                >
                  <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 border text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredGenders?.length === 0 && genderQuery !== "" ? (
                      <div className="relative font-semibold md:text-base text-xs select-none py-2 px-4 text-gray-600">
                        Please select from dropdown
                      </div>
                    ) : (
                      filteredGenders?.map((gender) => (
                        <Combobox.Option
                          className={({ active }) =>
                            `relative select-none py-2 text-xs md:text-base cursor-pointer px-4 ${
                              active
                                ? "bg-[#dd5c6e] text-white"
                                : "text-gray-900"
                            }`
                          }
                          key={gender}
                          value={gender}
                        >
                          {gender}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>

            <Combobox
              value={hotel}
              onChange={(id: string) => {
                setAccommodationInfo((prev) => {
                  return {
                    ...prev,
                    hotelId: parseInt(id),
                  };
                });
                setHotel(hotels?.find((hotel) => hotel.id === id)?.name || "");
              }}
            >
              <div className="relative">
                <div className="relative w-full md:focus-within:border-[#dd5c6e] md:focus:border-[#dd5c6e] border-gray-400 cursor-default overflow-hidden border-b ">
                  <Combobox.Input
                    required
                    placeholder="Hotel"
                    className="w-full bg-transparent outline-none text-sm md:text-base py-2 pl-1 pr-10 placeholder:text-slate-400"
                    onChange={(e) => setHotelQuery(e.target.value)}
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
                  afterLeave={() => setHotelQuery("")}
                >
                  <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 border text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredHotels?.length === 0 && hotelQuery !== "" ? (
                      <div className="relative font-semibold md:text-base text-xs select-none py-2 px-4 text-gray-600">
                        Hotel not found. Please{" "}
                        <Link
                          href="/contact"
                          className="underline hover:text-gray-700 cursor-pointer"
                        >
                          contact admin.
                        </Link>
                      </div>
                    ) : (
                      filteredHotels?.map((hotel) => (
                        <Combobox.Option
                          className={({ active }) =>
                            `relative select-none py-2 text-xs md:text-base cursor-pointer px-4 ${
                              active
                                ? "bg-[#dd5c6e] text-white"
                                : "text-gray-900"
                            }`
                          }
                          key={hotel.id}
                          value={hotel.id}
                        >
                          {hotel.name}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>

            {/* FIXME: No AC rooms??*/}
            {/* <Switch.Group>
            <div className="flex items-center">
              <Switch.Label className="mr-4">Non-AC</Switch.Label>
              <Switch
                checked={AC}
                onChange={(e) => {
                  setAC(e);
                  setAccommodationInfo((prev) => {
                    // FIXME: fix why AC had to be negated
                    return { ...prev, ac: !AC };
                  });
                }}
                as={Fragment}>
                {({ checked }) => (
                  <button
                    className={`${
                      checked ? "bg-secondary-800" : "bg-gray-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}>
                    <span className="sr-only">AC</span>
                    <span
                      className={`${
                        checked ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </button>
                )}
              </Switch>
              <Switch.Label className="ml-4">AC</Switch.Label>
            </div>
          </Switch.Group> */}

            <div className="w-full">
              <label htmlFor="checkInTime" className="mb-2 text-sm block">
                From Date
              </label>
              <input
                required
                type="datetime-local"
                id="checkInTime"
                className="w-full mt-1 p-1 bg-inherit border-b border-gray-400 dark:[color-scheme:dark]"
                value={toISOStringWithTimezone(
                  new Date(AccommodationInfo.checkInTime)
                ).slice(0, 16)}
                onChange={(e) => {
                  setAccommodationInfo((prevValue) => {
                    return {
                      ...prevValue,
                      checkInTime: e.target.value.toString(),
                    };
                  });
                }}
              />
            </div>
            <div className="w-full">
              <label htmlFor="checkOutTime" className="mb-2 text-sm block">
                To Date
              </label>
              <input
                required
                type="datetime-local"
                id="checkOutTime"
                className="w-full mt-1 p-1 bg-inherit border-b border-gray-400 dark:[color-scheme:dark]"
                value={toISOStringWithTimezone(
                  new Date(AccommodationInfo.checkOutTime)
                ).slice(0, 16)}
                onChange={(e) =>
                  setAccommodationInfo((prevValue) => {
                    return {
                      ...prevValue,
                      checkOutTime: e.target.value.toString(),
                    };
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-white">Upload ID</label>
              <input
                required
                type="file"
                id="image"
                className="file:mr-4 file:py-2.5 file:rounded-r-none file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:transition-colors file:cursor-pointer file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border w-full text-sm rounded-lg block  bg-gray-600 border-gray-600 placeholder-slate-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                onChange={(e) => handleUpload(e.target.files![0])}
              />
            </div>

            <Button
              intent={"primary"}
              type="submit"
              className="mt-4 flex justify-center"
            >
              <MdModeEditOutline />
              Submit
            </Button>

            <h1 className="text-xs md:text-sm text-gray-100">
              By clicking the above button, you agree to the mentioned terms and
              conditions
            </h1>
          </form>
        )}
      </div>
    </>
  );
};

export default AccommodationForm;

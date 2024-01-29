import { useState, FunctionComponent, FormEventHandler, Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
    AddAccommodationRequestDocument,
    GetAllHotelsDocument,
} from "@/src/generated/generated";
import Button from "../../button";
import { MdModeEditOutline } from "react-icons/md";
import createToast from "../../toast";
import { Combobox, Transition, Switch } from "@headlessui/react";
import { BsChevronExpand } from "react-icons/bs";
import Link from "next/link";

const CreateAccommodationRequest: FunctionComponent = () => {
    const [
        addAccommodation,
        {
            data,
            loading: emailVerificationLoading,
            error: emailVerificationError,
        },
    ] = useMutation(AddAccommodationRequestDocument);

    const { data: allHotels } = useQuery(GetAllHotelsDocument);
    const [Uploading, setUploading] = useState(false);
    const [banner, setBanner] = useState("");

    const genders = ["Male", "Female", "Other"];
    const [gender, setGender] = useState("");
    const [genderQuery, setGenderQuery] = useState("");
    const filteredGenders =
        genderQuery === ""
            ? genders
            : genders.filter((gender) => {
                  return gender
                      .toLowerCase()
                      .includes(genderQuery.toLowerCase());
              });

    const hotels = allHotels?.getAllHotels;
    const [hotel, setHotel] = useState("");
    const [hotelQuery, setHotelQuery] = useState("");
    const filteredHotels =
        hotelQuery === ""
            ? hotels
            : hotels?.filter((hotel) => {
                  return hotel.name
                      .toLowerCase()
                      .includes(hotelQuery.toLowerCase());
              }) || [];

    const [AC, setAC] = useState<boolean>(false);

    const [AccommodationInfo, setAccommodationInfo] = useState({
        ac: false,
        hotelId: -1,
        gender: "",
        checkInTime: "",
        checkOutTime: "",
        id: "",
    });

    const handleUpload = (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        const url = `http://localhost:4000/id/upload`;
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
                setBanner(res.url);
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
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={`flex relative justify-center min-h-full flex-col gap-5`}>
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
                    }}>
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
                            afterLeave={() => setGenderQuery("")}>
                            <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 border text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredGenders?.length === 0 &&
                                genderQuery !== "" ? (
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
                                            value={gender}>
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
                        setHotel(
                            hotels?.find((hotel) => hotel.id === id)?.name || ""
                        );
                    }}>
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
                            afterLeave={() => setHotelQuery("")}>
                            <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 border text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredHotels?.length === 0 &&
                                hotelQuery !== "" ? (
                                    <div className="relative font-semibold md:text-base text-xs select-none py-2 px-4 text-gray-600">
                                        Hotel not found. Please{" "}
                                        <Link
                                            href="/contact"
                                            className="underline hover:text-gray-700 cursor-pointer">
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
                                            value={hotel.id}>
                                            {hotel.name}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>

                <Switch.Group>
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
                                        checked
                                            ? "bg-secondary-800"
                                            : "bg-gray-300"
                                    } relative inline-flex h-6 w-11 items-center rounded-full`}>
                                    <span className="sr-only">AC</span>
                                    <span
                                        className={`${
                                            checked
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                    />
                                </button>
                            )}
                        </Switch>
                        <Switch.Label className="ml-4">AC</Switch.Label>
                    </div>
                </Switch.Group>

                <div className="flex flex-row justify-between gap-3 flex-wrap">
                    <div className="w-full md:w-40">
                        <label
                            htmlFor="checkInTime"
                            className="mb-2 text-sm block">
                            From Date
                        </label>
                        <input
                            required
                            type="date"
                            id="checkInTime"
                            className="w-full mt-1 p-1 bg-inherit border-b border-gray-400"
                            onChange={(e) =>
                                setAccommodationInfo((prevValue) => {
                                    return {
                                        ...prevValue,
                                        checkInTime: e.target.value.toString(),
                                    };
                                })
                            }
                        />
                    </div>
                    <div className="w-full md:w-40">
                        <label
                            htmlFor="checkOutTime"
                            className="mb-2 text-sm block">
                            To Date
                        </label>
                        <input
                            required
                            type="date"
                            id="checkOutTime"
                            className="w-full mt-1 p-1 bg-inherit border-b border-gray-400"
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
                </div>

                <div>
                    <label className="block mb-2 text-sm text-white">
                        Upload ID
                    </label>
                    <input
                        type="file"
                        id="image"
                        className="file:mr-4 file:py-2.5 file:rounded-r-none file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:transition-colors file:cursor-pointer file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border w-full text-sm rounded-lg block  bg-gray-600 border-gray-600 placeholder-slate-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                        onChange={(e) => handleUpload(e.target.files![0])}
                    />
                </div>

                <Button
                    intent={"primary"}
                    type="submit"
                    className="my-4 flex justify-center">
                    <MdModeEditOutline />
                    Submit
                </Button>
            </form>
        </>
    );
};

export default CreateAccommodationRequest;

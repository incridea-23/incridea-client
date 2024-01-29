import { useMutation, useQuery } from "@apollo/client";
import {
  AddAccommodationRequestDocument,
  GetAllHotelsDocument,
} from "@/src/generated/generated";
import { useState } from "react";
import Button from "../../button";
import { MdModeEditOutline } from "react-icons/md";
import createToast from "../../toast";

export const CreateAccommodationRequest = () => {
  const [
    addAccommodation,
    { data, loading: emailVerificationLoading, error: emailVerificationError },
  ] = useMutation(AddAccommodationRequestDocument);

  const { data: allHotels } = useQuery(GetAllHotelsDocument);
  const [Uploading, setUploading] = useState(false);
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

  return (
    <>
      <h1>Create Accommodation Request</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addAccommodation({
            variables: AccommodationInfo,
          });
        }}
        className="grid grid-cols-2 p-10"
      >
        <label className="block mb-2 text-sm font-medium text-white">
          Select gender
        </label>
        <select
          required
          placeholder="Gender"
          onChange={(e) =>
            setAccommodationInfo((prevValue) => {
              return { ...prevValue, gender: e.target.value };
            })
          }
          className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
        >
          <option>MALE</option>
          <option>FEMALE</option>
          <option>OTHER</option>
        </select>

        <label className="block mb-2 text-sm font-medium text-white">
          Select Hotel
        </label>
        <select
          required
          placeholder="Hotel"
          onChange={(e) =>
            setAccommodationInfo((prevValue) => {
              return { ...prevValue, hotelId: parseInt(e.target.value) };
            })
          }
          className="border text-sm rounded-lg block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
        >
          {/*<option>Other</option> loop over hotels list and generate option*/}
          {allHotels?.getAllHotels.map((hotel, index) => {
            return (
              <option key={index} value={hotel.id}>
                {hotel.name}
              </option>
            );
          })}
        </select>

        <label className="block mb-2 text-sm font-medium text-white">
          CheckIn Time
        </label>
        <input
          required
          type="date"
          placeholder="CheckIn Time"
          className="w-full p-2 rounded-md bg-gray-800/70 text-gray-100"
          onChange={(e) =>
            setAccommodationInfo((prevValue) => {
              return { ...prevValue, checkInTime: e.target.value.toString() };
            })
          }
        />

        <label className="block mb-2 text-sm font-medium text-white">
          CheckOut Time
        </label>
        <input
          required
          type="date"
          className="w-full p-2 rounded-md bg-gray-800/70 text-gray-100"
          placeholder="CheckOut Time"
          onChange={(e) =>
            setAccommodationInfo((prevValue) => {
              return { ...prevValue, checkOutTime: e.target.value.toString() };
            })
          }
        />

        <label className="block mb-2 text-sm font-medium text-white">
          Upload ID
        </label>
        <input
          type="file"
          id="image"
          className="file:mr-4 file:py-2.5 file:rounded-r-none file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold file:transition-colors file:cursor-pointer
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 border w-full text-sm rounded-lg   block  bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
          placeholder="Banner..."
          onChange={(e) => handleUpload(e.target.files![0])}
        />
        <Button
          intent={"info"}
          className="flex gap-2 items-center justify-center"
          size={"medium"}
          type="submit"
        >
          <MdModeEditOutline />
          submit
        </Button>
      </form>
    </>
  );
};

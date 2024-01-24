import { useMutation, useQuery } from "@apollo/client";
import {
  AddAccommodationRequestDocument,
  AddAccommodationRequestMutation,
  GetAllHotelsDocument,
} from "@/src/generated/generated";
import { useState } from "react";
import Button from "../../button";
import { MdModeEditOutline } from "react-icons/md";

export const CreateAccommodationRequest = () => {
  const [
    addAccommodation,
    { data, loading: emailVerificationLoading, error: emailVerificationError },
  ] = useMutation(AddAccommodationRequestDocument);

  const { data: allHotels } = useQuery(GetAllHotelsDocument);
  const [AccommodationInfo, setAccommodationInfo] = useState({
    ac: false,
    hotelId: -1,
    gender: "",
    checkInTime: "",
    checkOutTime: "",
  });

  return (
    <>
      <h1>Create Accommodation Request</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addAccommodation({
            variables: AccommodationInfo,
          });
        }}
      >
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

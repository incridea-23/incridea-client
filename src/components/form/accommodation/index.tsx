import { useMutation, useQuery } from "@apollo/client";
import {
  AddAccommodationRequestDocument,
  AddAccommodationRequestMutation,
  GetAllHotelsDocument,
} from "@/src/generated/generated";
import { useState } from "react";

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
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select
          required
          placeholder="Hotel"
          onChange={(e) =>
            setAccommodationInfo((prevValue) => {
              return { ...prevValue, hotelId: parseInt(e.target.value) };
            })
          }
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
          type="datetime-local"
          placeholder="CheckIn Time"
          onChange={(e) =>
            setAccommodationInfo((prevValue) => {
              return { ...prevValue, checkInTime: e.target.value.toString() };
            })
          }
        />
        <input
          required
          type="datetime-local"
          placeholder="CheckOut Time"
          onChange={(e) =>
            setAccommodationInfo((prevValue) => {
              return { ...prevValue, checkOutTime: e.target.value.toString() };
            })
          }
        />
      </form>
    </>
  );
};

import { useMutation, useQuery } from "@apollo/client";
import { AddAccommodationRequestMutation, Ho } from "@/src/generated/generated";

export const CreateAccommodationRequest = () => {
  const [
    addAccommodation,
    { data, loading: emailVerificationLoading, error: emailVerificationError },
  ] = useMutation();
  return (
    <>
      <h1>Create Accommodation Request</h1>
      <form
        onSubmit={(e) => {
          addAccommodation({
            variables: {
				
			},
          });
        }}
      >
        <input required type="text" placeholder="Name" />
        <input type="number" placeholder="Phone" />

        <select required placeholder="Gender">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select required placeholder="Gender">
          {/*<option>Other</option> loop over hotels list and generate option*/}
        </select>

        <input required type="datetime-local" placeholder="CheckIn Time" />
        <input required type="datetime-local" placeholder="CheckOut Time" />
      </form>
    </>
  );
};

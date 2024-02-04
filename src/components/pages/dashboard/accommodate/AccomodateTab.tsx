import { FC } from "react";
import { useQuery } from "@apollo/client";
import { AccommodationRequestsDocument } from "@/src/generated/generated";
import Spinner from "@/src/components/spinner";
import AddAccommodateDetails from "./AddAccommodateDetails";
import ViewAccommodateDetails from "./ViewAccommodateDetails";
import HotelModal from "./HotelModal";

const AccommodateTab: FC = () => {
  const {
    data: accommodationRequests,
    loading: accommodateLoading,
    refetch: accommodatefetch,
  } = useQuery(AccommodationRequestsDocument, {});
  return (
    <>
      <div>
        {/* Admin Header */}

        <div className="flex gap-1 flex-col md:flex-row md:justify-center md:m-3 mt-6">
          <div className="mt-5 flex gap-1 md:gap-0.5 flex-col justify-between  basis-2/3">
            <div className="flex gap-3 items-center justify-between m-4">
              <h1 className="text-3xl">Accommodation Requests</h1>
              <div className="flex justify-center items-center">
                <HotelModal />
              </div>
            </div>
            <div className="hidden md:flex ml-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-8 items-center justify-between gap-8 text-lg font-bold h-20">
              <h1 className="basis-1/5 py-2.5 text-start">Name</h1>
              <h1 className="basis-1/5 py-2.5 text-center">Gender</h1>
              <h1 className="basis-1/5 py-2.5 text-center">CheckIn</h1>
              <h1 className="basis-1/5 py-2.5 text-center">CheckOut</h1>
              <h1 className="basis-1/5 py-2.5 text-center pr-2">Hotel</h1>
              <h1 className="basis-1/5 py-2.5 text-center ">Room No.</h1>
              <h1 className="basis-1/5 py-2.5 text-center pr-2">Status</h1>
              <h1 className="basis-1/5 py-2.5 text-center pr-5">Action</h1>
              <h1 className="basis-1/5 py-2.5 text-center pr-5">View</h1>
            </div>
            {accommodateLoading && (
              <div className="flex mt-10 justify-center items-center">
                <Spinner className="text-gray-300" />
              </div>
            )}

            <div className="md:max-h-80 max-h-80 md:h-[300px] overflow-y-auto text-center w-full">
              {accommodationRequests?.accommodationRequests?.__typename ==
              "QueryAccommodationRequestsSuccess" ? (
                accommodationRequests?.accommodationRequests?.data.map(
                  (acc, idx) => (
                    <div
                      key={acc?.id}
                      className={`bg-white/10 md:rounded-none rounded-lg md:p-4 ml-2 p-3 flex flex-col md:flex-row md:items-center items-start md:justify-center  mb-3 md:my-0`}
                    >
                      <h1 className="basis-1/6 flex justify-start py-0.5 text-start text-lg">
                        {acc?.user?.name}
                      </h1>
                      <h1 className="basis-1/6 flex justify-center py-0.5 text-start text-lg pr-2">
                        {acc?.gender}
                      </h1>
                      <h1 className="basis-1/6 flex justify-center py-0.5 text-center text-sm">
                        {acc?.checkIn
                          ? new Date(Date.parse(acc?.checkIn)).toLocaleString(
                              "en-IN",
                              {
                                timeZone: "Asia/Kolkata",
                              }
                            )
                          : "Not Available"}
                      </h1>
                      <h1 className="basis-1/6 flex justify-center py-0.5 text-center text-sm">
                        {acc?.checkIn
                          ? new Date(Date.parse(acc?.checkOut)).toLocaleString(
                              "en-IN",
                              {
                                timeZone: "Asia/Kolkata",
                              }
                            )
                          : "Not Available"}
                      </h1>
                      <h1 className="basis-1/6 flex justify-center py-0.5 text-center text-lg">
                        {acc?.hotel?.name}
                      </h1>
                      <h1 className="basis-1/6 flex justify-center py-0.5 text-center text-lg">
                        {acc?.room}
                      </h1>
                      <h1
                        className={`basis-1/6 py-0.5 text-center flex justify-center text-lg ${
                          acc?.status == "CONFIRMED"
                            ? "border-green-500 text-green-500"
                            : "border-red-500 text-red-500"
                        }`}
                      >
                        {acc?.status}
                      </h1>
                      <h1 className="basis-1/6 py-0.5 flex text-center justify-center bg-slate text-lg">
                        <AddAccommodateDetails accId={acc?.id} />
                      </h1>
                      <ViewAccommodateDetails accId={acc?.user?.id} />
                    </div>
                  )
                )
              ) : (
                <>
                  {accommodationRequests?.accommodationRequests?.__typename ==
                  "Error" ? (
                    <div className="flex justify-center items-center">
                      <h1 className="text-2xl text-gray-300">
                        No Accommodation Requests
                      </h1>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccommodateTab;

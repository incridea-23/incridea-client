import { useEffect, useState } from "react";
import {
  EventByOrganizerQuery,
  EventCategory,
  UpdateEventDocument,
} from "@/src/generated/generated";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EventType } from "@/src/generated/generated";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useMutation } from "@apollo/client";
import Modal from "@/src/components/modal";
import Button from "@/src/components/button";
import ToggleSwitch from "@/src/components/switch";
import createToast from "@/src/components/toast";
import { AiOutlineEdit } from "react-icons/ai";
const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);
export default function EditEventModal({
  event,
}: {
  event: EventByOrganizerQuery["eventByOrganizer"][0];
}) {
  const [maxTeams, setMaxTeams] = useState(event.maxTeams);
  const [name, setName] = useState(event.name);
  const [eventType, setEventType] = useState(event.eventType);
  const [maxTeamSize, setMaxTeamSize] = useState(event.maxTeamSize);
  const [minTeamSize, setMinTeamSize] = useState(event.minTeamSize);
  const [venue, setVenue] = useState(event.venue);
  const [fees, setFees] = useState(event.fees);
  const [banner, setBanner] = useState(event.image);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState(event.category);
  function handleCloseModal() {
    setShowModal(false);
  }

  const [editorState, setEditorState] = useState<any>(
    EditorState.createEmpty()
  );

  const [updateEvent, { data, loading, error }] = useMutation(
    UpdateEventDocument,
    {
      refetchQueries: ["EventByOrganizer"],
    }
  );

  const handleUpload = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/cloudinary/upload/${event.name}`;
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

  function saveHandler() {
    setShowModal(false);
    let promise = updateEvent({
      variables: {
        id: event.id,
        maxTeams,
        name,
        maxTeamSize,
        minTeamSize,
        venue,
        fees,
        eventType: eventType as EventType,
        image: banner,
        category: category as EventCategory,
        description: JSON.stringify(
          convertToRaw(editorState.getCurrentContent())
        ),
      },
    }).then((res) => {
      if (res.data?.updateEvent.__typename === "Error") {
        throw new Error(res.data.updateEvent.message);
      }
    });
    createToast(promise, "Updating event...");
  }

  useEffect(() => {
    const { description } = event;
    try {
      const editorState = JSON.parse(description as string) as any;
      setEditorState(
        EditorState.createWithContent(convertFromRaw(editorState))
      );
    } catch (error) {
      console.log(error);
    }
    // public-DraftStyleDefault-block
    const style = document.createElement("style");
    style.innerHTML = `.public-DraftStyleDefault-block {
      margin: 0;
    }`;

    document.head.appendChild(style);
  }, [event]);
  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        intent="secondary"
        disabled={event.published}
        className={
          event.published
            ? "opacity-50 pointer-events-none cursor-not-allowed"
            : ""
        }
      >
        <AiOutlineEdit />
        Edit
      </Button>
      <Modal
        title="Edit Event Details"
        size="medium"
        showModal={showModal}
        onClose={handleCloseModal}
      >
        <div className=" p-5 ">
          <div className="mt-2">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Event Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                placeholder="Event Name..."
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-white"
              >
                Event Description
              </label>
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="bg-gray-600 p-2 rounded-md text-white"
                toolbarClassName="bg-gray-600  text-black text-white"
              />
            </div>
            <div className="mb-6 flex flex-wrap gap-6 justify-between ">
              <div className="grow md:basis-1/4 basis-full">
                <label
                  htmlFor="Venue"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Venue
                </label>
                <input
                  type="text"
                  id="Venue"
                  required
                  onChange={(e) => setVenue(e.target.value)}
                  value={venue || ""}
                  className=" border w-full   text-sm rounded-lg   block p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                  placeholder="LC01"
                />
              </div>
              <div className="grow md:basis-1/4 basis-full">
                <label className="block mb-2 text-sm font-medium text-white">
                  Event Type
                </label>
                <select
                  id="eventType"
                  placeholder="Event Type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full  bg-gray-600 border border-gray-600 h-10 px-4 pr-16 rounded-lg text-sm focus:outline-none focus:ring-2 ring-gray-500"
                >
                  {Object.values(EventType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grow md:basis-1/4 basis-full">
                <label className="block mb-2 text-sm font-medium text-white">
                  Category
                </label>
                <select
                  id="category"
                  placeholder="Category"
                  value={category as string}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full  bg-gray-600 border border-gray-600 h-10 px-4 pr-16 rounded-lg text-sm focus:outline-none focus:ring-2 ring-gray-500"
                >
                  {Object.values(EventCategory).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-6 justify-between ">
              <div className="grow md:basis-1/3 basis-full">
                <label
                  htmlFor="fees"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Entry Fees
                </label>
                <input
                  type="number"
                  id="fees"
                  onChange={(e) => setFees(Number(e.target.value) || 0)}
                  className=" border w-full  text-sm rounded-lg   block  p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                  placeholder="Entry Fees..."
                  defaultValue={event.fees}
                />
              </div>
              {(eventType === EventType.Team ||
                eventType === EventType.TeamMultipleEntry) && (
                <div className="grow md:basis-1/3 basis-full">
                  <label className="block mb-2 text-sm font-medium text-white">
                    Team Size
                  </label>

                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      id="minTeamSize"
                      className=" border w-full  text-sm rounded-lg   block  p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                      placeholder="Min Team Size..."
                      value={minTeamSize}
                      onChange={(e) =>
                        setMinTeamSize(Number(e.target.value) || 0)
                      }
                      min={1}
                    />
                    <span className="text-white">to</span>

                    <input
                      type="number"
                      id="maxTeamSize"
                      className=" border w-full  text-sm rounded-lg   block  p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                      placeholder="Max Team Size..."
                      min={1}
                      value={maxTeamSize}
                      onChange={(e) =>
                        setMaxTeamSize(Number(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6 flex flex-wrap gap-6 justify-between ">
              <div className="grow md:basis-1/3 basis-full">
                <label className="block mb-2 text-sm font-medium text-white">
                  Banner
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
              </div>
              <div className="grow md:basis-1/3 basis-full">
                <div className="flex gap-2 mb-2 items-center">
                  <label className="block  text-sm font-medium text-white">
                    Teams Limit
                  </label>
                  <ToggleSwitch
                    checked={maxTeams !== null}
                    onChange={(checked) => {
                      if (checked) {
                        setMaxTeams(60);
                      } else {
                        setMaxTeams(null);
                      }
                    }}
                  />
                </div>

                {maxTeams !== null ? (
                  <input
                    type="number"
                    id="maxTeams"
                    className=" border w-full  text-sm rounded-lg  block  p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                    placeholder="Max Teams..."
                    min={1}
                    value={maxTeams}
                    disabled={maxTeams === null}
                    onChange={(e) => {
                      setMaxTeams(parseInt(e.target.value));
                    }}
                  />
                ) : (
                  <div className="opacity-50 border  text-sm rounded-lg   block  p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500">
                    No Limit
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end gap-2">
            <Button
              type="submit"
              intent={"success"}
              onClick={saveHandler}
              disabled={loading || uploading}
              className="rounded-lg"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

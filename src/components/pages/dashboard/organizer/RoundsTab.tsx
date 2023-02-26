import { EventByOrganizerQuery } from "@/src/generated/generated";
import { Tab } from "@headlessui/react";

function RoundsTab({
  rounds,
}: {
  rounds: EventByOrganizerQuery["eventByOrganizer"][0]["rounds"];
}) {
  return (
    <div className="flex flex-col  h-full  md:flex-row gap-5">
      <Tab.Group>
        <Tab.List className=" flex md:flex-col backdrop-blur-md rounded-2xl border p-3 w-full max-w-xs  border-gray-600 bg-gray-900/30">
          <Tab className="focus:outline-none">Tab 1</Tab>
          <Tab className="focus:outline-none">Tab 2</Tab>
          <Tab className="focus:outline-none">Tab 3</Tab>
        </Tab.List>
        <Tab.Panels className="backdrop-blur-md h-fit max-h-[70vh] overflow-y-auto rounded-2xl border p-3 w-full border-gray-600 bg-gray-900/30">
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default RoundsTab;

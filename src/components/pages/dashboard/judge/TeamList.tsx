import SearchBox from "@/src/components/searchbox";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {};

const TeamList = (props: Props) => {
  const [query, setQuery] = React.useState("");

  const [teams, setTeams] = React.useState([
    {
      name: "Team 1",
      pid: "PID 1",
    },
    {
      name: "Team 2",
      pid: "PID 2",
    },
    {
      name: "Team 3",
      pid: "PID 3",
    },
    {
      name: "Team 4",
      pid: "PID 4",
    },
    {
      name: "Team 1",
      pid: "PID 1",
    },
    {
      name: "Team 2",
      pid: "PID 2",
    },
    {
      name: "Team 3",
      pid: "PID 3",
    },
    {
      name: "Team 4",
      pid: "PID 4",
    },
    {
      name: "Team 1",
      pid: "PID 1",
    },
    {
      name: "Team 2",
      pid: "PID 2",
    },
    {
      name: "Team 3",
      pid: "PID 3",
    },
    {
      name: "Team 4",
      pid: "PID 4",
    },
    {
      name: "Team 1",
      pid: "PID 1",
    },
    {
      name: "Team 2",
      pid: "PID 2",
    },
    {
      name: "Team 3",
      pid: "PID 3",
    },
    {
      name: "Team 4",
      pid: "PID 4",
    },
    {
      name: "Team 1",
      pid: "PID 1",
    },
    {
      name: "Team 2",
      pid: "PID 2",
    },
    {
      name: "Team 3",
      pid: "PID 3",
    },
    {
      name: "Team 4",
      pid: "PID 4",
    },
  ]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 shadow-sm mb-1 rounded-t-lg top-0 sticky bg-[#35436F]">
        <div className=" relative">
          <input
            type={"text"}
            placeholder="Search by name or PID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`bg-white/20 w-full  h-10 px-4 pr-16 rounded-lg text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 ring-white/40`}
          />
          <AiOutlineSearch
            size={"1.4rem"}
            className="absolute right-3 top-2.5 text-white/60"
          />
        </div>
      </div>

      <div className="flex px-3 pb-3 flex-col gap-2">
        {teams.map((team) => (
          <div
            key={team.pid}
            className="flex items-center justify-between p-2 bg-white/20 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-full"></div>
              <div className="flex flex-col">
                <div className="text-white/80">{team.name}</div>
                <div className="text-white/60">{team.pid}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white/60">View</div>
              <div className="text-white/60">Edit</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;

import Button from "@/src/components/button";
import React from "react";
import { BiTrashAlt } from "react-icons/bi";

type Props = {};

const Criterias = (props: Props) => {
  const [criterias, setCriterias] = React.useState([
    {
      name: "Criteria 1",
      score: 0,
    },
    {
      name: "Criteria 2",
      score: 0,
    },
    {
      name: "Criteria 3",
      score: 0,
    },
  ]);

  const addCriteria = () => {
    const newCriterias = [...criterias];
    newCriterias.push({
      name: `Criteria ${criterias.length + 1}`,
      score: 0,
    });
    setCriterias(newCriterias);
  };

  const deleteCriteria = (index: number) => {
    const newCriterias = [...criterias];
    newCriterias.splice(index, 1);
    setCriterias(newCriterias);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 shadow-sm flex items-end justify-between py-3 mb-2 rounded-t-lg bg-[#35436F] sticky top-0">
        <h1 className="text-2xl font-semibold">Criterias</h1>
        <Button className="ml-auto" onClick={addCriteria}>
          Add Criteria
        </Button>
      </div>
      <div className="px-3 pb-3 flex flex-wrap justify-start gap-4 text-white">
        {criterias.map((criteria, index) => (
          <div
            key={index}
            className="flex grow gap-3 p-4 rounded-md bg-white/10 flex-col w-fit items-center justify-between mb-2">
            <div className="flex gap-1.5 items-center">
              <p className="text-white/90 font-semibold">{criteria.name}</p>
              <Button
                onClick={deleteCriteria.bind(null, index)}
                title="Delete Criteria"
                intent={"ghost"}
                className="hover:bg-red-600/30  px-1"
                size={"small"}>
                <BiTrashAlt size={"1rem"} />
              </Button>
            </div>
            <div className="flex items-center text-lg gap-2">
              <button
                className="w-6 h-6 leading-5 bg-white/10 rounded-full"
                onClick={() => {
                  const newCriterias = [...criterias];
                  newCriterias[index].score -= 1;
                  setCriterias(newCriterias);
                }}>
                -
              </button>
              <input
                type="number"
                value={criteria.score}
                onChange={(e) => {
                  const newCriterias = [...criterias];
                  newCriterias[index].score = parseInt(e.target.value);
                  setCriterias(newCriterias);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    const newCriterias = [...criterias];
                    newCriterias[index].score = 0;
                    setCriterias(newCriterias);
                  }
                }}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
					 				w-16 bg-white/10 min-h-[24px] rounded-lg text-center text-white/90 focus:ring-2 ring-white/50 outline-none"
                //first few classes to hide default input type=number buttons
              />
              <button
                className="w-6 h-6 leading-5 bg-white/10 rounded-full"
                onClick={() => {
                  const newCriterias = [...criterias];
                  newCriterias[index].score += 1;
                  setCriterias(newCriterias);
                }}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 pt-0">
        <textarea
          rows={4}
          className="mb-3 px-3 py-2 w-full bg-white/10 placeholder:text-white/60 rounded-md resize-none"
          placeholder="Additional remarks (optional)"
        />
      </div>
    </div>
  );
};

export default Criterias;

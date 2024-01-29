import { Switch } from "@headlessui/react";
import React from "react";

type Props = {
	checked: boolean;
	onChange: (checked: boolean) => void;
};

const ToggleSwitch = ({checked, onChange}: Props) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? "bg-blue-600" : "bg-gray-400"
      } -mt-1 relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};

export default ToggleSwitch;

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";

import List from "./List";

type ResultsProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Results = ({ setIsOpen }: ResultsProps) => {
  const [query, setQuery] = useState("");

  return (
    <>
      <header className="flex p-4">
        <form className="flex flex-auto">
          <label>
            <MagnifyingGlassIcon className="mr-3 h-6 w-6 text-gray-700 dark:text-white" />
          </label>
          <input
            className="w-full bg-inherit outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes"
            autoComplete="off"
          />
        </form>
        <button
          className="hover:text-gray-70 text-gray-400 dark:hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </header>
      <List query={query} setIsOpen={setIsOpen} />
      <footer className="py-6 text-center text-sm text-gray-400"></footer>
    </>
  );
};

export default Results;

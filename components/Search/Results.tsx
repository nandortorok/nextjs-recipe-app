import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";

import RecipeList from "./RecipeList";

type ResultsProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Results = ({ setIsOpen }: ResultsProps) => {
  const [query, setQuery] = useState("");

  return (
    <>
      <header className="flex p-4">
        <form className="flex flex-auto">
          <label htmlFor="searchInput">
            <MagnifyingGlassIcon className="mr-3 h-6 w-6 text-slate-700" />
          </label>
          <input
            className="w-full outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes"
            autoComplete="off"
          />
        </form>
        <button
          className="text-slate-400 hover:text-slate-700"
          onClick={() => setIsOpen(false)}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </header>
      <main className="overflow-auto">
        <RecipeList setIsOpen={setIsOpen} query={query} />
      </main>

      <footer className="py-6 text-center text-sm text-gray-400"></footer>
    </>
  );
};

export default Results;

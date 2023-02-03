import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import Modal from "./Modal";
import Results from "./Results";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="absolute inset-x-0 mx-auto w-3/5 max-sm:right-10 sm:w-1/2 md:w-1/3">
      <button
        className="flex w-full items-center rounded-3xl px-4 py-2 font-normal text-gray-500 transition ease-in-out hover:text-gray-600 dark:hover:bg-zinc-900/75 dark:hover:text-gray-200 md:bg-gray-100 md:text-gray-400 md:hover:bg-gray-400/20 dark:md:bg-zinc-900 dark:max-sm:text-gray-100"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
        Find a recipe
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Results setIsOpen={setIsOpen} />
      </Modal>
    </section>
  );
};

export default Search;

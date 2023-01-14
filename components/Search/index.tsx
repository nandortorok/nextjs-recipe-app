import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import Modal from "./Modal";
import Results from "./Results";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="w-1/3 max-sm:w-10/12">
      <button
        className="flex w-full items-center rounded-3xl px-4 py-2 text-gray-600 transition ease-in-out hover:text-gray-600 md:bg-gray-50 md:text-gray-400 md:hover:bg-gray-400/20"
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

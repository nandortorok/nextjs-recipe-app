import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import Modal from "./Modal";
import Results from "./Results";

export const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex grow rounded-2xl items-center bg-gray-400/20 px-4 py-2 text-gray-500 transition ease-in-out hover:text-black hover:bg-gray-500/20"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
        Find a recipe
        <div className="grow lg:px-40 md:px-28 sm:px-12"></div>
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Results setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="visible sm:invisible">
      <button
        className="sticky top-0 flex w-full items-center rounded-full bg-gray-400/20 p-4 text-gray-500 transition ease-in-out hover:text-black"
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

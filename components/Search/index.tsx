import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import Modal from "./Modal";
import Results from "./Results";
import useScrollPosition from "hooks/useScrollPosition";

export const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex grow items-center rounded-3xl bg-gray-200/50 px-4 py-2 text-gray-400 transition ease-in-out hover:bg-gray-400/20 hover:text-gray-600"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
        Find a recipe
        <div className="grow sm:px-12 md:px-28 lg:px-40"></div>
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Results setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPosition = useScrollPosition();

  return (
    <>
      <button
        className={
          scrollPosition > 20
            ? "visible sticky top-0 z-20 mx-auto flex w-4/5 items-center py-4 text-gray-500 transition-all ease-in hover:text-black sm:invisible"
            : "visible sticky top-0 flex w-full items-center rounded-3xl bg-white p-4 text-gray-500 transition-all ease-in hover:text-black sm:invisible"
        }
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
        Find a recipe
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Results setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};

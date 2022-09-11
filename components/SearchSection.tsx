import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "./Modal";

const SearchSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative flex h-72 justify-center bg-gray-300 md:h-96">
      <Image
        src={"/searchSectionimage-01.jpg"}
        className="object-scale-down"
        layout={"fill"}
        objectFit={"cover"}
      />

      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <button
          className="flex h-14 w-[90vw] items-center bg-white/75 pl-2 text-lg text-zinc-500 hover:text-black md:w-80 lg:w-[32rem]"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MagnifyingGlassIcon className="mr-3 h-8 w-8" />
          Find a recipe
        </button>
      </div>

      <Modal
        children={<Results setIsOpen={setIsOpen} />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </section>
  );
};

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Results = ({ setIsOpen }: Props) => {
  return (
    <>
      <header className="flex p-4">
        <form className="flex flex-auto">
          <label htmlFor="searchInput">
            <MagnifyingGlassIcon className="mr-3 h-6 w-6 text-slate-700" />
          </label>
          <input
            className="w-full outline-none"
            id="searchInput"
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
        <h1 className="border-b p-4 text-lg font-bold">Recipes</h1>
        <ul className="divide-y">
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
          <li className="p-4 hover:bg-slate-100">Test</li>
        </ul>
      </main>

      <footer className="p-4 text-sm text-zinc-500">
        Created by Nándor Török
      </footer>
    </>
  );
};

export default SearchSection;

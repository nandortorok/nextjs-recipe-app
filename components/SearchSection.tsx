import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  Fragment,
  useState,
} from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";

// TODO better type def
type SearchSectionProps = {
  searchTerm: string;
  onSearchTerm: ChangeEventHandler;
  recipes: any;
};

const SearchSection = ({
  searchTerm,
  onSearchTerm,
  recipes,
}: SearchSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative h-72 bg-gray-300 md:h-96">
      <Image
        alt="image"
        src={"/searchSectionimage-01.jpg"}
        className="object-cover"
        fill={true}
      />
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <button
          className="flex h-14 w-[90vw] items-center rounded-md bg-white/75 pl-4 text-lg text-zinc-500 transition ease-in-out hover:text-black md:w-80 lg:w-[32rem]"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
          Find a recipe
        </button>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Results
          value={searchTerm}
          onChange={onSearchTerm}
          setIsOpen={setIsOpen}
          list={recipes}
        />
      </Modal>
    </section>
  );
};

// TODO clear redundant types
type ResultsProps = {
  value: string;
  onChange: ChangeEventHandler;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  list: any;
};

const Results = ({
  value: searchTerm,
  onChange: onSearchTerm,
  setIsOpen,
  list,
}: ResultsProps) => {
  return (
    <>
      <header className="flex p-4">
        <form className="flex flex-auto">
          <label htmlFor="searchInput">
            <MagnifyingGlassIcon className="mr-3 h-6 w-6 text-slate-700" />
          </label>
          <input
            className="w-full outline-none"
            value={searchTerm}
            onChange={onSearchTerm}
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
        {/* TODO better empty array handling */}
        {list != "" ? (
          <>
            <h3 className="border-b p-4 font-bold">Recipes</h3>
            <ul className="divide-y">
              {/* TODO give proper type */}
              {list.map((item: any) => (
                <li key={item.id} className="p-4 hover:bg-slate-100">
                  <Link href={`recipe/${item.id}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul className="divide-y">
            <li className="hover:bg-slate-10 p-4 text-center text-gray-400">
              No recipes found
            </li>
          </ul>
        )}
      </main>

      <footer className="p-4 text-sm text-zinc-500">
        Created by Nándor Török
      </footer>
    </>
  );
};

type Props = {
  children: JSX.Element;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex h-full min-h-0 flex-col p-4 md:py-[12vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/[.2] transition-opacity" />
        </Transition.Child>
        {/* Scale isnt working */}
        <Transition.Child
          as={Fragment}
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="relative z-50 mx-auto flex min-h-0 w-full max-w-[95vw] flex-col divide-y rounded-md bg-white shadow-xl transition-opacity md:max-w-3xl">
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default SearchSection;

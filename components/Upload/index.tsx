import { XMarkIcon } from "@heroicons/react/24/solid";
import { Transition, Dialog } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useContext } from "react";

import { UploadContext } from "lib/contexts";
import Form from "./Form";

type MainProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Main = ({ setIsOpen }: MainProps) => {
  const { page, setPage } = useContext(UploadContext);

  const handleDecrement = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleIncrement = () => {
    if (page < 4) {
      setPage(page + 1);
    }
  };

  return (
    <main className="absolute flex h-full w-full flex-col overflow-auto">
      <button
        className="absolute top-0 right-0 p-4 text-slate-400 hover:text-slate-700"
        onClick={() => setIsOpen(false)}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

      <form className="space-y-5 px-5 pb-10 transition-opacity sm:px-10">
        <h1 className="pt-5 text-center font-bold">Upload a recipe</h1>

        <Form value={page} />
      </form>
      <section className="mt-auto flex justify-between p-10 px-5">
        {
          <button
            className="rounded-md bg-white py-2 px-5 text-blue-500 transition ease-in-out hover:bg-blue-50 active:ring disabled:invisible"
            type="button"
            disabled={page > 1 ? false : true}
            onClick={handleDecrement}
          >
            Back
          </button>
        }

        <button
          className="rounded-md bg-blue-500 py-2 px-5 text-white transition ease-in-out hover:bg-blue-600 active:ring"
          type="button"
          onClick={handleIncrement}
        >
          {page == 4 ? "Submit" : "Next"}
        </button>
      </section>
    </main>
  );
};

type UploadProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Upload = ({ isOpen, setIsOpen }: UploadProps) => {
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
          <Dialog.Overlay className="tranqw2sition-opacity fixed inset-0 bg-black/[.2]" />
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
          <Dialog.Panel className="relative z-50 mx-auto min-h-full w-full max-w-[95vw] rounded-md bg-white shadow-xl transition-opacity md:max-w-2xl">
            <Main setIsOpen={setIsOpen} />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Upload;

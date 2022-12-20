import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";

import GitHubLogo from "../public/github-mark-white.svg";

type LoginProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setIsOpen }: LoginProps) => {
  const { data: session } = useSession();

  return (
    <main>
      <button
        className="absolute top-0 right-0 p-4 text-slate-400 hover:text-slate-700"
        onClick={() => setIsOpen(false)}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

      <form className="flex flex-col items-center space-y-5 p-10">
        <h1 className="py-2 text-black">Log In</h1>

        <input
          type="text"
          className="w-full rounded-md border-gray-300 p-4 text-sm transition ease-in-out focus:border-opacity-0"
          placeholder="Email"
          disabled={true}
        />
        <input
          type="text"
          className="w-full rounded-md border-gray-300 p-4 text-sm transition ease-in-out focus:border-opacity-0"
          placeholder="Password"
          disabled={true}
        />

        <section className="flex w-full flex-row justify-between">
          <button
            className="relative rounded-md bg-white py-2 px-5 text-blue-500 transition ease-in-out hover:bg-blue-50 active:ring"
            type="button"
            disabled={true}
          >
            Sign up
          </button>

          <button
            className="rounded-md  bg-blue-500 py-2 px-5 text-white transition ease-in-out hover:bg-blue-600 active:ring"
            type="button"
            disabled={true}
          >
            Log in
          </button>
        </section>

        <section className="w-full border-t pt-10">
          {session ? (
            <button
              className="w-full rounded-xl bg-black p-4 text-white transition ease-in-out"
              type="button"
              onClick={() => signOut()}
            >
              <div className="flex justify-center">
                <p className="px-6">Log out</p>
              </div>
            </button>
          ) : (
            <button
              className="w-full rounded-xl bg-black p-4 text-white transition ease-in-out"
              type="button"
              onClick={() => signIn()}
            >
              <div className="flex justify-center">
                <Image src={GitHubLogo} alt="GitHub" className="h-6 w-6" />
                <p className="px-6">Log in with GitHub</p>
              </div>
            </button>
          )}
        </section>
      </form>
    </main>
  );
};

type LoginFormProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const LoginForm = ({ isOpen, setIsOpen }: LoginFormProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex h-full flex-col p-4 lg:py-[20vh]"
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
          <Dialog.Panel className="relative z-50 mx-auto w-full overflow-auto rounded-xl bg-white shadow-xl transition-opacity lg:w-1/2 xl:max-w-md">
            <Login setIsOpen={setIsOpen} />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default LoginForm;

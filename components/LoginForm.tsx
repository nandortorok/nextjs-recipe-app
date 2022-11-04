import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";

type LoginProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setIsOpen }: LoginProps) => {
  return (
    <main>
      <button
        className="absolute top-0 right-0 p-4 text-slate-400 hover:text-slate-700"
        onClick={() => setIsOpen(false)}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

      <form className="flex flex-col items-center space-y-5 p-10">
        <h1 className="py-2">Login</h1>

        <input
          type="text"
          className="block w-full rounded-md border-gray-300 p-4 text-sm transition ease-in-out focus:border-opacity-0"
          placeholder="Email"
        />
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 p-4 text-sm transition ease-in-out focus:border-opacity-0"
          placeholder="Password"
        />

        <section className="flex w-full flex-row justify-between">
          <button
            className="relative rounded-md bg-white py-2 px-5 text-blue-500 transition ease-in-out hover:ring-1 active:ring"
            type="button"
          >
            Create account
          </button>

          <button
            className="rounded-md  bg-blue-500 py-2 px-5 text-white transition ease-in-out hover:bg-blue-600 active:ring"
            type="button"
          >
            Login
          </button>
        </section>
      </form>
    </main>
  );
};

// const Login = ({ setIsOpen }: LoginProps) => {
//   return (
//     <main className="flex flex-col items-center gap-2 p-10">
//       <button
//         className="self-end p-4 text-slate-400 hover:text-slate-700"
//         onClick={() => setIsOpen(false)}
//       >
//         <XMarkIcon className="h-6 w-6" />
//       </button>

//       <form className="flex flex-col items-center gap-2 pb-8">
//         <h1 className="pb-8 text-2xl">Sign in</h1>

//         <input
//           className="rounded-md"
//           type="text"
//           placeholder="Email or phone"
//         />
//         <input className="rounded-md" type="password" placeholder="Password" />
//         <section className="w-full pt-24">
//           <button
//             className="w-full rounded-md bg-blue-500 p-2 font-bold text-white"
//             type="button"
//           >
//             Login
//           </button>

//           <p className="p-4 text-center font-bold text-zinc-400">OR</p>

//           <button
//             className="w-full rounded-md bg-blue-500 p-2 text-white"
//             type="button"
//           >
//             Create account
//           </button>
//         </section>
//       </form>
//     </main>
//   );
// };

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const LoginForm = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex h-[100vh] min-h-0 flex-col p-4 md:py-[20vh]"
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
          <Dialog.Panel className="relative z-50 mx-auto flex min-h-0 w-full max-w-[95vw] flex-col divide-y rounded-md bg-white shadow-xl transition-opacity md:w-1/4 md:max-w-3xl">
            <Login setIsOpen={setIsOpen} />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default LoginForm;

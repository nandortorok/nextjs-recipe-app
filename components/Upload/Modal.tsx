import { Dispatch, SetStateAction, Fragment } from "react";

import { Transition, Dialog } from "@headlessui/react";

type ModalProps = {
  value: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
};

const Modal = ({ value, onClose, children }: ModalProps) => {
  return (
    <Transition.Root show={value} as={Fragment}>
      <Dialog
        onClose={onClose}
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
          <Dialog.Overlay className="fixed inset-0 bg-black/[.2]" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="relative z-50 mx-auto min-h-full w-full max-w-[95vw] rounded-xl bg-white shadow-xl transition-opacity dark:bg-zinc-800 md:max-w-2xl">
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

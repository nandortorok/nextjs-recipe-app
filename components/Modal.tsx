import { Dialog, Transition } from "@headlessui/react";
import { Fragment, SetStateAction, Dispatch, FC } from "react";

type Props = {
    children: JSX.Element,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
    <Dialog
      onClose={setIsOpen}
      className="fixed flex flex-col inset-0 min-h-0 z-[200] h-[100vh] p-4 md:py-[12vh]"
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
        <Dialog.Panel className="w-[100%] flex flex-col min-h-0 relative z-50 mx-auto max-w-[95vw] divide-y rounded-lg bg-white shadow-2xl md:max-w-3xl transition-opacity">
            {children}
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  </Transition.Root>
  )
}
export default Modal
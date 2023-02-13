import { Fragment, ReactNode } from "react";

import { Menu, Transition } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

type UserMenuProps = {
  children: ReactNode;
};

const UserMenu = ({ children }: UserMenuProps) => {
  return (
    <Menu>
      <Menu.Button className="z-50">{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-12 w-40 origin-top-right rounded-md bg-gray-50 py-1 shadow-md dark:bg-zinc-700 md:top-14">
          <Menu.Item>
            <button
              className="flex w-full cursor-pointer space-x-4 self-start py-2 px-2 transition ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-100/10"
              onClick={() => signOut()}
            >
              <ArrowRightIcon className="h-6 w-6" />
              <p>Sign Out</p>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default UserMenu;

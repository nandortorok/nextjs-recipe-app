import { MouseEventHandler, ReactNode } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

type ElementProps = {
  href: string;
  onClick: MouseEventHandler;
  children: ReactNode;
};

export const NavButton = ({
  onClick,
  children,
}: Omit<ElementProps, "href">) => {
  return (
    <div className="group flex">
      <span className="rounded-r-xl border-r-4 border-transparent transition ease-in-out group-hover:border-blue-500"></span>
      <button
        className="ml-1 flex w-10/12 cursor-pointer space-x-4 self-start rounded-xl py-3 px-3 transition ease-in-out hover:bg-blue-400/25 hover:backdrop-blur-sm active:text-blue-700 group-hover:text-blue-600 dark:text-gray-400 dark:active:bg-blue-200/10 dark:group-hover:text-white md:ml-4 md:px-4"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export const NavLink = ({ href, children }: Omit<ElementProps, "onClick">) => {
  const router = useRouter();

  if (router.route === href)
    return (
      <div className="group flex">
        <span className="rounded-r-xl border-r-4 border-blue-500 transition ease-in-out group-hover:border-blue-600"></span>
        <Link
          className="ml-1 flex w-10/12 cursor-pointer space-x-4 self-start rounded-xl bg-blue-400/25 py-3 px-3 text-blue-700 transition ease-in-out hover:bg-blue-500/25 hover:backdrop-blur-sm group-hover:text-blue-600 dark:text-white dark:active:bg-blue-200/10 md:ml-4 md:px-4"
          href={href}
          passHref
        >
          {children}
        </Link>
      </div>
    );

  return (
    <div className="group flex">
      <span className="rounded-r-xl border-r-4 border-transparent transition ease-in-out group-hover:border-blue-500"></span>
      <Link
        className="ml-1 flex w-10/12 cursor-pointer space-x-4 self-start rounded-xl py-3 px-3 transition ease-in-out hover:bg-blue-400/25 hover:backdrop-blur-sm active:bg-blue-200 active:text-blue-700 group-hover:text-blue-600 dark:text-gray-400 dark:active:bg-blue-200/10 dark:group-hover:text-white md:ml-4 md:px-4"
        href={href}
        passHref
      >
        {children}
      </Link>
    </div>
  );
};

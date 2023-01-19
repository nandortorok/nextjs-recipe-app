import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

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
        className="flex w-10/12 cursor-pointer space-x-4 self-start rounded-xl py-3 px-4 transition ease-in-out hover:bg-blue-400/25 hover:backdrop-blur-sm active:bg-blue-200 active:text-blue-700 group-hover:text-blue-600 md:ml-4"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export const NavLink = ({ href, children }: Omit<ElementProps, "onClick">) => {
  return (
    <div className="group flex">
      <span className="rounded-r-xl border-r-4 border-transparent transition ease-in-out group-hover:border-blue-500"></span>
      <Link
        className="flex w-10/12 cursor-pointer space-x-4 self-start rounded-xl py-3 px-4 transition ease-in-out hover:bg-blue-400/25 hover:backdrop-blur-sm active:bg-blue-200 active:text-blue-700 group-hover:text-blue-600 md:ml-4"
        href={href}
        passHref
      >
        {children}
      </Link>
    </div>
  );
};

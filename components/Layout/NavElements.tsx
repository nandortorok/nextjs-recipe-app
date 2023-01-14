import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  onClick: MouseEventHandler;
  children: ReactNode;
};

export const NavButton = ({ onClick, children }: ButtonProps) => {
  return (
    <div className="group flex">
      <span className="rounded-r-xl border-r-4 border-transparent transition ease-in-out group-hover:border-blue-500"></span>
      <button
        className="flex w-10/12 cursor-pointer space-x-4 self-start rounded-xl py-3 px-4 transition ease-in-out hover:bg-blue-100 active:bg-blue-200 active:text-blue-700 group-hover:text-blue-500 md:ml-4"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
type LinkProps = {
  href: string;
  children: ReactNode;
};

export const NavLink = ({ href, children }: LinkProps) => {
  return (
    <div className="group flex">
      <span className="rounded-r-xl border-r-4 border-transparent transition ease-in-out group-hover:border-blue-500"></span>
      <Link
        className="flex w-10/12 cursor-pointer space-x-4 self-start rounded-xl py-3 px-4 transition ease-in-out hover:bg-blue-100 active:bg-blue-200 active:text-blue-700 group-hover:text-blue-500 md:ml-4"
        href={href}
        passHref
      >
        {children}
      </Link>
    </div>
  );
};

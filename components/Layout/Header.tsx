import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, MouseEventHandler, ReactNode, useEffect } from "react";
import {
  UserIcon,
  ArrowLeftCircleIcon,
  BookmarkSquareIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  Bars3Icon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";

import LoginForm from "components/LoginForm";
import Upload from "components/Upload";
import Image from "next/image";

const links = [
  {
    icon: <BookmarkSquareIcon className="h-6 w-6" />,
    href: "/libary",
    name: "Saved recipes",
  },
  {
    icon: <DocumentTextIcon className="h-6 w-6" />,
    href: "/reviews",
    name: "Reviews",
  },
  {
    icon: <RectangleStackIcon className="h-6 w-6" />,
    href: "/user/recipes",
    name: "My recipes",
  },
];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const { data: session } = useSession();

  // Reset navbar on route change
  const dynamicRoute = useRouter().asPath;
  useEffect(() => setIsNavOpen(false), [dynamicRoute]);
  useEffect(() => setIsLoginOpen(false), [dynamicRoute]);
  useEffect(() => setIsUploadOpen(false), [dynamicRoute]);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 mx-auto border-b bg-white py-1 font-bold shadow-sm">
        <div className="flex items-center justify-start gap-2 px-5 md:justify-between">
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            <Bars3Icon className="h-6 w-6 cursor-pointer hover:text-blue-500" />
          </button>

          <Link href={"/"} passHref>
            <p className="mx-auto cursor-pointer py-3 text-lg text-black">
              Recipe App
            </p>
          </Link>

          <div className="group flex-nowrap rounded-full transition ease-in-out hover:bg-blue-100 active:bg-blue-200 active:text-blue-700">
            {session ? (
              <Link href="/login" passHref>
                <Image
                  src={session.user!.image!}
                  alt={session.user!.name!}
                  className="rounded-full border hover:scale-110 hover:bg-blue-100"
                  width={24}
                  height={24}
                />
              </Link>
            ) : (
              <button
                className="invisible p-2 align-middle md:visible"
                onClick={() => setIsLoginOpen(!isLoginOpen)}
              >
                <UserIcon className="h-6 w-6 cursor-pointer group-hover:text-blue-500" />
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginForm isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      <Upload isOpen={isUploadOpen} setIsOpen={setIsUploadOpen} />

      {/* Sidebar menu */}
      <nav
        className={
          isNavOpen
            ? "fixed top-0 z-20 h-full w-60 translate-x-0 overflow-auto border-r bg-white transition-transform duration-300 ease-in motion-reduce:transition-none"
            : "fixed top-0 z-20 h-full w-60 -translate-x-full overflow-auto border-r bg-white transition-transform duration-300 ease-in motion-reduce:transition-none"
        }
      >
        <button
          onClick={() => setIsNavOpen(false)}
          className="flex w-full items-center py-4 px-5"
        >
          <Bars3Icon className="h-6 w-6 cursor-pointer hover:text-blue-500" />
          <p className="visible px-2 text-lg font-bold md:invisible md:text-sm">
            Recipe App
          </p>
        </button>

        <section className="flex flex-col space-y-3 pt-3">
          <span className="md:hidden">
            {session ? (
              <NavLink href="/login">
                <Image
                  src={session.user!.image!}
                  alt={session.user!.name!}
                  width={24}
                  height={24}
                />
                <p>{session.user!.name!}</p>
              </NavLink>
            ) : (
              <NavButton onClick={() => setIsLoginOpen(!isLoginOpen)}>
                <ArrowLeftCircleIcon className="h-6 w-6" />
                <p>Login</p>
              </NavButton>
            )}
          </span>
          <NavButton onClick={() => setIsUploadOpen(!isUploadOpen)}>
            <ArrowUpOnSquareIcon className="h-6 w-6" />
            <p>Upload</p>
          </NavButton>
          {links.map(({ icon, href, name }, index) => (
            <NavLink key={index} href={href}>
              {icon}
              <p>{name}</p>
            </NavLink>
          ))}
        </section>
      </nav>
    </>
  );
};

type ButtonProps = {
  onClick: MouseEventHandler;
  children: ReactNode;
};

const NavButton = ({ onClick, children }: ButtonProps) => {
  return (
    <div className="group flex">
      <span className="rounded-r-xl border-r-4 border-white transition ease-in-out group-hover:border-blue-500"></span>
      <button
        className="ml-4 flex w-10/12 cursor-pointer space-x-4 self-start rounded-xl py-3 px-4 transition ease-in-out hover:bg-blue-100 active:bg-blue-200 active:text-blue-700 group-hover:text-blue-500"
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

const NavLink = ({ href, children }: LinkProps) => {
  return (
    <div className="group flex">
      <span className="rounded-r-xl border-r-4 border-white transition ease-in-out group-hover:border-blue-500"></span>
      <Link
        className="ml-4 flex w-10/12 cursor-pointer space-x-4 self-start rounded-xl py-3 px-4 transition ease-in-out hover:bg-blue-100 active:bg-blue-200 active:text-blue-700 group-hover:text-blue-500"
        href={href}
        passHref
      >
        {children}
      </Link>
    </div>
  );
};

export default Header;

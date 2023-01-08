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
import { HeaderSearch } from "components/Search";
import useScrollPosition from "hooks/useScrollPosition";

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
  const { data: session } = useSession();
  const scrollPosition = useScrollPosition();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const dynamicRoute = useRouter().asPath;
  useEffect(() => setIsNavOpen(false), [dynamicRoute]);
  useEffect(() => setIsLoginOpen(false), [dynamicRoute]);
  useEffect(() => setIsUploadOpen(false), [dynamicRoute]);

  return (
    <>
      <header className="sticky top-0 z-20 border-b bg-white py-1 font-bold shadow-sm">
        <div className="relative py-6 px-4 md:px-8">
          <div className="float-left flex -translate-y-1/2">
            <button onClick={() => setIsNavOpen(!isNavOpen)}>
              <Bars3Icon className="h-7 w-7 cursor-pointer hover:text-blue-500" />
            </button>

            <Link href={"/"} passHref>
              <p
                className={
                  scrollPosition > 45
                    ? "mx-auto cursor-pointer p-3 text-xl max-sm:-translate-y-10 text-black transition-all"
                    : "mx-auto cursor-pointer p-3 text-xl text-black transition-all"
                }
              >
                recipe<span className="text-teal-500">app</span>
              </p>
            </Link>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:invisible">
            <HeaderSearch />
          </div>

          <div className="group float-right -translate-y-1/2 flex-nowrap rounded-full transition ease-in-out hover:bg-blue-100 active:bg-blue-200 active:text-blue-700">
            {session &&
            session.user &&
            session.user.image &&
            session.user.name ? (
              <Link href="/login" passHref>
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  className="rounded-full border hover:scale-110 hover:bg-blue-100"
                  width={26}
                  height={26}
                />
              </Link>
            ) : (
              <button
                className="p-2 align-middle"
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

      <nav
        className={
          isNavOpen
            ? "fixed top-0 z-50 mt-14 h-full w-60 translate-x-0 overflow-auto border-r bg-white/75  backdrop-blur-lg transition-transform duration-300 ease-in motion-reduce:transition-none"
            : "fixed top-0 z-50 mt-14 h-full w-60 -translate-x-full overflow-auto border-r bg-white/75 backdrop-blur-lg transition-transform duration-300 ease-in motion-reduce:transition-none"
        }
      >
        <section className="flex flex-col space-y-3 pt-3">
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

const NavLink = ({ href, children }: LinkProps) => {
  return (
    <div className="group flex">
      <span className="rounded-r-xl border-r-4 border-white transition ease-in-out group-hover:border-blue-500"></span>
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

export default Header;

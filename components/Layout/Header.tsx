import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { UserIcon, Bars3Icon } from "@heroicons/react/24/outline";

import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
import Search from "components/Search";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const dynamicRoute = router.asPath;
  useEffect(() => setIsNavOpen(false), [dynamicRoute]);

  return (
    <>
      <header className="sticky top-0 z-20 flex flex-1 items-center justify-between border-b bg-white px-5 py-1 font-medium shadow-sm dark:border-black/20 dark:bg-zinc-800 max-sm:pr-3 md:px-8">
        <section className="flex flex-1">
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            <Bars3Icon className="h-6 w-6 cursor-pointer hover:text-blue-500 md:h-7 md:w-7" />
          </button>

          <Link className="max-sm:hidden" href={"/"} passHref>
            <p className="mx-auto cursor-pointer p-3 text-xl transition-all">
              recipe<span className="text-teal-500">app</span>
            </p>
          </Link>
        </section>

        <Search />

        <section className="flex flex-1 justify-end gap-1 rounded-full transition ease-in-out">
          <ThemeSwitch />
          {session &&
          session.user &&
          session.user.image &&
          session.user.name ? (
            <UserMenu>
              <Image
                src={session.user.image}
                alt={session.user.name}
                className="m-2 ml-1 rounded-full border hover:scale-110 hover:bg-blue-100"
                width={28}
                height={28}
              />
            </UserMenu>
          ) : (
            <Link className="group" href="/signin" passHref>
              <button className="rounded-full p-2 align-middle transition ease-in-out group-hover:bg-blue-100 dark:group-hover:bg-blue-100/10">
                <UserIcon className="h-6 w-6 cursor-pointer transition ease-in-out group-hover:text-blue-500" />
              </button>
            </Link>
          )}
        </section>
      </header>
      <Sidebar isOpen={isNavOpen} />
    </>
  );
};

export default Header;

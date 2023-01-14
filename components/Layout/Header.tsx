import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { UserIcon, Bars3Icon } from "@heroicons/react/24/outline";

import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
import Search from "components/Search";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const dynamicRoute = router.asPath;
  useEffect(() => setIsNavOpen(false), [dynamicRoute]);

  return (
    <>
      <header className="sticky top-0 z-20 flex-1 flex items-center justify-between border-b bg-white px-5 md:px-8 py-1 font-bold shadow-sm">
        <section className="flex flex-1">
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            <Bars3Icon className="h-7 w-7 cursor-pointer hover:text-blue-500" />
          </button>

          <Link className="max-sm:hidden" href={"/"} passHref>
            <p
              className="mx-auto cursor-pointer p-3 text-xl text-black transition-all"
            >
              recipe<span className="text-teal-500">app</span>
            </p>
          </Link>
        </section>

        <Search />

        <section className="flex justify-end flex-1 rounded-full transition ease-in-out">
          {session &&
          session.user &&
          session.user.image &&
          session.user.name ? (
            <UserMenu>
              <Image
                src={session.user.image}
                alt={session.user.name}
                className="rounded-full border hover:scale-110 hover:bg-blue-100"
                width={28}
                height={28}
              />
            </UserMenu>
          ) : (
            <Link className="group" href="/signin" passHref>
              <button className="p-2 align-middle group-hover:bg-blue-100 rounded-full transition ease-in-out">
                <UserIcon className="h-6 w-6 cursor-pointer group-hover:text-blue-500 transition ease-in-out" />
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

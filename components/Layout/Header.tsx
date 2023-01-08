import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { UserIcon, Bars3Icon } from "@heroicons/react/24/outline";

import { HeaderSearch } from "components/Search";
import useScrollPosition from "hooks/useScrollPosition";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const scrollPosition = useScrollPosition();

  const dynamicRoute = router.asPath;
  useEffect(() => setIsNavOpen(false), [dynamicRoute]);

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
                  router.pathname == "/" && scrollPosition > 45
                    ? "mx-auto cursor-pointer p-3 text-xl text-black transition-all max-sm:-translate-y-10"
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
              <UserMenu>
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  className="rounded-full border hover:scale-110 hover:bg-blue-100"
                  width={26}
                  height={26}
                />
              </UserMenu>
            ) : (
              <Link href="/signin" passHref>
                <button className="p-2 align-middle">
                  <UserIcon className="h-6 w-6 cursor-pointer group-hover:text-blue-500" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <Sidebar isOpen={isNavOpen} />
    </>
  );
};

export default Header;

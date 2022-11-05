import Link from "next/link";
import { Bars4Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "@components/layout/LoginForm";

const links = [
  { name: "Upload", href: "/upload" },
  { name: "Saved recipes", href: "/libary" },
  { name: "Reviews", href: "/reviews" },
  { name: "My recipes", href: "/libary/${user}" },
];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const dynamicRoute = useRouter().asPath;

  // Reset navbar to closed on route change
  useEffect(() => setIsNavOpen(false), [dynamicRoute]);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 mx-auto border-b bg-white py-1 font-bold shadow-sm">
        <div className="flex items-center justify-start gap-2 px-5 md:justify-between">
          {/* Navigation menu */}
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            <Bars4Icon className="h-8 w-8 cursor-pointer text-zinc-400 hover:text-black" />
          </button>

          {/* Logo */}
          <Link href={"/"}>
            <h1 className="mx-auto cursor-pointer py-3 text-2xl text-black">
              Recipe Website
            </h1>
          </Link>

          {/* User section */}
          <div className="flex-nowrap">
            {/* Upload
            <Link href={"/upload"}>
              <UploadIcon className="h-8 w-8 cursor-pointer text-zinc-400 hover:text-black" />
            </Link> */}
            {/* Login */}
            <button
              className="invisible md:visible"
              onClick={() => setIsLoginOpen(!isLoginOpen)}
            >
              <UserIcon className="h-8 w-8 cursor-pointer text-zinc-400 hover:text-black" />
            </button>
          </div>
        </div>
      </header>

      <LoginForm isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />

      {/* Sidebar menu */}
      <nav
        className={
          (isNavOpen ? "translate-x-0" : "-translate-x-full") +
          " fixed top-0 z-20 h-full w-60 translate-x-0 bg-slate-50 transition-transform duration-300 ease-in motion-reduce:transition-none"
        }
      >
        <button
          onClick={() => setIsNavOpen(false)}
          className="flex w-full gap-2 border-b py-4 pl-5"
        >
          <XMarkIcon className="h-8 w-8 text-zinc-400 hover:text-black" />
          <h1 className="visible text-2xl font-bold md:invisible md:text-sm text-black">
            Recipe Website
          </h1>
        </button>

        <section className="flex flex-col pl-[1.6rem] pt-5">
          {/* Login */}
          <button
            className="self-start pb-2 hover:underline md:hidden"
            onClick={() => setIsLoginOpen(!isLoginOpen)}
          >
            Login
          </button>
          {/* Other stuff */}
          {links.map((item, index) => (
            <Link
              key={index}
              className="transition ease-in-out hover:text-blue-500 text-black"
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </section>
      </nav>
    </>
  );
};

export default Header;

import Link from "next/link";
import { Bars4Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "components/LoginForm";
import Upload from "components/Upload";

const links = [
  { name: "Saved recipes", href: "/libary" },
  { name: "Reviews", href: "/reviews" },
  { name: "My recipes", href: "/libary/${user}" },
];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Reset navbar on route change
  const dynamicRoute = useRouter().asPath;
  useEffect(() => setIsNavOpen(false), [dynamicRoute]);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 mx-auto border-b bg-white py-1 font-bold shadow-sm">
        <div className="flex items-center justify-start gap-2 px-5 md:justify-between">
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            <Bars4Icon className="h-8 w-8 cursor-pointer text-zinc-400 hover:text-black" />
          </button>

          <Link href={"/"}>
            <h1 className="mx-auto cursor-pointer py-3 text-2xl text-black">
              Recipe Website
            </h1>
          </Link>

          <div className="flex-nowrap">
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
      <Upload isOpen={isUploadOpen} setIsOpen={setIsUploadOpen} />

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
          <h1 className="visible text-2xl font-bold text-black md:invisible md:text-sm">
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
          <button
            className="self-start text-black transition ease-in-out hover:text-blue-500"
            onClick={() => setIsUploadOpen(!isUploadOpen)}
          >
            Upload
          </button>
          {links.map((item, index) => (
            <Link
              key={index}
              className="text-black transition ease-in-out hover:text-blue-500"
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

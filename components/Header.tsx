import Link from "next/link";
import { Bars4Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState, Dispatch, SetStateAction } from "react";
import Modal from "./Modal";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
            <h1 className="mx-auto cursor-pointer py-3 text-2xl">
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

      {/* Login modal dialog */}
      <Modal
        children={<Login setIsOpen={setIsLoginOpen} />}
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
      />

      {/* Sidebar menu */}
      <nav
        className={
          (isNavOpen ? "translate-x-0" : "-translate-x-full") +
          " fixed top-0 z-20 h-full w-4/6 translate-x-0 bg-slate-50 transition-transform duration-300 ease-in motion-reduce:transition-none md:w-1/4"
        }
      >
        <button
          onClick={() => setIsNavOpen(false)}
          className="flex w-full gap-2 border-b py-4 pl-5"
        >
          <XMarkIcon className="h-8 w-8 text-zinc-400 hover:text-black" />
          <h1 className="visible text-2xl font-bold md:invisible md:text-sm">
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
          <Link href={"/upload"}>
            <a className="hover:underline">Upload a recipe</a>
          </Link>
          <Link href={"/"}>
            <a className="hover:underline">02</a>
          </Link>
          <Link href={"/"}>
            <a className="hover:underline">03</a>
          </Link>
        </section>
      </nav>
    </>
  );
};

type LoginProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setIsOpen }: LoginProps) => {
  return (
    <main className="flex flex-col items-center gap-2">
      <button
        className="self-end p-4 text-slate-400 hover:text-slate-700"
        onClick={() => setIsOpen(false)}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

      {/* Login form */}
      <form className="flex flex-col items-center gap-2 pb-8 font-bold">
        {/* Title */}
        <h1 className="pb-8 text-lg font-bold">Login</h1>
        {/* Google login */}
        <button className="w-full rounded-full bg-blue-500 px-3 py-2 text-white">
          Login with Google
        </button>

        <p className="p-4 text-zinc-400">OR</p>

        {/* Login */}
        <input className="rounded-[4px]" type="text" placeholder="Username" />
        <input
          className="rounded-[4px]"
          type="password"
          placeholder="Password"
        />
        <button className="w-full rounded-full bg-blue-500 p-2 text-white">
          Login
        </button>
      </form>
    </main>
  );
};

export default Header;

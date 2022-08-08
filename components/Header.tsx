import Link from "next/link";
import { MenuIcon, UserIcon, XIcon } from "@heroicons/react/solid";
import { useState, Dispatch, SetStateAction } from "react";
import Modal from "./Modal";

const Header = () => {
  const [ isNavOpen, setIsNavOpen ] = useState(false);
  const [ isLoginOpen, setIsLoginOpen ] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 mx-auto border-b bg-white py-1 font-bold shadow-sm">
        <div className="flex items-center gap-2 justify-start md:justify-between px-5">
          {/* Navigation menu */}
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            <MenuIcon className="h-8 w-8 cursor-pointer text-zinc-400 hover:text-black" />
          </button>

          {/* Logo */}
          <Link href={"/"}>
            <h1 className="cursor-pointer py-3 text-2xl">
              Recipe website
            </h1>
          </Link>

          {/* Login */}
          <button 
            className="invisible md:visible"
            onClick={() => setIsLoginOpen(!isLoginOpen)}>
            <UserIcon className="h-8 w-8 cursor-pointer text-zinc-400 hover:text-black" />
          </button>
        </div>
      </header>

      {/* Login modal dialog */}
      <Modal 
        children={<Login setIsOpen={setIsLoginOpen} />}
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
      />

      {/* Sidebar menu */}
      <nav className={ 
        (isNavOpen ? "translate-x-0" : "-translate-x-full" ) + 
        " md:w-1/4 w-4/6 h-full top-0 fixed z-20 bg-slate-50 translate-x-0 motion-reduce:transition-none transition-transform ease-in duration-300"}
      >
        <button onClick={() => setIsNavOpen(false)} className="py-4 pl-5 border-b w-full flex gap-2" >
          <XIcon className="h-8 w-8 text-zinc-400 hover:text-black" />
          <h1 className="text-2xl font-bold visible md:invisible md:text-sm">
              Recipe website
          </h1>
        </button>
        <section className="pl-[1.6rem] flex flex-col pt-5">
          {/* Login */}
          <button 
            className="md:hidden hover:underline pb-2 self-start"
            onClick={() => setIsLoginOpen(!isLoginOpen)}
          >
            Login
          </button>
          {/* Other stuff */}
          <Link href={"/"}>
            <a className="hover:underline">01</a>
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
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Login = ({ setIsOpen }: LoginProps) => {
  return (
    <main className="flex flex-col gap-2 items-center">
      <button
        className="text-slate-400 hover:text-slate-700 self-end p-4"
        onClick={() => setIsOpen(false)}
      >
        <XIcon className="h-6 w-6" />
      </button>

      {/* Login form */}
      <form className="flex flex-col gap-2 items-center pb-8 font-bold">
        {/* Title */}
        <h1 className="text-lg font-bold pb-8">Login</h1>
        {/* Google login */}
        <button className="bg-blue-500 px-3 py-2 w-full rounded-full text-white">
          Login with Google
        </button>

        <p className="p-4 text-zinc-400">
          OR
        </p>

        {/* Login */}
        <input 
          className="rounded-[4px]" 
          type="text" 
          placeholder="Username"
        />
        <input 
          className="rounded-[4px]" 
          type="password" 
          placeholder="Password"
        />
        <button className="bg-blue-500 px-3 py-2 w-full rounded-full text-white">
          Login
        </button>
      </form>
    </main>
  )
}

export default Header;

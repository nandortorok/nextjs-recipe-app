import { NextPage } from "next";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

import GitHubLogo from "../public/github-mark-white.svg";

const Login: NextPage = () => {
  const { data: session } = useSession();

  return (
    <main className="mx-auto flex min-h-screen flex-col md:max-w-xl">
      <form className="flex flex-col items-center space-y-5 p-10 ">
        <h1 className="py-2 text-black">Log In</h1>

        <input
          type="text"
          className="w-full rounded-md border-gray-300 p-4 text-sm transition ease-in-out focus:border-opacity-0 disabled:bg-gray-100"
          placeholder="Email"
          disabled={true}
        />
        <input
          type="text"
          className="w-full rounded-md border-gray-300 p-4 text-sm transition ease-in-out focus:border-opacity-0 disabled:bg-gray-100"
          placeholder="Password"
          disabled={true}
        />

        <section className="flex w-full flex-row justify-between">
          <button
            className="relative rounded-md bg-white py-2 px-5 text-blue-500 transition ease-in-out hover:bg-blue-50 active:ring disabled:grayscale"
            type="button"
            disabled={true}
          >
            Sign up
          </button>

          <button
            className="rounded-md  bg-blue-500 py-2 px-5 text-white transition ease-in-out hover:bg-blue-600 active:ring disabled:grayscale"
            type="button"
            disabled={true}
          >
            Log in
          </button>
        </section>

        <section className="w-full border-t pt-10">
          {session ? (
            <button
              className="w-full rounded-xl bg-black p-4 text-white transition ease-in-out"
              type="button"
              onClick={() => signOut()}
            >
              <div className="flex justify-center">
                <p className="px-6">Log out</p>
              </div>
            </button>
          ) : (
            <button
              className="w-full rounded-xl bg-black p-4 text-white transition ease-in-out"
              type="button"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              <div className="flex justify-center">
                <Image src={GitHubLogo} alt="GitHub" className="h-6 w-6" />
                <p className="px-6">Log in with GitHub</p>
              </div>
            </button>
          )}
        </section>
      </form>
    </main>
  );
};
export default Login;

import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";

import GitHubLogo from "../public/github-mark-white.svg";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignIn: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session)
      router.push({
        pathname: "/",
      });
  }, [router, session]);

  return (
    <>
      <Head>
        <title>Sign in - Recipe App</title>
        <meta name="description" content="Next.js Recipe App by BaconPardner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen pt-10 px-5">
        <h1 className="py-2 text-center font-bold">Sign in</h1>
        <p className="text-center">Sign in with one of the providers</p>
        <section className="flex w-full flex-col items-center pt-10">
          <button
            className="w-full max-w-lg rounded-2xl bg-black p-4 text-white transition ease-in-out hover:bg-slate-800"
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <div className="flex justify-center">
              <Image src={GitHubLogo} alt="GitHub" className="h-6 w-6" />
              <p className="px-6">Sign in with GitHub</p>
            </div>
          </button>
        </section>
      </main>
    </>
  );
};
export default SignIn;

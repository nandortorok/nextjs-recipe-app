import { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center gap-5 dark:bg-zinc-900">
      <h1 className="font-bold">404</h1>
      <span className="border-r border-gray-300 py-5" />
      <h3 className="text-center">This page could not be found.</h3>
    </main>
  );
};
export default Custom404;

import { NextPage } from "next";

const Custom500: NextPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center gap-5 dark:bg-zinc-900">
      <h1 className="font-bold">500</h1>
      <span className="border-r border-gray-300 py-5" />
      <h3 className="text-center">Internal Server Error.  </h3>
    </main>
  );
};
export default Custom500;

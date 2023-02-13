import { CakeIcon, ClockIcon, TrashIcon } from "@heroicons/react/24/outline";
import { SectionIngredient } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";

import RecipeImage from "components/RecipeImage";
import fetcher from "lib/fetcher";
import getIngredientCount from "lib/getIngredientCount";
import supabase from "lib/supabaseClient";

const deleteRecipe = async (recipeId: string, imagePath: string) => {
  if (process.env.NODE_ENV === "production") {
    const { data, error } = await supabase.storage
      .from("recipe-images")
      .remove([imagePath]);
  }

  const res = await fetch(`/api/user/recipe/${recipeId}`, {
    method: "DELETE",
  });

  await mutate("/api/user/recipe");

  return await await res.json();
};

type RecipeProps = {
  id: string;
  title: string;
  imagePath: string;
  prepTime: number;
  cookTime: number;
  user: {
    name: string | null;
  };
  sections: {
    sectionIngredients: SectionIngredient[];
  }[];
}[];

const Recipes: NextPage = () => {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR<RecipeProps>(
    "/api/user/recipe",
    fetcher
  );

  if (!session || !session?.user?.name)
    return (
      <main className="min-h-screen bg-gray-100 px-5  dark:bg-zinc-800">
        <div className="container mx-auto flex py-8 max-lg:flex-col lg:pl-8">
          <section className="whitespace-nowrap rounded-3xl bg-white p-5 dark:bg-zinc-900/75 lg:sticky lg:top-28 lg:self-start">
            <h1 className="pb-6 text-5xl font-bold md:pb-10">Your Recipes</h1>
            <span className="animate-pulse">
              <div className="pb-1">
                <p className="h-3 w-28 rounded-full bg-gray-200" />
              </div>
              <div className="pb-1">
                <p className="h-3 w-16 rounded-full bg-gray-200" />
              </div>
            </span>
          </section>
          <section className="flex w-full flex-col max-lg:py-5 max-sm:space-y-5 lg:p-5">
            <h3 className="py-5 text-center">
              Sign in to view your uploaded recipes
            </h3>
            <Link
              className="mx-auto rounded-xl bg-blue-500 py-2 px-5 text-white transition ease-in-out hover:bg-blue-600 active:ring"
              href="/signin"
              passHref
            >
              Sign in
            </Link>
          </section>
        </div>
      </main>
    );

  if (isLoading || !data)
    return (
      <main className="min-h-screen bg-gray-100 px-5 dark:bg-zinc-800">
        <div className="container mx-auto flex py-8 max-lg:flex-col lg:pl-8">
          <section className="whitespace-nowrap rounded-3xl bg-white p-5 dark:bg-zinc-900/75 lg:sticky lg:top-28 lg:self-start">
            <h1 className="pb-6 text-5xl font-bold md:pb-10">Your Recipes</h1>
            <span className="animate-pulse">
              <div className="pb-1">
                <p className="h-3 w-28 rounded-full bg-gray-200" />
              </div>
              <div className="pb-1">
                <p className="h-3 w-16 rounded-full bg-gray-200" />
              </div>
            </span>
          </section>
          <section className="w-full animate-pulse max-lg:py-5 max-sm:space-y-5 lg:p-5">
            {[...Array(9)].map((n, idx) => (
              <article key={idx} className="flex py-3">
                <div className="my-auto px-5">
                  <p className="rounded-full bg-gray-200 text-transparent">1</p>
                </div>
                <div className="relative rounded-xl bg-gray-200 py-16 px-24" />
                <section className="flex flex-col px-5 pt-5">
                  <div>
                    <div className="pb-2">
                      <p className="h-4 w-40 rounded-full bg-gray-200" />
                    </div>
                    <p className="h-3 w-20 rounded-full bg-gray-200" />
                  </div>
                  <div className="mt-auto flex h-full items-end justify-center gap-5 pb-5">
                    <p className="h-3 w-20 rounded-full bg-gray-200" />
                    <p className="h-3 w-20 rounded-full bg-gray-200" />
                  </div>
                </section>
              </article>
            ))}
          </section>
        </div>
      </main>
    );

  if (data.length < 1)
    return (
      <main className="min-h-screen bg-gray-100 px-5 dark:bg-zinc-800">
        <div className="container mx-auto flex py-8 max-lg:flex-col lg:pl-8">
          <section className="whitespace-nowrap rounded-3xl bg-white p-5 dark:bg-zinc-900/75 lg:sticky lg:top-28 lg:self-start">
            <h1 className="pb-6 text-5xl font-bold md:pb-10">Your Recipes</h1>
            <p className="text-sm font-medium text-gray-500">
              {session.user.name}
            </p>
            <p className="text-sm text-gray-500">{data.length} recipes</p>
          </section>
          <section className="w-full max-lg:py-5 max-sm:space-y-5 lg:p-5">
            <article className="group rounded-2xl py-3 max-sm:relative max-sm:px-5 sm:flex">
              <p className="w-full text-center text-gray-500 md:py-14 ">
                It seems your list is empty...
              </p>
            </article>
          </section>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-gray-100 px-5 dark:bg-zinc-800">
      <div className="container mx-auto flex py-8 max-lg:flex-col lg:pl-8">
        <section className="whitespace-nowrap rounded-3xl bg-white p-5 dark:bg-zinc-900/75 lg:sticky lg:top-28 lg:self-start">
          <h1 className="pb-6 text-5xl font-bold md:pb-10">Your Recipes</h1>
          <p className="text-sm font-medium text-gray-500">
            {session.user.name}
          </p>
          <p className="text-sm text-gray-500">{data.length} recipes</p>
        </section>
        <section className="w-full max-lg:py-5 max-sm:space-y-5 lg:p-5">
          {data.map(
            (
              { id, user, title, imagePath, prepTime, cookTime, sections },
              idx
            ) => (
              <article
                key={idx}
                className="group rounded-2xl py-3 hover:bg-white dark:hover:bg-zinc-900/75 max-sm:relative max-sm:bg-white max-sm:px-5 dark:max-sm:bg-zinc-900/75 sm:flex"
              >
                <p className="px-5 font-bold text-gray-600 group-hover:text-black dark:group-hover:text-white max-sm:pb-1 max-sm:text-center sm:my-auto">
                  {idx + 1}
                </p>
                <Link className="sm:flex" href={`/recipe/${id}`}>
                  <header className="relative py-20 px-28 sm:py-16 sm:px-24">
                    <RecipeImage
                      className="rounded-xl object-cover"
                      imagePath={imagePath}
                    />
                  </header>
                  <section className="flex flex-col px-2 pt-5 sm:px-5">
                    <div>
                      <h4
                        className="font-medium capitalize lg:mb-auto"
                        title={title}
                      >
                        {title}
                      </h4>
                      <p className="text-sm font-medium text-gray-500">
                        {user.name}
                      </p>
                    </div>
                    <div className="mt-auto h-full items-end justify-center gap-5 pb-5 max-sm:space-y-1 max-sm:pt-5 sm:flex">
                      <div className="flex gap-1 text-sm text-gray-400">
                        <ClockIcon className="h-5 w-5" />
                        <p>{prepTime + cookTime} min</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <CakeIcon className="h-5 w-5" />
                        <p>{getIngredientCount(sections)} ingredients</p>
                      </div>
                    </div>
                  </section>
                </Link>
                <div className="group-hover:visible max-sm:absolute max-sm:bottom-5 max-sm:right-5 sm:invisible sm:my-auto sm:ml-auto sm:pr-5">
                  <button
                    className="rounded-full p-2 text-red-500 transition ease-in-out hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-100/10 max-sm:bg-red-100  sm:text-gray-500"
                    title={`Delete ${title}`}
                    onClick={() => deleteRecipe(id, imagePath)}
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </article>
            )
          )}
        </section>
      </div>
    </main>
  );
};

export default Recipes;

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import { SectionIngredient } from "@prisma/client";
import { CakeIcon, ClockIcon, TrashIcon } from "@heroicons/react/24/outline";

import fetcher from "lib/fetcher";
import getIngredientCount from "lib/getIngredientCount";

const deleteRecipe = async (recipeId: string) => {
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
  const router = useRouter();
  const { data, error, isLoading } = useSWR<RecipeProps>(
    "/api/user/recipe",
    fetcher
  );

  useEffect(() => {
    if (!session)
      router.push({
        pathname: "/signin",
      });
  }, [router, session]);

  if (!data || !session?.user?.name) return null;

  if (isLoading)
    return (
      <main className="bg-gray-100">
        <section className="fixed top-24 left-48 self-start whitespace-nowrap rounded-3xl bg-white p-5">
          <h1 className="pb-10 text-5xl font-bold">Your Recipes</h1>
          <div className="pb-1">
            <p className="h-3 w-28 rounded-full bg-gray-200" />
          </div>
          <div className="pb-1">
            <p className="h-3 w-16 rounded-full bg-gray-200" />
          </div>
        </section>
        <div className="container mx-auto flex py-8 pl-8">
          <span className="px-40" />
          <section className="w-full p-5">
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

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="fixed top-24 left-48 self-start whitespace-nowrap rounded-3xl bg-white p-5">
        <h1 className="pb-10 text-5xl font-bold">Your Recipes</h1>
        <p className="text-sm font-medium text-gray-500">{session.user.name}</p>
        <p className="text-sm text-gray-500">{data.length} recipes</p>
      </section>
      <div className="container mx-auto flex py-8 pl-8">
        <span className="px-40" />
        <section className="w-full p-5">
          {data.map(
            (
              { id, user, title, imagePath, prepTime, cookTime, sections },
              idx
            ) => (
              <article
                key={idx}
                className="group flex rounded-2xl py-3 hover:bg-white"
              >
                <p className="my-auto px-5 font-bold text-gray-600 group-hover:text-black">
                  {idx + 1}
                </p>
                <Link className="flex" href={`/recipe/${id}`}>
                  <header className="relative py-16 px-24">
                    <Image
                      src={`/img/${imagePath}`}
                      alt="recipe image"
                      className="rounded-xl object-cover"
                      sizes={"(max-width: 768px)"}
                      fill={true}
                    />
                  </header>
                  <section className="flex flex-col px-5 pt-5">
                    <div>
                      <h4
                        className="font-medium first-letter:capitalize lg:mb-auto"
                        title={title}
                      >
                        {title}
                      </h4>
                      <p className="text-sm font-medium text-gray-500">
                        {user.name}
                      </p>
                    </div>
                    <div className="mt-auto flex h-full items-end justify-center gap-5 pb-5">
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
                <div className="invisible my-auto ml-auto pr-5 group-hover:visible">
                  <button
                    className="rounded-full p-2 text-gray-500 transition ease-in-out hover:bg-red-100 hover:text-red-500"
                    title={`Delete ${title}`}
                    onClick={() => deleteRecipe(id)}
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

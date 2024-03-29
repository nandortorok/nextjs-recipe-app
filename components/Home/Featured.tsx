import { useState } from "react";

import { CakeIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Recipe, SectionIngredient, Featured } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import RecipeImage from "components/RecipeImage";
import Spinner from "components/Spinner";
import fetcher from "lib/fetcher";
import getIngredientCount from "lib/getIngredientCount";

const CategoriesInit = [
  { name: "All", route: "/all", isSelected: true },
  { name: "New", route: "/new", isSelected: false },
  { name: "Simpler First", route: "/simpler", isSelected: false },
];

type RecipeProps = (Featured & {
  recipe: Recipe & {
    user: {
      name: string | null;
    };
    sections: {
      sectionIngredients: SectionIngredient[];
    }[];
  };
})[];

const apiRouteInit = "/api/recipe";

const Featured = () => {
  const [apiRoute, setApiRoute] = useState(
    apiRouteInit + CategoriesInit[0].route
  );
  const [categories, setCategories] = useState(CategoriesInit);
  const { data, error, isLoading } = useSWR<RecipeProps>(apiRoute, fetcher);

  const updateCategories = (name: string) => {
    const newCategories = categories.map((item, idx) => {
      if (item.name === name) {
        setApiRoute(apiRouteInit + item.route);
        return { ...item, isSelected: true };
      }
      return { ...item, isSelected: false };
    });

    setCategories(newCategories);
  };

  return (
    <section className="bg-zinc-100 bg-gradient-to-b py-10 dark:bg-zinc-900">
      <div className="mx-auto xl:container">
        <h1 className="px-5 pb-10 text-4xl font-bold sm:text-center">
          Featured
        </h1>
        <div className="flex justify-start space-x-4 overflow-x-auto whitespace-nowrap px-5 md:justify-center">
          {categories.map(({ name, isSelected }, idx) => (
            <button
              key={idx}
              className={
                isSelected
                  ? "rounded-2xl bg-blue-500 px-6 py-2 text-sm text-white transition-all ease-in-out hover:bg-blue-600 hover:text-blue-50 dark:bg-blue-600"
                  : "rounded-2xl bg-slate-200 px-6 py-2 text-sm text-slate-400 transition-all ease-in-out hover:bg-blue-200 hover:text-blue-500 dark:bg-black dark:text-gray-100 dark:hover:bg-blue-200/10 dark:hover:text-blue-50"
              }
              onClick={() => updateCategories(name)}
            >
              {name}
            </button>
          ))}
        </div>
        {isLoading && (
          <div className="overflow-x-auto py-5 max-xl:flex max-xl:space-x-5 xl:grid xl:grid-cols-3 xl:grid-rows-3 xl:gap-y-5 xl:gap-x-12 xl:px-5 2xl:gap-x-24 2xl:px-5">
            <span className="md:hidden" />
            {[...Array(9)].map((n, idx) => (
              <article
                key={idx}
                className="animate-pulse rounded-2xl bg-white shadow-md transition-all ease-in-out hover:scale-105 hover:shadow-lg dark:bg-zinc-800 xl:flex"
              >
                <header className="relative bg-gray-200 py-20 px-28 dark:bg-zinc-700 max-xl:rounded-t-2xl xl:rounded-l-2xl">
                  <Spinner />
                </header>
                <main className="space-y-1 px-6 pb-2 lg:flex lg:flex-col">
                  <p className="font bold my-4 h-4 rounded-full bg-gray-200 px-12 xl:mb-auto 2xl:px-16" />
                  <div className="pb-1">
                    <p className="h-3 w-14 rounded-full bg-gray-200" />
                  </div>
                  <div className="pb-1">
                    <p className="h-3 w-20 rounded-full bg-gray-200" />
                  </div>
                </main>
              </article>
            ))}
            <span className="md:hidden" />
          </div>
        )}
        <motion.div
          key={categories.filter((v) => v.isSelected === true)[0].name}
          initial={{ opacity: 0.5, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto py-5 max-xl:flex max-xl:space-x-5 xl:grid xl:grid-cols-3 xl:grid-rows-3 xl:gap-y-5 xl:gap-x-12 xl:px-5 2xl:gap-x-24 2xl:px-5"
        >
          <span className="xl:hidden" />
          {data &&
            data.map(
              (
                {
                  recipe: {
                    id,
                    imagePath,
                    user,
                    title,
                    prepTime,
                    cookTime,
                    sections,
                  },
                },
                idx
              ) => (
                <Link key={idx} href={`/recipe/${id}`}>
                  <article className="rounded-2xl bg-white shadow-md transition-all ease-in-out hover:scale-105 hover:shadow-lg dark:bg-zinc-800 xl:flex">
                    <header className="relative rounded-t-2xl bg-gray-200 py-20 px-28 dark:bg-zinc-700 xl:rounded-l-2xl">
                      <RecipeImage
                        className="object-cover max-xl:rounded-t-2xl xl:rounded-l-2xl"
                        imagePath={imagePath}
                      />
                      <div className="absolute left-0 right-0 top-0 bg-gradient-to-b from-black/75 to-transparent py-8 max-xl:rounded-t-2xl xl:rounded-tl-2xl">
                        <p className="absolute top-4 px-4 text-sm font-medium text-gray-200">
                          {user.name}
                        </p>
                      </div>
                    </header>
                    <main className="space-y-1 pl-6 pb-3 lg:flex lg:flex-col">
                      <h4 className="py-2 font-medium capitalize lg:mb-auto">
                        {title}
                      </h4>
                      <div className="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-300">
                        <ClockIcon className="h-5 w-5" />
                        <p>{prepTime + cookTime} min</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-300">
                        <CakeIcon className="h-5 w-5" />
                        <p>{getIngredientCount(sections)} ingredients</p>
                      </div>
                    </main>
                  </article>
                </Link>
              )
            )}
          <span className="xl:hidden" />
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;

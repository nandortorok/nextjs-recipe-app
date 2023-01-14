import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { CakeIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Recipe, SectionIngredient } from "@prisma/client";
import { motion } from "framer-motion";

const CategoriesInit = [
  { name: "All", route: "/all", isSelected: true },
  { name: "New", route: "/new", isSelected: false },
  { name: "Simpler First", route: "/simpler", isSelected: false },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type RecipeProps = (Recipe & {
  user: {
    name: string | null;
  };
  sections: SectionsProps;
})[];

type SectionsProps = {
  sectionIngredients: SectionIngredient[];
}[];

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

  const getIngredientCount = (sections: SectionsProps) => {
    let count = 0;

    sections.map(({ sectionIngredients }) => {
      return sectionIngredients.map(() => {
        count++;
      });
    });

    return count;
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 via-white to-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="px-5 pb-10 text-4xl font-bold md:text-center">
          Featured
        </h1>
        <div className="flex justify-start space-x-4 overflow-x-auto whitespace-nowrap px-5 md:justify-center">
          {categories.map(({ name, isSelected }, idx) => (
            <button
              key={idx}
              className={
                isSelected
                  ? "rounded-2xl bg-blue-500 px-6 py-2 text-sm text-white transition-all ease-in-out hover:bg-blue-600 hover:text-blue-50"
                  : "rounded-2xl bg-gray-200 px-6 py-2 text-sm text-gray-400 transition-all ease-in-out hover:bg-blue-300 hover:text-gray-200"
              }
              onClick={() => updateCategories(name)}
            >
              {name}
            </button>
          ))}
        </div>
        {isLoading && (
          <div className="flex items-center justify-center py-5 text-gray-500">
            <Spinner />
            <p className="text-center">Loading</p>
          </div>
        )}
        <motion.div
          key={categories.filter((v) => v.isSelected === true)[0].name}
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex space-x-5 overflow-x-auto whitespace-nowrap py-5"
        >
          <span />
          {data &&
            data.map(
              ({ id, title, imagePath, prepTime, cookTime, sections }, idx) => (
                <article key={idx} className="rounded-2xl bg-white shadow-md">
                  <header className="relative py-20 px-28">
                    <Image
                      src={`/img/${imagePath}`}
                      alt="recipe image"
                      className="rounded-t-2xl object-cover"
                      fill={true}
                      sizes={"(max-width: 768px)"}
                      placeholder="blur"
                      blurDataURL={`/img/${imagePath}`}
                    />
                  </header>
                  <p className="px-4 py-2 font-bold">{title}</p>
                  <footer className="space-y-1 px-4 pb-2 text-sm text-gray-400">
                    <div className="flex items-center  gap-1">
                      <ClockIcon className="h-5 w-5" />
                      <p>{prepTime + cookTime} min</p>
                    </div>
                    <div className="flex items-center gap-1 ">
                      <CakeIcon className="h-5 w-5" />
                      <p>{getIngredientCount(sections)} ingredients</p>
                    </div>
                  </footer>
                </article>
              )
            )}
          <span />
        </motion.div>
      </div>
    </section>
  );
};

export const Spinner = () => {
  return (
    <svg
      className="-ml-1 mr-3 h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Featured;

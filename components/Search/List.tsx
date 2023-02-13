import { Dispatch, SetStateAction } from "react";

import { Ingredient, Section, SectionIngredient } from "@prisma/client";
import Link from "next/link";
import Highlighter from "react-highlight-words";
import useSWR from "swr";

import Spinner from "components/Spinner";
import fetcher from "lib/fetcher";

import {
  Arrow,
  Highlight,
  IngredientItems,
  RecipeTitleList,
} from "./ListElements";

type SearchProps = {
  recipes: {
    id: string;
    title: string;
    user: {
      name: string | null;
    };
    sections: {
      sectionIngredients: {
        ingredient: Ingredient;
      }[];
    }[];
  }[];
  ingredients: (Ingredient & {
    sectionIngredients: (SectionIngredient & {
      section: Section & {
        recipe: {
          title: string;
        };
      };
    })[];
  })[];
};

type ListProps = {
  query: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const List = ({ query, setIsOpen }: ListProps) => {
  const { data, error, isLoading } = useSWR<SearchProps>(
    `/api/search?title=${query}`,
    fetcher
  );

  if (!data || isLoading)
    return (
      <main className="flex h-full grow animate-pulse flex-col justify-center">
        <span className="mx-auto">
          <Spinner />
        </span>
      </main>
    );

  if (data.recipes.length < 1 && data.ingredients.length < 1)
    return (
      <div className="flex h-full flex-col items-center justify-center text-gray-500">
        <h3>
          No matching for{" "}
          <span className="text-black dark:text-white">
            &quot;{query}&quot;
          </span>{" "}
        </h3>
        <p className="text-sm">Try to search for something else</p>
      </div>
    );

  return (
    <main className="grow overflow-auto">
      {data.recipes.length >= 1 && (
        <>
          <h3 className="px-5 py-4 font-bold">Recipes</h3>
          <ul className="border-t dark:border-zinc-700">
            {data.recipes.map(({ id, title, user, sections }) => (
              <Link
                key={id}
                className=""
                href={`/recipe/${id}`}
                onClick={() => setIsOpen(false)}
                passHref
              >
                <li className="overflow-x-hidden border-b px-5 py-3 text-gray-700 transition ease-in-out hover:bg-slate-50 dark:border-zinc-700 dark:text-gray-400 dark:hover:bg-slate-500/10">
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    <Highlighter
                      className="capitalize dark:text-gray-400"
                      searchWords={[query]}
                      autoEscape={true}
                      textToHighlight={title}
                      highlightTag={Highlight}
                    />
                    <Arrow />
                    <IngredientItems sections={sections} />
                  </div>
                  <div className="flex items-center pt-1 text-xs">
                    <p className="text-gray-500">By</p>
                    <p className="ml-1 rounded-full bg-gray-100 px-2 py-1 font-medium dark:bg-gray-100/10">
                      {user.name}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </>
      )}

      {query !== "" && data.ingredients.length > 1 && (
        <>
          <h3 className=" px-5 py-4 font-bold">Ingredients</h3>
          <ul className="">
            {data &&
              data.ingredients.map(({ name, sectionIngredients }, idx) => (
                <li
                  key={idx}
                  className="overflow-x-hidden border-t px-5 py-3 text-gray-700 transition ease-in-out dark:border-zinc-700 dark:text-gray-400"
                >
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    <Highlighter
                      className="first-letter:capitalize dark:text-gray-400"
                      searchWords={[query]}
                      autoEscape={true}
                      textToHighlight={name}
                      highlightTag={Highlight}
                    />
                    <Arrow />
                    <RecipeTitleList sectionIngredients={sectionIngredients} />
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </main>
  );
};

export default List;

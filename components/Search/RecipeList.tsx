import { Ingredient } from "@prisma/client";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import Highlighter from "react-highlight-words";
import useSWR from "swr";

import fetcher from "lib/fetcher";
import { Highlight, Arrow, IngredientItems } from "./ListElements";

type RecipeProps = {
  title: string;
  id: string;
  user: {
    name: string | null;
  };
  sections: {
    sectionIngredients: {
      ingredient: Ingredient;
    }[];
  }[];
}[];

type RecipeListProps = {
  query: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const RecipeList = ({ query, setIsOpen }: RecipeListProps) => {
  const { data, error, isLoading } = useSWR<RecipeProps>(
    `/api/search?title=${query}`,
    fetcher
  );

  if (!data) return null;
  if (data.length < 1)
    return (
      <div className="flex h-full flex-col items-center justify-center text-gray-500">
        <h3>
          No matching for{" "}
          <span className="text-black">&quot;{query}&quot;</span>{" "}
        </h3>
        <p className="text-sm">Try to search for something else</p>
      </div>
    );

  // if (isLoading)
  //   return (
  //     <>
  //       <h3 className="border-t px-5 py-4 font-bold">Ingredients</h3>
  //       <div>...Loading</div>
  //     </>
  //   );

  return (
    <>
      <h3 className="px-5 py-4 font-bold">Recipes</h3>
      <ul className="">
        {data.map(({ id, title, user, sections }) => (
          <Link
            key={id}
            className=""
            href={`/recipe/${id}`}
            onClick={() => setIsOpen(false)}
            passHref
          >
            <li className="overflow-x-hidden border-t px-5 py-3 text-gray-700 transition ease-in-out hover:bg-slate-50">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <Highlighter
                  className="first-letter:capitalize"
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
                <p className="ml-1 rounded-full bg-gray-100 px-2 py-1 font-medium">
                  {user.name}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default RecipeList;

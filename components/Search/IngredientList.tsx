import { Ingredient, Section, SectionIngredient } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import Highlighter from "react-highlight-words";
import useSWR from "swr";

import fetcher from "lib/fetcher";
import { Highlight, Arrow, RecipeTitleList } from "./ListElements";

type SectionIngredients = (SectionIngredient & {
  section: Section & {
    recipe: {
      title: string;
    };
  };
})[];

type IngredientProps = (Ingredient & {
  sectionIngredients: SectionIngredients;
})[];

type IngredientListProps = {
  query: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const IngredientList = ({ query, setIsOpen }: IngredientListProps) => {
  const { data, error, isLoading } = useSWR<IngredientProps>(
    `/api/search/ingredients?name=${query}`,
    fetcher
  );

  if (!data || query.length < 1 || data.length < 1) return null;

  // if (isLoading)
  //   return (
  //     <>
  //       <h3 className="border-t px-5 py-4 font-bold">Ingredients</h3>
  //       <div>...Loading</div>
  //     </>
  //   );

  return (
    <>
      <h3 className="border-t px-5 py-4 font-bold">Ingredients</h3>
      <ul className="">
        {data &&
          data.map(({ name, sectionIngredients }, idx) => (
            <li
              key={idx}
              className="overflow-x-hidden border-t px-5 py-3 text-gray-700 transition ease-in-out"
            >
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <Highlighter
                  className="first-letter:capitalize"
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
  );
};

export default IngredientList;

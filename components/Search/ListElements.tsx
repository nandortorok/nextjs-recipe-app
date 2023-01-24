import { Ingredient, Section, SectionIngredient } from "@prisma/client";
import { useEffect, useState } from "react";

type HighlightProps = {
  children: string;
  highlightIndex: number;
};

export const Highlight = ({ children, highlightIndex }: HighlightProps) => (
  <strong>{children}</strong>
);

type IngredientItemsProps = {
  sections: {
    sectionIngredients: {
      ingredient: Ingredient;
    }[];
  }[];
};

export const IngredientItems = ({ sections }: IngredientItemsProps) => {
  const [width, setWidth] = useState(window.innerWidth);

  const ingredients = sections.flatMap(({ sectionIngredients }) =>
    sectionIngredients.flatMap(({ ingredient: { name } }) => {
      return name;
    })
  );

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  if (width > 768)
    return (
      <div className="flex gap-2">
        {ingredients.map(
          (item, idx) =>
            idx < 6 && (
              <p
                key={idx}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs first-letter:capitalize"
              >
                {item}
              </p>
            )
        )}
        {ingredients.length > 7 && (
          <p className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
            {ingredients.length - 6} more
          </p>
        )}
        <div className="absolute right-0 bg-gradient-to-r from-transparent via-white to-white py-3 px-5 md:hidden"></div>
      </div>
    );

  return (
    <p className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
      {ingredients.length} ingredients
    </p>
  );
};

type RecipeTitleListProps = {
  sectionIngredients: (SectionIngredient & {
    section: Section & {
      recipe: {
        title: string;
      };
    };
  })[];
};

export const RecipeTitleList = ({
  sectionIngredients,
}: RecipeTitleListProps) => {
  const [width, setWidth] = useState(window.innerWidth);

  const recipes = sectionIngredients.flatMap(({ section: { recipe } }) => {
    return recipe.title;
  });

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  if (width > 768)
    return (
      <>
        {recipes.map(
          (title, idx) =>
            idx < 2 && (
              <p
                key={idx}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium first-letter:capitalize"
              >
                {title}
              </p>
            )
        )}
        {recipes.length > 2 && (
          <p className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
            {recipes.length - 2} more
          </p>
        )}
      </>
    );

  return (
    <p className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
      {recipes.length} recipes
    </p>
  );
};

export const Arrow = () => {
  return (
    <svg
      width="6"
      height="6"
      aria-hidden="true"
      className="overflow-visible pl-1 pr-2"
    >
      <path
        d="M0 0L3 3L0 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};

import { Ingredient } from "@prisma/client";
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
                className="rounded-full bg-gray-100 px-2 py-1 text-xs"
              >
                {item}
              </p>
            )
        )}
        {ingredients.length - 6 > 1 && (
          <p className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
            {ingredients.length - 6} more
          </p>
        )}
        <div className="absolute right-0 bg-gradient-to-r from-transparent via-white to-white py-3 px-5 md:hidden"></div>
      </div>
    );

  return (
    <div className="flex gap-2">
      <p className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
        {ingredients.length} ingredients
      </p>
    </div>
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
        stroke-width="2"
        stroke-linecap="round"
      ></path>
    </svg>
  );
};

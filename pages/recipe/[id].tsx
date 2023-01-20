import {
  Direction,
  Ingredient,
  Recipe,
  Section,
  SectionIngredient,
  Unit,
  User,
} from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import {
  BookmarkIcon,
  CircleStackIcon,
  ClockIcon as ClockIconOutline,
} from "@heroicons/react/24/outline";

import { ClockIcon as ClockIconSolid } from "@heroicons/react/24/solid";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const req = await fetch(`http://localhost:3000/api/recipe?id=${params!.id}`);
  const recipe = await req.json();

  return { props: { recipe } };
};

type Props = {
  recipe: Recipe & {
    sections: (Section & {
      sectionIngredients: (SectionIngredient & {
        ingredient: Ingredient;
        unit: Unit | null;
      })[];
      directions: Direction[];
    })[];
    user: User;
  };
};

const Recipe: NextPage<Props> = ({ recipe }) => {
  return (
    <>
      <Head>
        <title>{recipe.title}</title>
      </Head>

      <main className="pb-10">
        <section className="flex bg-gray-50">
          <header className="relative h-[94vh] w-1/2">
            <Image
              src={`/img/${recipe.imagePath}`}
              alt="recipe image"
              className="object-cover"
              sizes={"(max-width: 768px)"}
              fill={true}
            />
          </header>
          <main className="relative m-auto w-1/2">
            <div className="my-20 text-center">
              <h1 className="pb-4 text-5xl font-black">{recipe.title}</h1>
              <p className="pb-1 uppercase text-gray-600">
                By {recipe.user.name}
              </p>
              <p className="pb-4 text-sm text-gray-400">
                {new Date(
                  Date.parse(recipe.createdAt.toString())
                ).toDateString()}
              </p>
              <button className="mx-auto flex rounded-3xl border border-blue-500 px-4 py-2 text-blue-500 transition ease-in-out hover:bg-blue-500 hover:text-white">
                <BookmarkIcon className="mr-2 h-6 w-6" />
                Save recipe
              </button>
            </div>
            <div className="absolute flex w-full justify-center gap-5">
              <div className="flex flex-col items-center">
                <ClockIconSolid className="h-6 w-6" />
                <p className="font-medium">Prep time</p>
                <p className="text-sm">{recipe.prepTime} m</p>
              </div>
              <div className="flex flex-col items-center">
                <ClockIconOutline className="h-6 w-6" />
                <p className="font-medium">Cook time</p>
                <p className="text-sm">{recipe.cookTime} m</p>
              </div>
              <div className="flex flex-col items-center">
                <CircleStackIcon className="h-6 w-6" />
                <p className="font-medium">Servings</p>
                <p className="text-sm">{recipe.servings}</p>
              </div>
            </div>
          </main>
        </section>

        <section className="flex py-16">
          <div className="w-full px-16">
            <h1 className="border-b-2 border-gray-200 pt-5 pb-2 text-3xl font-bold">
              Ingredients
            </h1>
            <div className="flex pt-5">
              {recipe.sections.map(
                ({ title, sectionIngredients }, sectionIdx) => (
                  <div key={sectionIdx} className="w-full">
                    <h1 className="py-1 font-medium">{title}</h1>
                    <ul>
                      {sectionIngredients.map(
                        ({ ingredient, amount, unit }, idx) => (
                          <li
                            key={idx}
                            className="flex items-baseline gap-1 rounded-3xl py-3 pl-3"
                          >
                            <p>{amount}</p>
                            {unit && <p>{unit.short}</p>}
                            <div>{ingredient.name}</div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="w-full px-16">
            <h1 className="border-b-2 border-gray-200 pt-5 pb-2 text-3xl font-bold">
              Directions
            </h1>
            <div className="pt-5">
              {recipe.sections.map(({ title, directions }, idx) => (
                <div key={idx}>
                  <h1 className="py-1 font-medium">{title}</h1>
                  <ul>
                    {directions.map(({ direction, stepNumber }) => (
                      <li key={stepNumber} className="pb-2 pl-3">
                        <p className="py-2 font-medium">Step {stepNumber}</p>
                        <p>{direction}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Recipe;

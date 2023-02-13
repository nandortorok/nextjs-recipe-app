import {
  BookmarkSlashIcon,
  CircleStackIcon,
  ClockIcon as ClockIconOutline,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon,
  ClockIcon as ClockIconSolid,
} from "@heroicons/react/24/solid";
import {
  Direction,
  Ingredient,
  Recipe,
  SavedRecipe,
  Section,
  SectionIngredient,
  Unit,
  User,
} from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";

import RecipeImage from "components/RecipeImage";
import fetcher from "lib/fetcher";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, params } = context;

  const request = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://${req?.headers.host}/api/recipe?id=${params!.id}`
      : `http://${req?.headers.host}/api/recipe?id=${params!.id}`
  );
  const recipe = await request.json();

  return { props: { recipe } };
};

type RecipeProps =
  | (Recipe & {
      user: User;
      sections: (Section & {
        directions: Direction[];
        sectionIngredients: (SectionIngredient & {
          ingredient: Ingredient;
          unit: Unit | null;
        })[];
      })[];
    })
  | null;

type Props = {
  recipe: RecipeProps;
};

const RecipePage: NextPage<Props> = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <>
      <Head>
        <title>{recipe.title}</title>
      </Head>

      <main className="pb-10 dark:bg-zinc-800">
        <section className=" -mt-14 flex h-screen bg-gray-50 dark:bg-zinc-900 max-lg:flex-col max-md:-mt-12 max-md:justify-between">
          <header className="relative h-full lg:w-1/2">
            <RecipeImage
              className="object-cover"
              imagePath={recipe.imagePath}
              alt={recipe.title}
            />
          </header>
          <main className="py-10 max-md:h-1/2 lg:relative lg:m-auto lg:w-1/2">
            <div className="text-center lg:my-20">
              <h1 className="pb-4 text-5xl font-black  2xl:text-6xl">
                {recipe.title}
              </h1>
              <p className="pb-1 uppercase text-gray-600">
                By {recipe.user.name}
              </p>
              <p className="pb-4 text-sm text-gray-400">
                {new Date(
                  Date.parse(recipe.createdAt.toString())
                ).toDateString()}
              </p>
              <Buttons recipeId={recipe.id} />
            </div>
            <div className="flex w-full justify-center gap-10 pt-10 lg:absolute">
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
        <section className="md:flex lg:py-16">
          <div className="w-full px-5 lg:px-16">
            <h1 className="border-b-2 border-gray-200 pt-20 pb-2 text-4xl font-bold md:pt-5">
              Ingredients
            </h1>
            <div className="pt-5 lg:flex">
              {recipe.sections.map(
                ({ title, sectionIngredients }, sectionIdx) => (
                  <div key={sectionIdx} className="w-full">
                    {recipe.sections.length > 2 && (
                      <h1 className="py-1 font-bold">{title}</h1>
                    )}
                    <ul className="max-sm:pb-3">
                      {sectionIngredients.map(
                        ({ ingredient, amount, unit }, idx) => (
                          <li
                            key={idx}
                            className="flex items-baseline gap-1 rounded-3xl py-1 pl-3 lg:py-3"
                          >
                            <p>{amount}</p>
                            {unit && (
                              <p>{unit.short ? unit.short : unit.name}</p>
                            )}
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

          <div className="w-full px-5 max-sm:pt-5 md:px-16">
            <h1 className="border-b-2 border-gray-200 pt-20 pb-2 text-4xl font-bold md:pt-5">
              Directions
            </h1>
            <div className="pt-5">
              {recipe.sections.map(({ title, directions }, idx) => (
                <div key={idx}>
                  {recipe.sections.length > 2 && (
                    <h1 className="py-1 font-bold">{title}</h1>
                  )}
                  <ul className="max-sm:pb-3">
                    {directions.map(({ direction, stepNumber }) => (
                      <li key={stepNumber} className="pb-2 pl-3">
                        {directions.length > 1 && (
                          <p className="py-2 font-medium">Step {stepNumber}</p>
                        )}
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
type FetchProps = {
  savedRecipe: SavedRecipe | null;
  userName: {
    user: {
      name: string | null;
    };
  } | null;
};

type ButtonProps = {
  recipeId: string;
};

const Buttons = ({ recipeId }: ButtonProps) => {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR<FetchProps>(
    `/api/library/${recipeId}`,
    fetcher
  );

  const handleSave = async () => {
    const res = await fetch(`/api/library/${recipeId}`, {
      method: "PUT",
    });
    await mutate(`/api/library/${recipeId}`);

    return await await res.json();
  };

  const handleRemove = async () => {
    const res = await fetch(`/api/library/${recipeId}`, {
      method: "DELETE",
    });
    await mutate(`/api/library/${recipeId}`);

    return await await res.json();
  };

  if (!session) return null;

  if (isLoading)
    return (
      <button
        className="mx-auto flex animate-pulse rounded-3xl border border-blue-500 px-4 py-3 text-blue-500 transition ease-in-out hover:bg-blue-500 hover:text-white"
        onClick={handleSave}
        title="...Loading"
      >
        <p className="rounded-full bg-blue-500/50 py-2 px-14"></p>
      </button>
    );

  // if (session?.user?.name === data?.userName?.user.name) {
  //   if (!data?.savedRecipe?.recipeId)
  //     return (
  //       <div className="flex justify-center">
  //         <button
  //           className="ml-10 flex rounded-3xl border border-blue-500 px-4 py-2 text-blue-500 transition ease-in-out hover:bg-blue-500 hover:text-white"
  //           onClick={handleSave}
  //           title="Save to saved recipes"
  //         >
  //           <BookmarkIcon className="mr-2 h-6 w-6" />
  //           Save recipe
  //         </button>
  //         <button
  //           className="ml-2 transition ease-in-out hover:text-blue-500 active:text-blue-600"
  //           title="Edit recipe"
  //         >
  //           <PencilIcon className="h-8 w-8" />
  //         </button>
  //       </div>
  //     );

  //   return (
  //     <div className="flex justify-center">
  //       <button
  //         className="ml-10 flex rounded-3xl border border-blue-500 px-4 py-2 text-blue-500 transition ease-in-out hover:bg-blue-500 hover:text-white"
  //         onClick={handleRemove}
  //         title="Remove form saved recipes"
  //       >
  //         <BookmarkSlashIcon className="mr-2 h-6 w-6" />
  //         Remove recipe
  //       </button>
  //       <button
  //         className="ml-2 transition ease-in-out hover:text-blue-500 active:text-blue-600"
  //         title="Edit recipe"
  //       >
  //         <PencilIcon className="h-8 w-8 " />
  //       </button>
  //     </div>
  //   );
  // }

  if (!data?.savedRecipe?.recipeId)
    return (
      <button
        className="mx-auto flex rounded-3xl border border-blue-500 px-4 py-2 text-blue-500 transition ease-in-out hover:bg-blue-500 hover:text-white"
        onClick={handleSave}
        title="Save to saved recipes"
      >
        <BookmarkIcon className="mr-2 h-6 w-6" />
        Save recipe
      </button>
    );

  return (
    <button
      className="mx-auto flex rounded-3xl border border-blue-500 px-4 py-2 text-blue-500 transition ease-in-out hover:bg-blue-500 hover:text-white"
      onClick={handleRemove}
      title="Remove form saved recipes"
    >
      <BookmarkSlashIcon className="mr-2 h-6 w-6" />
      Remove recipe
    </button>
  );
};

export default RecipePage;

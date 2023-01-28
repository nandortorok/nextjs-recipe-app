import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma";
import Featured from "components/Home/Featured";
import { CakeIcon, ClockIcon } from "@heroicons/react/24/outline";
import getIngredientCount from "lib/getIngredientCount";
import RecipeImage from "components/RecipeImage";

const getRecipes = async () => {
  return await prisma.recipe.findMany({
    select: {
      id: true,
      title: true,
      imagePath: true,
      prepTime: true,
      cookTime: true,
      user: {
        select: {
          name: true,
        },
      },
      sections: {
        select: {
          sectionIngredients: true,
        },
      },
    },
    take: 6,
  });
};

type HomeProps = {
  recipes: Prisma.PromiseReturnType<typeof getRecipes>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const recipes = await getRecipes();

  return {
    props: { recipes },
  };
};

const Home: NextPage<HomeProps> = ({ recipes }) => {
  return (
    <>
      <Head>
        <title>Recipe App</title>
        <meta name="description" content="Next.js Recipe App by BaconPardner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Featured />

        <section className="container mx-auto py-10 px-5 md:py-20">
          <h1 className="pb-10 text-4xl font-bold sm:text-center md:pb-20">
            Recipes
          </h1>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {recipes.map(
              (
                { id, imagePath, title, user, prepTime, cookTime, sections },
                idx
              ) => (
                <Link key={idx} href={`recipe/${id}`}>
                  <article
                    key={idx}
                    className="relative rounded-3xl py-28 text-white shadow-md transition-all ease-in-out hover:scale-105 hover:shadow-xl sm:py-40 lg:px-60 lg:py-44 2xl:px-80 2xl:py-56"
                  >
                    <RecipeImage
                      className="rounded-3xl object-cover"
                      imagePath={imagePath}
                    />
                    <header className="absolute top-0 left-0 right-0 rounded-t-3xl bg-gradient-to-b from-black/50 to-transparent py-8">
                      <p className="absolute left-5 top-5 text-sm font-medium xl:text-base">
                        {user.name}
                      </p>
                    </header>
                    <footer className="absolute bottom-0 left-0 right-0 rounded-b-3xl bg-gradient-to-t from-black/50 to-transparent py-12 xl:py-16  ">
                      <h1 className="absolute left-5 top-6 text-lg font-black capitalize xl:top-10 xl:text-3xl">
                        {title}
                      </h1>
                      <p className="absolute left-5 top-14 flex items-center text-sm xl:top-20">
                        <ClockIcon className="mr-1 h-4 w-4" />
                        {prepTime + cookTime} min
                      </p>
                      <p className="absolute right-5 top-14 flex items-center text-sm xl:top-20">
                        <CakeIcon className="mr-1 h-4 w-4" />
                        {getIngredientCount(sections)} ingredients
                      </p>
                    </footer>
                  </article>
                </Link>
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

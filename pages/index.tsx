import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { prisma, Prisma } from "../lib/prisma";
import Recipe from "@components/Recipe";
import SearchSection from "@components/SearchSection";
import { ChangeEvent, useState } from "react";

const getRecipes = async () => {
  return await prisma.recipe.findMany({
    select: {
      id: true,
      title: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    take: 10,
  });
};

const getSearchResults = async (params: string) => {
  return await prisma.recipe.findMany({
    where: {
      title: {
        contains: params,
      },
    },
    select: {
      id: true,
      title: true,
    },
    take: 10,
  });
};

type RecipesProps = {
  recipes: Prisma.PromiseReturnType<typeof getRecipes>;
  searchResults: Prisma.PromiseReturnType<typeof getSearchResults>;
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const recipes = await getRecipes();
  const searchResults = await getSearchResults("");

  return {
    props: { recipes, searchResults },
  };
};

const Home: NextPage<RecipesProps> = ({ recipes, searchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Recipe Website</title>
        <meta name="description" content="Recipe website by Bacon Pardner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchSection
        recipes={searchResults}
        searchTerm={searchTerm}
        onSearchTerm={handleSearchTerm}
      />

      <main className="bg-zinc-100">
        <h2 className="py-10 text-center text-4xl font-bold">Recipes</h2>

        <section className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
            {recipes.map((item) => (
              <Recipe
                key={item.id}
                title={item.title}
                userName={item.user.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/*  */}
          </div>

          <div className="py-6">{/*  */}</div>
        </section>
      </main>
    </>
  );
};

export default Home;

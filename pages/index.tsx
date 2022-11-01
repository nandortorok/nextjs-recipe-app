import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { prisma, Prisma } from "../lib/prisma";
import Recipe from "@components/Recipe";
import SearchSection from "@components/SearchSection";
import { ChangeEvent, useEffect, useState } from "react";

// TODO top, latest, most commented recipes
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

type RecipesProps = {
  recipes: Prisma.PromiseReturnType<typeof getRecipes>;
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const recipes = await getRecipes();

  return {
    props: { recipes },
  };
};

const Home: NextPage<RecipesProps> = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipesList, setRecipesList] = useState([]);

  const handleSearchTerm = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const getRecipesList = async (params: string) => {
      // TODO refactor to send body
      const res = await fetch(`api/search?title=${params}`);
      const data = await res.json();

      setRecipesList(data);
    };

    getRecipesList(searchTerm).catch(console.error);
  }, [searchTerm]);

  return (
    <>
      <Head>
        <title>Recipe Website</title>
        <meta name="description" content="Recipe website by Bacon Pardner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchSection
        recipes={recipesList}
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

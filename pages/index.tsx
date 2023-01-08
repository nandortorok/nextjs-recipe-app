import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { prisma, Prisma } from "../lib/prisma";
import RecipeElement from "components/RecipeElement";
import { Search } from "components/Search";

const getRecipes = async () => {
  return await prisma.recipe.findMany({
    select: {
      id: true,
      title: true,
      imagePath: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    take: 10,
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

      <>
        <Search />

        <h2 className="py-10 text-center text-4xl font-bold">Recipes</h2>

        <section className="container mx-auto md:px-6">
          <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
            {recipes.map((item) => (
              <RecipeElement
                key={item.id}
                title={item.title}
                href={`recipe/${item.id}`}
                userName={item.user.name || ""}
                imagePath={item.imagePath}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/*  */}
          </div>

          <div className="py-6">{/*  */}</div>
        </section>
      </>
    </>
  );
};

export default Home;

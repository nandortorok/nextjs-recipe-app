import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { prisma, Prisma } from "../lib/prisma";
import Featured from "components/Home/Featured";
import { ClockIcon } from "@heroicons/react/24/outline";

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

      <main>
        <Featured />

        <section className="py-10 px-5">
          <h1 className="pb-10 text-4xl font-bold md:text-center">Recipes</h1>

          <div className="flex flex-col space-y-5">
            {recipes.map(({ id, imagePath, title, user }, idx) => (
              <article
                key={idx}
                className="relative rounded-3xl py-24 px-28 text-white shadow-md"
              >
                <Image
                  src={`/img/${imagePath}`}
                  alt="recipe image"
                  className="rounded-3xl object-cover"
                  sizes={"(max-width: 768px)"}
                  fill={true}
                />
                <header className="absolute top-0 left-0 right-0 rounded-t-3xl bg-gradient-to-b from-black/50 to-transparent py-8">
                  <p className="absolute left-5 top-5 text-sm">{user.name}</p>
                </header>
                <footer className="absolute bottom-0 left-0 right-0 rounded-b-3xl bg-gradient-to-t from-black/50 to-transparent py-12">
                  <h4 className="absolute left-5 top-6 text-lg font-black">
                    {title}
                  </h4>
                  <div className="absolute left-5 top-14">
                    <p className="flex items-center text-sm">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      15 min
                    </p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

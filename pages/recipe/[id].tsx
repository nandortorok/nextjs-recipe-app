import { Recipe } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const req = await fetch(`http://localhost:3000/api/recipe?id=${params!.id}`);
  const recipe = await req.json();

  return { props: { recipe } };
};

type Props = { recipe: Recipe };

const Recipe: NextPage<Props> = ({ recipe }) => {
  return (
    <>
      <Head>
        <title>{recipe.title}</title>
      </Head>

      <main className="mx-auto">
        <h2 className="py-6 text-center text-xl font-bold">{recipe.title}</h2>
      </main>
    </>
  );
};

export default Recipe;

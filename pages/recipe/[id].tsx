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
  const tableHead = ["Prep", "Cook", "Total"];

  return (
    <>
      <Head>
        <title>{recipe.title}</title>
      </Head>

      <main className="flex flex-col items-center space-y-8 bg-gray-100 py-10 px-5">
        <section>
          <h1 className="text-center text-2xl font-bold">{recipe.title}</h1>
          <p className="text-center text-sm text-gray-400">
            By {recipe.user.name}
          </p>
        </section>

        <div className="inline-block aspect-video overflow-hidden rounded-3xl">
          <Image
            alt="image"
            src={"/test-image.png"}
            className="block object-none"
            height={600}
            width={600}
          />
        </div>

        <table className="w-full rounded-3xl bg-white text-center">
          <thead>
            <tr>
              {tableHead.map((item, index) => (
                <td key={index} className="px-6 pt-3">
                  {item}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 pb-3 text-gray-500">{recipe.prepTime} min</td>
              <td className="px-6 pb-3 text-gray-500">{recipe.cookTime} min</td>
              <td className="px-6 pb-3 text-gray-500">
                {recipe.prepTime + recipe.cookTime} min
              </td>
            </tr>
          </tbody>
        </table>

        <h1 className="w-full text-left font-bold">Ingredients (1)</h1>

        <section className="w-full">
          {recipe.sections.map(({ title, sectionIngredients }, sectionIdx) => (
            <div key={sectionIdx} className="">
              <h1 className="w-full text-left font-bold">{title}</h1>
              <ul className="space-y-5">
                {sectionIngredients.map(({ ingredient, amount, unit }, idx) => (
                  <li
                    key={idx}
                    className=" flex rounded-2xl bg-white py-4 font-bold"
                  >
                    <p className="px-10">
                      {amount}{unit?.short} {ingredient.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <h1 className="w-full text-left font-bold">Directions (3)</h1>

        <section className="w-full">
          {recipe.sections.map(({ title, directions }, sectionIdx) => (
            <div key={sectionIdx} className="">
              <h1 className="w-full text-left font-bold">{title}</h1>
              <ul className="space-y-5">
                {directions.map(({ direction }, idx) => (
                  <li
                    key={idx}
                    className=" flex rounded-2xl bg-white py-4 font-bold capitalize"
                  >
                    <p className="px-4 text-gray-500">{idx}</p>
                    <p className="">{direction}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <p className="py-5 text-center text-gray-500">
          {new Date(Date.parse(recipe.createdAt.toString())).toDateString()}
        </p>
      </main>
    </>
  );
};

export default Recipe;

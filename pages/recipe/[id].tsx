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

// type Props = {
//   recipe:
//     | (Recipe & {
//         user: User;
//         recipeSections: (Section & {
//		 			 directions: Direction[];
//           ingredients: (SectionIngredient & {
//             ingredient: Ingredient;
//             unit: Unit | null;
//           })[];
//         })[];
//       })
//     | null;
// };

// <(Recipe & {
// 	user: User;
// 	recipeSections: (Section & {
// 			directions: Direction[];
// 			ingredients: (SectionIngredient & {
// 					...;
// 			})[];
// 	})[];
// }) | null>

type Props = {
  recipe: Recipe & {
    user: User;
    recipeSections: (Section & {
      directions: Direction[];
      ingredients: (SectionIngredient & {
        ingredient: Ingredient;
        unit: Unit | null;
      })[];
    })[];
  };
};

const Recipe: NextPage<Props> = ({ recipe }) => {
  const tableHead = ["Prep Time", "Cooking Time", "Total"];

  return (
    <>
      <Head>
        <title>{recipe.title}</title>
      </Head>

      <main className="container mx-auto my-10 space-y-6 shadow-lg">
        <h1 className="text-center text-2xl font-bold">{recipe.title}</h1>
        <h2 className="text-center italic text-gray-400">
          By {recipe.user.name}
        </h2>

        <section className="flex flex-col items-center justify-center">
          <table className="w-1/2 bg-slate-200 text-center">
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
                <td className="px-6 pb-3 text-gray-500">
                  {recipe.prepTime} min
                </td>
                <td className="px-6 pb-3 text-gray-500">
                  {recipe.cookingTime} min
                </td>
                <td className="px-6 pb-3 text-gray-500">
                  {recipe.prepTime + recipe.cookingTime} min
                </td>
              </tr>
            </tbody>
          </table>

          <Image
            alt="image"
            src={"/test-image.png"}
            className="w-1/2 pt-6 shadow-lg"
            height={600}
            width={600}
          />
        </section>

        <section className="pl-10">
          <h2 className="text-2xl">Ingredients</h2>

          <div className="pl-4">
            {recipe.recipeSections.map(({ ingredients }, index) => (
              <h3 key={ingredients[index].sectionId}>
                {recipe.recipeSections[index].title}
                <ul className="list-disc pl-4">
                  {ingredients.map(({ ingredient }) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                  ))}
                </ul>
              </h3>
            ))}
          </div>
        </section>

        <section className="pl-10">
          <h2 className="text-2xl">Directions</h2>

          <div className="pl-4">
            {recipe.recipeSections.map(({ directions }, index) => (
              <h3 key={directions[index].sectionId}>
                {recipe.recipeSections[index].title}
                <ul className="list-disc pl-4">
                  {directions.map(({ stepNumber, direction }) => (
                    <li key={stepNumber}>{direction}</li>
                  ))}
                </ul>
              </h3>
            ))}
          </div>
        </section>

        <p className="py-5 text-center text-gray-500">
          {new Date(Date.parse(recipe.createdAt.toString())).toDateString()}
        </p>
      </main>
    </>
  );
};

export default Recipe;

import {
  Ingredient,
  Recipe,
  Section,
  SectionIngredient,
  Unit,
  User,
} from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
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
//           ingredients: (SectionIngredient & {
//             ingredient: Ingredient;
//             unit: Unit | null;
//           })[];
//         })[];
//       })
//     | null;
// };

type Props = {
  recipe: Recipe & {
    user: User;
    recipeSections: (Section & {
      ingredients: (SectionIngredient & {
        ingredient: Ingredient;
        unit: Unit | null;
      })[];
    })[];
  };
};

const Recipe: NextPage<Props> = ({ recipe }) => {
  return (
    <>
      <Head>
        <title>{recipe.title}</title>
      </Head>

      <main className="mx-auto">
        <h2 className="py-6 text-center text-xl font-bold">{recipe.title}</h2>

        <ul>
          {recipe.recipeSections.map(({ ingredients }) =>
            ingredients.map(({ ingredient }) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))
          )}
        </ul>

        <p className="bg-slate-300">
          user {recipe.recipeSections[0].ingredients[0].ingredient.name}
        </p>
      </main>
    </>
  );
};

export default Recipe;

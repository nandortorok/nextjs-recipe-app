import { SectionIngredient } from "@prisma/client";

type SectionsProps = {
  sectionIngredients: SectionIngredient[];
}[];

const getIngredientCount = (sections: SectionsProps) => {
  let count = 0;

  sections.map(({ sectionIngredients }) => {
    return sectionIngredients.map(() => {
      count++;
    });
  });

  return count;
};

export default getIngredientCount;

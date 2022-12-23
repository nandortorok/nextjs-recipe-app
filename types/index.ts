export type TimeValuesProps = {
  prepTime: number;
  cookTime: number;
  prepTimeUnit: number;
  cookTimeUnit: number;
};

export type IngredientProps = {
  amount?: number;
  unit?: string;
  name: string;
};

export type SectionProps = {
  title?: string;
  ingredients: IngredientProps[];
  directions: string[];
};
